import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../database/database_helper.dart';
import '../models/attendance_record.dart';
import '../models/course.dart';
import '../models/student.dart';

class MarkAttendanceScreen extends StatefulWidget {
  const MarkAttendanceScreen({super.key});

  @override
  State<MarkAttendanceScreen> createState() => _MarkAttendanceScreenState();
}

class _MarkAttendanceScreenState extends State<MarkAttendanceScreen> {
  List<Course> _courses = [];
  List<Student> _students = [];
  int? _selectedCourseId;
  DateTime _selectedDate = DateTime.now();
  final Map<int, AttendanceStatus> _statusByEnrollment = {};
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    final courses = await DatabaseHelper.instance.getCourses();
    if (!mounted) return;
    setState(() {
      _courses = courses;
      _selectedCourseId = courses.isNotEmpty ? courses.first.courseId : null;
    });
    await _loadStudents();
  }

  Future<void> _loadStudents() async {
    if (_selectedCourseId == null) {
      setState(() {
        _students = [];
        _loading = false;
      });
      return;
    }

    setState(() => _loading = true);
    final students = await DatabaseHelper.instance.getStudentsForCourse(_selectedCourseId!);
    final statusMap = <int, AttendanceStatus>{};

    for (final student in students) {
      final enrollmentId = student.enrollmentId;
      if (enrollmentId == null) continue;
      final existing = await DatabaseHelper.instance.getAttendanceForStudent(
        enrollmentId: enrollmentId,
        date: _selectedDate,
      );
      if (existing != null) statusMap[enrollmentId] = existing;
    }

    if (!mounted) return;
    setState(() {
      _students = students;
      _statusByEnrollment
        ..clear()
        ..addAll(statusMap);
      _loading = false;
    });
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2024),
      lastDate: DateTime(2030),
    );
    if (picked != null) {
      setState(() => _selectedDate = picked);
      await _loadStudents();
    }
  }

  Future<void> _setStatus(int enrollmentId, AttendanceStatus status) async {
    await DatabaseHelper.instance.saveAttendance(
      enrollmentId: enrollmentId,
      date: _selectedDate,
      status: status,
    );
    setState(() => _statusByEnrollment[enrollmentId] = status);
  }

  Color _statusColor(AttendanceStatus? status) => switch (status) {
        AttendanceStatus.present => Colors.green.shade100,
        AttendanceStatus.absent => Colors.red.shade100,
        AttendanceStatus.late => Colors.orange.shade100,
        null => Colors.grey.shade100,
      };

  @override
  Widget build(BuildContext context) {
    final dateLabel = DateFormat('EEE, d MMM yyyy').format(_selectedDate);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mark Attendance'),
        backgroundColor: const Color(0xFF1E3A5F),
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                DropdownButtonFormField<int>(
                  initialValue: _selectedCourseId,
                  decoration: const InputDecoration(
                    labelText: 'Course',
                    border: OutlineInputBorder(),
                  ),
                  items: _courses
                      .map(
                        (c) => DropdownMenuItem(
                          value: c.courseId,
                          child: Text(c.courseCode),
                        ),
                      )
                      .toList(),
                  onChanged: (v) async {
                    setState(() => _selectedCourseId = v);
                    await _loadStudents();
                  },
                ),
                const SizedBox(height: 8),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Attendance date'),
                  subtitle: Text(dateLabel),
                  trailing: TextButton(onPressed: _pickDate, child: const Text('Change')),
                ),
              ],
            ),
          ),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _students.isEmpty
                    ? const Center(child: Text('No students registered for this course'))
                    : ListView.builder(
                        itemCount: _students.length,
                        itemBuilder: (context, index) {
                          final student = _students[index];
                          final enrollmentId = student.enrollmentId!;
                          final status = _statusByEnrollment[enrollmentId];

                          return Card(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                            color: _statusColor(status),
                            child: Padding(
                              padding: const EdgeInsets.all(12),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    student.fullName,
                                    style: const TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                  Text('${student.studentId} • Year ${student.yearOfStudy}'),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      _StatusChip(
                                        label: 'Present',
                                        selected: status == AttendanceStatus.present,
                                        color: Colors.green,
                                        onTap: () => _setStatus(enrollmentId, AttendanceStatus.present),
                                      ),
                                      const SizedBox(width: 8),
                                      _StatusChip(
                                        label: 'Absent',
                                        selected: status == AttendanceStatus.absent,
                                        color: Colors.red,
                                        onTap: () => _setStatus(enrollmentId, AttendanceStatus.absent),
                                      ),
                                      const SizedBox(width: 8),
                                      _StatusChip(
                                        label: 'Late',
                                        selected: status == AttendanceStatus.late,
                                        color: Colors.orange,
                                        onTap: () => _setStatus(enrollmentId, AttendanceStatus.late),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  const _StatusChip({
    required this.label,
    required this.selected,
    required this.color,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      label: Text(label),
      selected: selected,
      selectedColor: color.withValues(alpha: 0.4),
      onSelected: (_) => onTap(),
    );
  }
}
