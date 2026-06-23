# Nikah Planner — Wedding Planning App

Elegant, Islamic-friendly wedding planning application with a **Flutter Android app** and a **React web UI prototype**.

**GitHub:** [github.com/moinaalia/nikah-planner](https://github.com/moinaalia/nikah-planner) · **Profil:** [github.com/moinaalia](https://github.com/moinaalia)

## Projects

| Folder | Stack | Description |
|--------|-------|-------------|
| `nikah_planner/` | Flutter + Firebase | Full mobile app (13 screens) |
| `student_attendance/` | Flutter + SQLite | **Week 6–7 mini project** — student attendance manager |
| `src/` | React + Vite + Tailwind | Web UI prototype / design reference |

## Quick Start

### Flutter app (Android)

```bash
cd nikah_planner
flutter pub get
flutter run
```

Demo mode: sign in with any email and password (no Firebase required).

### Student attendance app (Week 6–7 mini project)

```bash
cd student_attendance
flutter pub get
flutter run
```

SQLite database: register students, mark attendance, generate reports.

### React prototype (web)

```bash
npm install
npm run dev
```

## VS Code / Android Studio

1. Open this folder in **VS Code** or **Android Studio**
2. Install the **Flutter** and **Dart** extensions (VS Code)
3. Set Flutter SDK path: `C:\src\flutter` (already in `.vscode/settings.json`)
4. Press **F5** → choose **Nikah Planner (Flutter)**

For Android builds, install [Android Studio](https://developer.android.com/studio) and the Android SDK.

## Firebase (optional)

```bash
cd nikah_planner
dart pub global activate flutterfire_cli
flutterfire configure
```

## License

Student / educational project.

## For reviewers / professors

| Document | Link |
|----------|------|
| **CAT logbook (Word)** | [LOGBOOK.doc](LOGBOOK.doc) |
| **CAT logbook (PDF)** | [LOGBOOK.pdf](LOGBOOK.pdf) |

See [SOUMISSION_PROF.md](SOUMISSION_PROF.md) for the email template.
