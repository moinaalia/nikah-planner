import 'package:flutter/material.dart';
import 'package:sqflite/sqflite.dart';

import '../database/database_helper.dart';
import '../models/course.dart';

class RegisterStudentScreen extends StatefulWidget {
  const RegisterStudentScreen({super.key});

  @override
  State<RegisterStudentScreen> createState() => _RegisterStudentScreenState();
}

class _RegisterStudentScreenState extends State<RegisterStudentScreen> {
  final _formKey = GlobalKey<FormState>();
  final _studentIdCtrl = TextEditingController();
  final _nameCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController(text: 'student123');
  final _yearCtrl = TextEditingController(text: '1');

  List<Course> _courses = [];
  int? _selectedCourseId;
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    _loadCourses();
  }

  @override
  void dispose() {
    _studentIdCtrl.dispose();
    _nameCtrl.dispose();
    _phoneCtrl.dispose();
    _passwordCtrl.dispose();
    _yearCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadCourses() async {
    final courses = await DatabaseHelper.instance.getCourses();
    if (!mounted) return;
    setState(() {
      _courses = courses;
      _selectedCourseId = courses.isNotEmpty ? courses.first.courseId : null;
    });
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || _selectedCourseId == null) return;

    setState(() => _saving = true);
    try {
      await DatabaseHelper.instance.registerStudent(
        studentId: _studentIdCtrl.text.trim(),
        fullName: _nameCtrl.text.trim(),
        yearOfStudy: int.parse(_yearCtrl.text.trim()),
        phoneNumber: _phoneCtrl.text.trim(),
        password: _passwordCtrl.text,
        courseId: _selectedCourseId!,
      );

      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Student registered (password hashed in SQLite)')),
      );
      _formKey.currentState!.reset();
      _studentIdCtrl.clear();
      _nameCtrl.clear();
      _phoneCtrl.clear();
      _yearCtrl.text = '1';
      _passwordCtrl.text = 'student123';
    } on DatabaseException catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().contains('UNIQUE') ? 'Student ID or phone already exists' : 'Database error')),
      );
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register Student'),
        backgroundColor: const Color(0xFF1E3A5F),
        foregroundColor: Colors.white,
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            TextFormField(
              controller: _studentIdCtrl,
              decoration: const InputDecoration(
                labelText: 'Student ID *',
                hintText: 'e.g. BIT/2023/62116',
                border: OutlineInputBorder(),
              ),
              validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _nameCtrl,
              decoration: const InputDecoration(
                labelText: 'Full Name *',
                border: OutlineInputBorder(),
              ),
              validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _yearCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Year of Study *',
                hintText: '1 to 5',
                border: OutlineInputBorder(),
              ),
              validator: (v) {
                final year = int.tryParse(v ?? '');
                if (year == null || year < 1 || year > 5) return 'Enter year 1-5';
                return null;
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _phoneCtrl,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: 'Phone Number *',
                border: OutlineInputBorder(),
              ),
              validator: (v) => v == null || v.trim().length < 8 ? 'Valid phone required' : null,
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<int>(
              initialValue: _selectedCourseId,
              decoration: const InputDecoration(
                labelText: 'Course *',
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
              onChanged: (v) => setState(() => _selectedCourseId = v),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _passwordCtrl,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Password (stored as hash)',
                border: OutlineInputBorder(),
              ),
              validator: (v) => v == null || v.length < 6 ? 'Min 6 characters' : null,
            ),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: _saving ? null : _submit,
              style: FilledButton.styleFrom(
                backgroundColor: const Color(0xFF1E3A5F),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
              child: _saving
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    )
                  : const Text('Register Student'),
            ),
          ],
        ),
      ),
    );
  }
}
