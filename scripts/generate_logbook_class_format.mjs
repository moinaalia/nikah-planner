import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = path.join(root, "screenshots");
const outPath = path.join(root, "LOGBOOK_CAT.doc");
const desktopDoc = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK_CAT.doc");

const INFO = {
  course: "BIT 4107 – Mobile Application Development",
  student: "Hadidja Aliani",
  admission: "BIT/2023/62116",
  school: "Computing and Informatics",
  programme: "Bachelor of Science Information Technology (BSCIT)",
  year: "2025/2026",
  semester: "THREE",
  lecturer: "MR. MICHAEL NYORO",
  project: "Nikah Planner — Wedding Planning Mobile Application",
};

const WEEKS = [
  {
    n: 1,
    title: "Introduction to Mobile Application Development",
    activities: [
      { label: "Installation of Android Studio and Flutter SDK", file: "01_splash.png", hint: "Android Studio welcome / Flutter doctor output" },
      { label: "Installation of Flutter and Dart — project creation (nikah_planner)", file: "01_splash.png", hint: "flutter create nikah_planner" },
      { label: "First app — Splash screen (Hello World equivalent)", file: "01_splash.png", hint: "Nikah Planner splash screen running" },
    ],
    tools: "Flutter SDK, Dart, Android Studio, VS Code",
    reflection:
      "I learned to install Flutter, set up an Android emulator, and create the Nikah Planner project. The emulator was slow at times, so I also tested on a real phone using USB debugging. I understood how cross-platform mobile development works with Flutter and created my first screen — the animated Splash screen with the wedding theme.",
    challenges: "SDK path configuration and emulator performance. Solved by using a physical device for testing.",
  },
  {
    n: 2,
    title: "Mobile Development Environment",
    activities: [
      { label: "Login Page screenshot", file: "02_login.png", hint: "login_screen.dart" },
      { label: "Dashboard screenshot", file: "04_dashboard.png", hint: "home_screen.dart — countdown & tasks" },
      { label: "Registration screenshot", file: "03_register.png", hint: "register_screen.dart" },
    ],
    tools: "Flutter, Dart, Android Studio, go_router, google_fonts",
    reflection:
      "Creating the Nikah Planner wedding app was a good experience. I set up the project structure (lib/core, lib/features, lib/router, lib/services) and implemented the login, register, and dashboard screens. I configured pubspec.yaml with dependencies and built the gold/sage colour theme matching the wedding design.",
    challenges: "Understanding Flutter folder structure and wiring navigation between auth screens and the main app took time at first.",
  },
  {
    n: 3,
    title: "User Interface Design",
    activities: [
      { label: "Login page — UI design (React prototype reference)", file: "02_login.png", hint: "src/app/components/LoginPage.tsx" },
      { label: "Dashboard — UI design", file: "04_dashboard.png", hint: "src/app/components/HomePage.tsx" },
      { label: "Budget & Guest list — UI screens", file: "05_budget.png", hint: "BudgetPage.tsx · GuestListPage.tsx" },
      { label: "Schedule & Settings — UI screens", file: "07_schedule.png", hint: "SchedulePage.tsx · SettingsPage.tsx" },
    ],
    tools: "Figma-style design, React + Vite + Tailwind (prototype), Flutter Material widgets",
    reflection:
      "I designed the wedding app UI using a React prototype in the src/ folder as a visual reference before building in Flutter. I applied a luxury gold (#B8956A) and sage (#8FB5B0) colour palette suitable for an Islamic-friendly wedding theme. Reusable widgets (WeddingCard, PrimaryButton, WeddingInputField) keep the design consistent across all 14 screens.",
    challenges: "Matching the React prototype look in Flutter while keeping layouts responsive on different screen sizes.",
  },
  {
    n: 4,
    title: "Data Management",
    activities: [
      { label: "Guest list — add and view guests", file: "06_guests.png", hint: "guest_list_screen.dart" },
      { label: "Budget — categories and expenses", file: "05_budget.png", hint: "budget_screen.dart — fl_chart pie chart" },
      { label: "Search and RSVP filters", file: "06_guests.png", hint: "FilterChip — Confirmed / Pending / Declined" },
    ],
    tools: "Flutter, Dart, mock_data.dart, wedding_models.dart, WeddingProfile model",
    reflection:
      "I implemented data management for wedding guests, budget categories, and schedule events. Demo data for couple Siti & Ahmad is stored in mock_data.dart. Users can filter guests by RSVP status and search by name. The budget screen displays expenses in a pie chart using fl_chart.",
    challenges: "Organising nested data (guests, budget items, events) inside a single WeddingProfile model.",
  },
  {
    n: 5,
    title: "Networking",
    activities: [
      { label: "Firebase Authentication — sign in / register", file: "02_login.png", hint: "auth_service.dart" },
      { label: "Cloud Firestore — read/write wedding data", file: "04_dashboard.png", hint: "firestore_service.dart" },
      { label: "Error handling — network and auth failures", file: "09_error.png", hint: "AuthResult.failure() · try-catch in auth_service" },
    ],
    tools: "Firebase Auth, Cloud Firestore, firebase_core, HTTP/JSON concepts",
    reflection:
      "I connected Nikah Planner to Firebase for cloud authentication and data storage. The app uses a client-server model: the mobile app is the client and Firebase is the backend. When Firebase is not configured, the app falls back to offline demo mode. I implemented try-catch error handling for failed login and network issues.",
    challenges: "Configuring Firebase correctly and ensuring the app still works in demo mode without internet.",
  },
  {
    n: 6,
    title: "Navigation Drawer",
    activities: [
      { label: "Bottom navigation — Home, Guests, Schedule, Budget, More", file: "04_dashboard.png", hint: "main_shell.dart" },
      { label: "GoRouter — named routes and deep links", file: "08_settings.png", hint: "app_router.dart — 14 routes" },
      { label: "More menu — Schedule, Vendors, Profile, Settings", file: "08_settings.png", hint: "more_screen.dart" },
    ],
    tools: "go_router, MainShell, BottomNavigationBar, Stack navigation",
    reflection:
      "I implemented hierarchical navigation using go_router with a bottom tab bar (MainShell) and a More screen linking to Schedule, Vendors, Profile, Invitation, Notifications, and Settings. Persistent session keeps the user logged in via SharedPreferences until sign out.",
    challenges: "Managing route redirects when the user is not authenticated vs inside the main app shell.",
  },
  {
    n: 7,
    title: "Data Storage and Database Integration in Mobile Applications",
    activities: [
      { label: "SharedPreferences — local JSON storage", file: "04_dashboard.png", hint: "local_wedding_store.dart" },
      { label: "Firestore collections — users, weddings, guests", file: "04_dashboard.png", hint: "FIREBASE_SETUP.md" },
      { label: "Task 2 — Database design (relational schema on paper)", file: null, hint: "students · courses · enrollments · attendance tables" },
    ],
    tools: "SharedPreferences, JSON serialization, Firebase Firestore, WeddingRepository",
    reflection:
      "I implemented local storage using SharedPreferences for offline demo accounts and wedding profiles. Cloud data syncs through Firestore when Firebase is configured. MySQL was NOT used — local storage is key-value JSON on the device and cloud storage is Firestore (NoSQL). For Task 2 I designed a relational database schema with primary keys, foreign keys, and SHA-256 password hashing.",
    challenges: "Serializing complex wedding profiles to JSON. Connecting Firestore collections correctly. Debugging data retrieval on login.",
  },
  {
    n: 8,
    title: "Keyboard Input Handling and Event Handling",
    activities: [
      { label: "Login form — email/password validation", file: "02_login.png", hint: "TextFormField · onPressed sign in" },
      { label: "Guest search — TextField onChanged filter", file: "06_guests.png", hint: "Search bar filters guest list in real time" },
      { label: "RSVP filter chips — onTap event handling", file: "06_guests.png", hint: "FilterChip Confirmed / Pending / Declined" },
      { label: "Login error message — event response feedback", file: "09_error.png", hint: "SnackBar on AuthResult.failure" },
    ],
    tools: "TextFormField, onPressed, onChanged, onTap, setState, FilterChip, SnackBar",
    reflection:
      "I optimized usability through responsive event handling: form validation on login/register, real-time guest search, RSVP filter chips, budget screen interactions, and schedule ExpansionTile taps. Keyboard actions move focus between email and password fields during data entry.",
    challenges: "Showing clear error messages when login fails without crashing the app.",
  },
];

