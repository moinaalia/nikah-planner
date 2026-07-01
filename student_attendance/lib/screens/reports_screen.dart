import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../database/database_helper.dart';
import '../models/attendance_record.dart';
import '../models/course.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  List<Course> _courses = [];
  List<AttendanceReportRow> _rows = [];
  int? _selectedCourseId;
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
    await _loadReport();
  }

  Future<void> _loadReport() async {
    if (_selectedCourseId == null) {
      setState(() {
        _rows = [];
        _loading = false;
      });
      return;
    }

    setState(() => _loading = true);
    final rows = await DatabaseHelper.instance.getAttendanceReport(_selectedCourseId!);
    if (!mounted) return;
    setState(() {
      _rows = rows;
      _loading = false;
    });
  }

  String _buildReportText() {
    if (_rows.isEmpty) return 'No attendance data yet.';
    final course = _courses.firstWhere((c) => c.courseId == _selectedCourseId);
    final buffer = StringBuffer()
      ..writeln('ATTENDANCE REPORT')
      ..writeln('Course: ${course.courseCode} — ${course.courseName}')
      ..writeln('Generated: ${DateTime.now()}')
      ..writeln('')
      ..writeln('Student ID\tName\tPresent\tAbsent\tLate\tAttendance %');

    for (final row in _rows) {
      buffer.writeln(
        '${row.studentId}\t${row.fullName}\t${row.presentCount}\t${row.absentCount}\t${row.lateCount}\t${row.attendancePercent}%',
      );
    }
    return buffer.toString();
  }

  Future<void> _copyReport() async {
    await Clipboard.setData(ClipboardData(text: _buildReportText()));
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Report copied to clipboard')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Attendance Reports'),
        backgroundColor: const Color(0xFF1E3A5F),
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            onPressed: _rows.isEmpty ? null : _copyReport,
            icon: const Icon(Icons.copy),
            tooltip: 'Copy report',
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: DropdownButtonFormField<int>(
              initialValue: _selectedCourseId,
              decoration: const InputDecoration(
                labelText: 'Course',
                border: OutlineInputBorder(),
              ),
              items: _courses
                  .map(
                    (c) => DropdownMenuItem(
                      value: c.courseId,
                      child: Text('${c.courseCode} — ${c.courseName}'),
                    ),
                  )
                  .toList(),
              onChanged: (v) async {
                setState(() => _selectedCourseId = v);
                await _loadReport();
              },
            ),
          ),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _rows.isEmpty
                    ? const Center(child: Text('No students or attendance records yet'))
                    : SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: DataTable(
                          columns: const [
                            DataColumn(label: Text('Student ID')),
                            DataColumn(label: Text('Name')),
                            DataColumn(label: Text('Present')),
                            DataColumn(label: Text('Absent')),
                            DataColumn(label: Text('Late')),
                            DataColumn(label: Text('Attendance %')),
                          ],
                          rows: _rows
                              .map(
                                (r) => DataRow(
                                  cells: [
                                    DataCell(Text(r.studentId)),
                                    DataCell(Text(r.fullName)),
                                    DataCell(Text('${r.presentCount}')),
                                    DataCell(Text('${r.absentCount}')),
                                    DataCell(Text('${r.lateCount}')),
                                    DataCell(
                                      Text(
                                        '${r.attendancePercent}%',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: r.attendancePercent >= 75
                                              ? Colors.green
                                              : Colors.red,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              )
                              .toList(),
                        ),
                      ),
          ),
        ],
      ),
    );
  }
}
