import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

import '../models/attendance_record.dart';
import '../models/course.dart';
import '../models/student.dart';
import '../services/password_hasher.dart';

class DatabaseHelper {
  DatabaseHelper._();
  static final DatabaseHelper instance = DatabaseHelper._();

  static Database? _db;

  Future<Database> get database async {
    _db ??= await _initDatabase();
    return _db!;
  }

  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'student_attendance.db');

    return openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE students (
        student_id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        year_of_study INTEGER NOT NULL,
        phone_number TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    ''');

    await db.execute('''
      CREATE TABLE courses (
        course_id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_code TEXT NOT NULL UNIQUE,
        course_name TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE enrollments (
        enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id TEXT NOT NULL,
        course_id INTEGER NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id),
        FOREIGN KEY (course_id) REFERENCES courses(course_id),
        UNIQUE(student_id, course_id)
      )
    ''');

    await db.execute('''
      CREATE TABLE attendance (
        attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
        enrollment_id INTEGER NOT NULL,
        attendance_date TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('present','absent','late')),
        recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id),
        UNIQUE(enrollment_id, attendance_date)
      )
    ''');

    await db.insert('courses', {
      'course_code': 'BIT301',
      'course_name': 'Mobile Application Development',
    });
    await db.insert('courses', {
      'course_code': 'BIT302',
      'course_name': 'Database Systems',
    });
  }

  Future<List<Course>> getCourses() async {
    final db = await database;
    final rows = await db.query('courses', orderBy: 'course_name');
    return rows.map(Course.fromMap).toList();
  }

  Future<int> registerStudent({
    required String studentId,
    required String fullName,
    required int yearOfStudy,
    required String phoneNumber,
    required String password,
    required int courseId,
  }) async {
    final db = await database;
    final hash = PasswordHasher.hash(password);

    return db.transaction((txn) async {
      await txn.insert('students', {
        'student_id': studentId,
        'full_name': fullName,
        'year_of_study': yearOfStudy,
        'phone_number': phoneNumber,
        'password_hash': hash,
      });

      return txn.insert('enrollments', {
        'student_id': studentId,
        'course_id': courseId,
      });
    });
  }

  Future<List<Student>> getStudentsForCourse(int courseId) async {
    final db = await database;
    final rows = await db.rawQuery('''
      SELECT s.student_id, s.full_name, s.year_of_study, s.phone_number,
             c.course_name, c.course_code, e.enrollment_id
      FROM enrollments e
      JOIN students s ON s.student_id = e.student_id
      JOIN courses c ON c.course_id = e.course_id
      WHERE e.course_id = ?
      ORDER BY s.full_name
    ''', [courseId]);

    return rows
        .map(
          (r) => Student(
            studentId: r['student_id'] as String,
            fullName: r['full_name'] as String,
            yearOfStudy: r['year_of_study'] as int,
            phoneNumber: r['phone_number'] as String,
            courseName: r['course_name'] as String?,
            courseCode: r['course_code'] as String?,
            enrollmentId: r['enrollment_id'] as int?,
          ),
        )
        .toList();
  }

  Future<Map<String, int>> getEnrollmentIdsForCourse(int courseId) async {
    final db = await database;
    final rows = await db.query(
      'enrollments',
      columns: ['student_id', 'enrollment_id'],
      where: 'course_id = ?',
      whereArgs: [courseId],
    );
    return {
      for (final row in rows)
        row['student_id'] as String: row['enrollment_id'] as int,
    };
  }

  Future<void> saveAttendance({
    required int enrollmentId,
    required DateTime date,
    required AttendanceStatus status,
  }) async {
    final db = await database;
    final dateKey = _dateKey(date);

    await db.insert(
      'attendance',
      {
        'enrollment_id': enrollmentId,
        'attendance_date': dateKey,
        'status': status.label,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<AttendanceStatus?> getAttendanceForStudent({
    required int enrollmentId,
    required DateTime date,
  }) async {
    final db = await database;
    final rows = await db.query(
      'attendance',
      where: 'enrollment_id = ? AND attendance_date = ?',
      whereArgs: [enrollmentId, _dateKey(date)],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return AttendanceStatusX.fromLabel(rows.first['status'] as String);
  }

  Future<List<AttendanceReportRow>> getAttendanceReport(int courseId) async {
    final db = await database;
    final rows = await db.rawQuery('''
      SELECT s.student_id, s.full_name, c.course_name,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_count,
        COUNT(a.attendance_id) AS total_sessions
      FROM enrollments e
      JOIN students s ON s.student_id = e.student_id
      JOIN courses c ON c.course_id = e.course_id
      LEFT JOIN attendance a ON a.enrollment_id = e.enrollment_id
      WHERE e.course_id = ?
      GROUP BY e.enrollment_id
      ORDER BY s.full_name
    ''', [courseId]);

    return rows.map((r) {
      final present = (r['present_count'] as int?) ?? 0;
      final absent = (r['absent_count'] as int?) ?? 0;
      final late = (r['late_count'] as int?) ?? 0;
      final total = (r['total_sessions'] as int?) ?? 0;
      final percent = total == 0 ? 0.0 : (present + late * 0.5) / total * 100;

      return AttendanceReportRow(
        studentId: r['student_id'] as String,
        fullName: r['full_name'] as String,
        courseName: r['course_name'] as String,
        presentCount: present,
        absentCount: absent,
        lateCount: late,
        attendancePercent: double.parse(percent.toStringAsFixed(1)),
      );
    }).toList();
  }

  Future<int> getStudentCount() async {
    final db = await database;
    final result = await db.rawQuery('SELECT COUNT(*) AS c FROM students');
    return Sqflite.firstIntValue(result) ?? 0;
  }

  String _dateKey(DateTime date) =>
      '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
}