function esc(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pb() {
  return '<br clear="all" style="page-break-before:always"/>';
}

function shotBox(act, figNum) {
  const exists = act.file && fs.existsSync(path.join(shotsDir, act.file));
  return `
<p style="font-family:Calibri;font-size:11pt;margin:12pt 0 4pt;"><b>${figNum}. ${esc(act.label)}</b></p>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16pt;">
  <tr>
    <td style="border:1.5pt dashed #999;background:#F9F9F9;padding:30pt;text-align:center;min-height:260px;vertical-align:middle;">
      <p style="font-family:Calibri;font-size:12pt;margin:0 0 8pt;"><b>[ Insert screenshot here ]</b></p>
      ${act.file ? `<p style="font-family:Consolas;font-size:9pt;color:#888;margin:0;">${esc(act.file)}</p>` : ""}
      <p style="font-family:Calibri;font-size:9pt;color:#AAA;margin:8pt 0 0;">${esc(act.hint)}</p>
      <p style="font-family:Calibri;font-size:9pt;color:#BBB;margin:10pt 0 0;">Insert → Pictures → This Device</p>
      ${exists ? '<p style="font-size:8pt;color:green;">✓ file available in screenshots folder</p>' : ""}
    </td>
  </tr>
</table>`;
}

function weekSection(w) {
  const shots = w.activities.map((a, i) => shotBox(a, `${w.n}.${i + 1}`)).join("");
  const challenges = w.challenges
    ? `<p style="font-family:Calibri;font-size:11pt;margin:8pt 0 4pt;"><b>Challenges</b></p>
       <p style="font-family:Calibri;font-size:11pt;line-height:1.5;text-align:justify;">${esc(w.challenges)}</p>`
    : "";
  return `
${w.n > 1 ? pb() : ""}
<p style="font-family:Calibri;font-size:14pt;font-weight:bold;margin:0 0 10pt;">Week ${w.n}: ${esc(w.title)}</p>
<p style="font-family:Calibri;font-size:11pt;font-weight:bold;margin:0 0 8pt;">${w.n}.1: Practical Activities Undertaken (SCREENSHOTS)</p>
${shots}
<p style="font-family:Calibri;font-size:11pt;margin:12pt 0 4pt;"><b>▸ Tools/Software Used</b></p>
<p style="font-family:Calibri;font-size:11pt;margin:0 0 12pt;">${esc(w.tools)}</p>
<p style="font-family:Calibri;font-size:11pt;margin:0 0 4pt;"><b>▸ Personal Reflection</b></p>
<p style="font-family:Calibri;font-size:11pt;line-height:1.55;text-align:justify;margin:0 0 8pt;">${esc(w.reflection)}</p>
${challenges}
<p style="font-family:Calibri;font-size:11pt;margin:16pt 0 4pt;"><b>Instructor mark:</b> ____________ &nbsp;&nbsp; <b>Comments:</b> _________________________________</p>`;
}

const tocRows = WEEKS.map(
  (w) =>
    `<tr><td style="font-family:Calibri;font-size:11pt;padding:4pt 0;">Week ${w.n}: ${esc(w.title)}</td><td style="text-align:right;font-family:Calibri;font-size:11pt;color:#888;">${w.n}</td></tr>`,
).join("");

const cover = `
<p style="font-family:Calibri;font-size:13pt;font-weight:bold;text-align:center;margin:0;">${esc(INFO.course)}</p>
<p style="font-family:Calibri;font-size:22pt;font-weight:bold;text-align:center;margin:16pt 0 24pt;">LOGBOOK</p>
<table width="100%" cellpadding="6" cellspacing="0" style="font-family:Calibri;font-size:11pt;margin:0 0 24pt;">
  <tr><td width="42%"><b>Student Name:</b></td><td>${esc(INFO.student)}</td></tr>
  <tr><td><b>Admission Number:</b></td><td>${esc(INFO.admission)}</td></tr>
  <tr><td><b>School/Faculty:</b></td><td>${esc(INFO.school)}</td></tr>
  <tr><td><b>Programme:</b></td><td>${esc(INFO.programme)}</td></tr>
  <tr><td><b>Academic Year:</b></td><td>${esc(INFO.year)}</td></tr>
  <tr><td><b>Semester:</b></td><td>${esc(INFO.semester)}</td></tr>
  <tr><td><b>Lecturer:</b></td><td>${esc(INFO.lecturer)}</td></tr>
  <tr><td><b>Project Title:</b></td><td>${esc(INFO.project)}</td></tr>
</table>
<p style="font-family:Calibri;font-size:12pt;font-weight:bold;margin:20pt 0 10pt;">TABLE OF CONTENTS</p>
<table width="100%" cellpadding="0" cellspacing="0">${tocRows}</table>
`;

const body = cover + WEEKS.map(weekSection).join("");

const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<title>LOGBOOK — ${esc(INFO.student)} — Nikah Planner</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>@page{size:A4;margin:2.5cm;} body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:0;}</style>
</head>
<body>${body}</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");
try {
  fs.copyFileSync(outPath, desktopDoc);
} catch {
  /* ignore */
}

console.log("Class-format logbook created:");
console.log(`  ${desktopDoc}`);
console.log(`  ${outPath}`);
