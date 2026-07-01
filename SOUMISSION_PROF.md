# Project Submission — Nikah Planner

## Student information

| | |
|---|---|
| **Student** | Hadidja Aliani |
| **Student ID** | BIT/2023/62116 |
| **Project name** | Nikah Planner — Wedding planning mobile app |
| **GitHub account** | [moinaalia](https://github.com/moinaalia) |
| **Repository** | https://github.com/moinaalia/nikah-planner |
| **Public profile** | https://github.com/moinaalia |

## GitHub publication

**Status: published** — https://github.com/moinaalia/nikah-planner

The repository contains the **source code**, the **Week 6–7 mini project** (`student_attendance/`), and **LOGBOOK.pdf** (weeks 1–7, Task 2 database design, Task 3 attendance app).

---

## Email template for the instructor (copy-paste)

```
Hello Professor,

Here is my Mobile Application Development submission (Nikah Planner + Week 6–7 assignments).

GitHub profile: https://github.com/moinaalia
Project repository: https://github.com/moinaalia/nikah-planner
Logbook PDF: https://github.com/moinaalia/nikah-planner/blob/main/LOGBOOK.pdf

The repository contains:
- Nikah Planner — Flutter mobile app (13 screens, Firebase-ready)
- Task 2 — Student database design (documented in LOGBOOK.pdf, Section Task 2)
- Task 3 — Student Attendance mini project (student_attendance/ — Flutter + SQLite)
- React UI prototype (design reference)
- README with installation and run instructions

To test the main app:
1. Clone the repository
2. cd nikah_planner
3. flutter pub get
4. flutter run
(Demo mode: sign in with any email and password)

To test the attendance mini project (Task 3):
1. cd student_attendance
2. flutter pub get
3. flutter run

Kind regards,
Hadidja Aliani — BIT/2023/62116
```

## Repository contents (verification)

### Flutter app (`nikah_planner/`)
- Splash, Login, Register
- Dashboard, Budget, Guests, Gallery
- Schedule, Invitations, Vendors, Profile
- Notifications, Settings
- Firebase backend (Auth + Firestore) — demo mode without config

### Student attendance app — Task 3 (`student_attendance/`)
- Flutter + SQLite (`sqflite`)
- Register students, mark attendance, generate reports
- Password hashing (SHA-256) before database insert
- `cd student_attendance` → `flutter pub get` → `flutter run`

### Task 2 — Database design
- Documented in **LOGBOOK.pdf** (students, courses, enrollments, attendance tables)
- Primary keys, foreign keys, normalization (3NF)

### Web prototype (`src/`)
- Same React UI for browser demonstration
- `npm install` then `npm run dev`

## Project criteria covered

- Requirements gathering (Islamic / Malay wedding context)
- Business workflow (budget, guests, schedule, vendors)
- Identified challenges (coordination, RSVP, budget)
- Practical mobile solution (Flutter)
- Functional / deployable prototype
