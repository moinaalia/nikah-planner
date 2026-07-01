# Student Attendance — Week 6–7 Mini Project

Flutter mobile app for managing university student attendance using **SQLite** (local relational database).

## Features

| Feature | Description |
|---------|-------------|
| **Register students** | Student ID, name, year, phone, course, hashed password |
| **Mark attendance** | Present / Absent / Late per course and date |
| **Reports** | Attendance % per student with present/absent/late counts |

## Storage method

**SQLite** via `sqflite` — offline, relational, supports JOIN queries for reports.

## Database structure

- `students` — PK: `student_id`
- `courses` — PK: `course_id`
- `enrollments` — PK: `enrollment_id`, FKs to students & courses
- `attendance` — PK: `attendance_id`, FK to enrollments

Passwords are **hashed** (SHA-256 + salt) before storage — never plain text.

## Run the app

```bash
cd student_attendance
flutter pub get
flutter run
```

Demo flow:
1. **Register Student** — e.g. `BIT/2023/62116`, Hadidja Aliani, Year 2, BIT301
2. **Mark Attendance** — select course, tap Present/Absent/Late
3. **Reports** — view attendance percentages

## Student

Hadidja Aliani — BIT/2023/62116
