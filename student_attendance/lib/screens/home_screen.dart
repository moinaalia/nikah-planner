import 'package:flutter/material.dart';

import '../database/database_helper.dart';
import 'mark_attendance_screen.dart';
import 'register_student_screen.dart';
import 'reports_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _studentCount = 0;

  @override
  void initState() {
    super.initState();
    _loadCount();
  }

  Future<void> _loadCount() async {
    final count = await DatabaseHelper.instance.getStudentCount();
    if (mounted) setState(() => _studentCount = count);
  }

  Future<void> _open(Widget screen) async {
    await Navigator.of(context).push(MaterialPageRoute(builder: (_) => screen));
    await _loadCount();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Attendance'),
        backgroundColor: const Color(0xFF1E3A5F),
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'University Attendance Manager',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF1E3A5F),
                        ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Register students, mark daily attendance, and generate reports. Data is stored locally in SQLite.',
                  ),
                  const SizedBox(height: 12),
                  Text('Registered students: $_studentCount'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          _MenuTile(
            icon: Icons.person_add,
            title: 'Register Student',
            subtitle: 'Add student ID, name, course, year, phone',
            onTap: () => _open(const RegisterStudentScreen()),
          ),
          _MenuTile(
            icon: Icons.fact_check,
            title: 'Mark Attendance',
            subtitle: 'Present / Absent / Late for today',
            onTap: () => _open(const MarkAttendanceScreen()),
          ),
          _MenuTile(
            icon: Icons.bar_chart,
            title: 'Attendance Reports',
            subtitle: 'View percentages per student and course',
            onTap: () => _open(const ReportsScreen()),
          ),
        ],
      ),
    );
  }
}

class _MenuTile extends StatelessWidget {
  const _MenuTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: const Color(0xFFE8F0FE),
          child: Icon(icon, color: const Color(0xFF1E3A5F)),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }
}
