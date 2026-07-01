import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = path.join(root, "screenshots");
const desktopShots = path.join(process.env.USERPROFILE || "", "Desktop", "Nikah_Screenshots");
const outPath = path.join(root, "LOGBOOK_CAT.doc");
const desktopDoc = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK_CAT.doc");

const GOLD = "#B8956A";
const NAVY = "#1A2B3C";
const CREAM = "#FBF8F4";

const STUDENT = {
  name: "Hadidja Aliani",
  id: "BIT/2023/62116",
  module: "Mobile Application Development",
  project: "Nikah Planner — Wedding Planning Mobile App",
  github: "https://github.com/moinaalia/nikah-planner",
  date: "June 2026",
};

const SCREENSHOTS = [
  { n: 1, title: "Splash Screen", file: "01_splash.png", week: 2 },
  { n: 2, title: "Login Screen", file: "02_login.png", week: 3 },
  { n: 3, title: "Register Screen", file: "03_register.png", week: 3 },
  { n: 4, title: "Dashboard (Home)", file: "04_dashboard.png", week: 4 },
  { n: 5, title: "Budget / Reports", file: "05_budget.png", week: 4 },
  { n: 6, title: "Guest List", file: "06_guests.png", week: 4 },
  { n: 7, title: "Schedule", file: "07_schedule.png", week: 4 },
  { n: 8, title: "Settings & Profile", file: "08_settings.png", week: 4 },
  { n: 9, title: "Login Error Message", file: "09_error.png", week: 3 },
];

const WEEKS = [
  {
    n: 1,
    title: "Requirements Analysis & User Interface Design",
    topics: "Introduction to mobile apps · UI/UX principles · Requirements gathering",
    instructions: [
      "Understand what a mobile application is and compare native vs cross-platform approaches.",
      "Gather functional and non-functional requirements from a real-world scenario.",
      "Sketch user flows and wireframes before writing code.",
      "Choose a colour palette and typography that match the project theme.",
      "Build a UI prototype (web) as a visual reference for the Flutter app.",
    ],
    activities: [
      "Studied mobile platforms: Android, iOS, and cross-platform frameworks (Flutter chosen).",
      "Defined Nikah Planner — Islamic-friendly wedding planning (budget, guests, schedule, vendors, gallery).",
      "Identified actors: bride/groom couple, guest coordinator, vendors.",
      "Listed functional requirements: login, dashboard, budget tracker, RSVP guest list, event timeline.",
      "Built React + Vite prototype in src/ — 15 pages (SplashScreen, LoginPage, HomePage, BudgetPage, GuestListPage, SchedulePage, GalleryPage, VendorPage, ProfilePage, SettingsPage, etc.).",
      "Applied gold (#B8956A) and sage (#8FB5B0) theme in src/styles/theme.css.",
      "Mapped navigation: Splash → Auth → Dashboard with BottomNav (Home, Guests, Schedule, Budget, More).",
      "Documented CAT rubric alignment in README and guidelines/Guidelines.md.",
    ],
    files: "src/app/components/*.tsx · src/styles/theme.css · guidelines/Guidelines.md",
    outcome: "Complete UI prototype and requirements document ready for Flutter port.",
    challenge: "Balancing modern mobile UX with cultural wedding traditions (Akad, Walimah, guest sides).",
  },
  {
    n: 2,
    title: "Flutter Project Setup & Theme System",
    topics: "Flutter SDK · Project structure · Material Design · Custom widgets",
    instructions: [
      "Install Flutter SDK and Android toolchain.",
      "Create a new Flutter project with proper folder structure.",
      "Configure pubspec.yaml (dependencies, fonts, assets).",
      "Implement a global ThemeData (colours, typography, button styles).",
      "Build the Splash screen as the first visible screen.",
    ],
    activities: [
      "Created nikah_planner/ with flutter create — organized lib/core, lib/features, lib/router, lib/services.",
      "Added dependencies: go_router, flutter_riverpod, fl_chart, google_fonts, shared_preferences, firebase_core, firebase_auth, cloud_firestore.",
      "Defined app_colors.dart — gold, sage, cream, navy, semantic colours for RSVP states.",
      "Built app_theme.dart — Playfair Display (headings) + DM Sans (body) via google_fonts package.",
      "Implemented splash_screen.dart — animated logo, tagline, auto-redirect to /login.",
      "Created wedding_widgets.dart — WeddingCard, PrimaryButton, WeddingInputField, SectionHeader, StatusChip.",
      "Matched React prototype colours and spacing in Flutter Material widgets.",
    ],
    files: "pubspec.yaml · lib/core/theme/app_colors.dart · app_theme.dart · lib/features/splash/splash_screen.dart · lib/core/widgets/wedding_widgets.dart",
    outcome: "Flutter project runs with branded Splash screen and reusable design system.",
    challenge: "Reproducing the React prototype look-and-feel using Flutter Material components.",
  },
  {
    n: 3,
    title: "Authentication, Forms & Navigation",
    topics: "Event handling · Form validation · go_router · Stack navigation",
    instructions: [
      "Build login and registration forms with TextField validation.",
      "Handle button onPressed events and display error messages.",
      "Set up named routes with go_router.",
      "Implement a bottom navigation shell for the main app.",
      "Manage navigation between auth screens and the main dashboard.",
    ],
    activities: [
      "Built login_screen.dart — email/password TextFormField, validate empty fields, loading state on submit.",
      "Built register_screen.dart — couple name, email, password, wedding date fields.",
      "Created auth_service.dart — AuthResult (success/failure), demo mode, Firebase Auth when configured.",
      "Configured app_router.dart routes: /splash, /login, /register, /home, /budget, /guests, /gallery, /schedule, /vendors, /profile, /settings, /notifications, /invitation.",
      "Built main_shell.dart — BottomNavigationBar with 5 tabs (Home, Guests, Schedule, Budget, More).",
      "Implemented redirect: unauthenticated users sent to /login; after login → /home.",
      "Added error handling — AuthResult.failure('Incorrect password') shown as SnackBar (Screenshot 9).",
    ],
    files: "lib/features/auth/ · lib/router/app_router.dart · lib/features/shell/main_shell.dart · lib/services/auth_service.dart",
    outcome: "Full auth flow and 14-route navigation map working end-to-end.",
    challenge: "Separating auth routes from MainShell routes while keeping deep links functional.",
  },
  {
    n: 4,
    title: "Core Application Screens & Event Handling",
    topics: "Lists · Filters · Charts · onTap · setState · Data display",
    instructions: [
      "Build list views with ListView.builder for guests, vendors, events.",
      "Add filter chips and search bars (event handling on user tap).",
      "Display charts for budget data using a chart library.",
      "Use expandable widgets for schedule timeline items.",
      "Connect each screen to the navigation shell.",
    ],
    activities: [
      "home_screen.dart — wedding countdown (days/hours), task checklist, budget summary card, quick-action buttons.",
      "budget_screen.dart — fl_chart PieChart for expense categories, category list, tap to view details.",
      "guest_list_screen.dart — FilterChip for RSVP (Confirmed/Pending/Declined), bride/groom side filter, search TextField.",
      "schedule_screen.dart — ExpansionTile timeline: Akad Nikah, Bersanding, Reception with date/time/location.",
      "gallery_screen.dart — GridView of decoration photos with cached_network_image.",
      "vendor_screen.dart — vendor list (catering, photography, venue) with contact info.",
      "invitation_screen.dart — digital and physical invitation card previews.",
      "profile_screen.dart — bride & groom names, wedding date, venue.",
      "notifications_screen.dart — notification list with read/unread states.",
      "settings_screen.dart — toggles, account info, sign-out button.",
      "more_screen.dart — hub linking to Schedule, Vendors, Profile, Settings.",
    ],
    files: "lib/features/home/ · budget/ · guests/ · schedule/ · gallery/ · vendors/ · invitation/ · profile/ · notifications/ · settings/ · more/",
    outcome: "14 screens built — all CAT UI and event-handling criteria demonstrated.",
    challenge: "Keeping scroll performance smooth on guest lists with 50+ entries and multiple active filters.",
  },
  {
    n: 5,
    title: "Local Storage & Data Retrieval",
    topics: "SharedPreferences · JSON · Repository pattern · Session vs permanent storage",
    instructions: [
      "Understand the difference between temporary (RAM) and permanent (disk) storage.",
      "Use SharedPreferences to persist simple data on the device.",
      "Serialize Dart objects to JSON for storage and deserialization on load.",
      "Implement a Repository pattern to abstract data access from UI screens.",
      "Load saved data when the app starts and display it on screen.",
    ],
    activities: [
      "Created mock_data.dart — demo wedding profile for Siti & Ahmad (guests, budget categories, schedule events, vendors).",
      "Built wedding_models.dart and wedding_profile.dart — typed Dart models for all wedding data.",
      "Implemented local_wedding_store.dart — SharedPreferences keys: nikah_local_users, nikah_local_weddings, nikah_email_index; stores JSON strings.",
      "Created wedding_session.dart — in-memory WeddingProfile active during app session (cleared on sign-out).",
      "Built wedding_repository.dart — activateSessionForUser(), loadProfile(), saveProfile(); chooses local store or Firestore.",
      "Built wedding_data_factory.dart — creates default wedding profile for new registrations.",
      "Demonstrated flow: login → repository loads profile → dashboard displays countdown and guest count.",
      "Note: MySQL is NOT used — local storage is SharedPreferences (key-value JSON on device).",
    ],
    files: "lib/core/data/mock_data.dart · lib/models/wedding_profile.dart · lib/services/local_wedding_store.dart · wedding_repository.dart · wedding_session.dart",
    outcome: "App persists user accounts and wedding data locally without internet or Firebase.",
    challenge: "Encoding nested lists (guests, events, budget items) as JSON without data loss.",
  },
  {
    n: 6,
    title: "Networking, Firebase API & Cloud Storage",
    topics: "Client-server · REST/API concepts · Firebase Auth · Cloud Firestore · Task 2 DB design",
    instructions: [
      "Understand client-server architecture: mobile app = client, remote server = backend.",
      "Learn what an API is and how JSON is used for data exchange.",
      "Configure Firebase project and add flutterfire to the app.",
      "Use Firebase Auth for user registration and login.",
      "Read/write documents in Cloud Firestore collections.",
      "Design a relational database schema (Task 2 — on paper, not MySQL in the app).",
    ],
    activities: [
      "Added firebase_core, firebase_auth, cloud_firestore to pubspec.yaml.",
      "Built auth_service.dart — detects DefaultFirebaseOptions.isConfigured; falls back to demo mode if Firebase unavailable.",
      "Built firestore_service.dart — collections: users/{userId}, weddings/{weddingId}, guests, budgetCategories, events, vendors sub-collections.",
      "WeddingRepository syncs to Firestore when firebaseAvailable = true.",
      "Documented setup in FIREBASE_SETUP.md — Auth, Firestore rules, flutterfire configure steps.",
      "Studied GET vs POST concepts (Firestore SDK handles HTTP internally).",
      "Task 2 (coursework): designed students/courses/enrollments/attendance tables with PKs, FKs, 3NF — documented in Section 4 of this logbook.",
      "Confirmed: Nikah Planner uses Firestore (NoSQL cloud), NOT MySQL.",
    ],
    files: "lib/services/auth_service.dart · firestore_service.dart · firebase_options.dart · FIREBASE_SETUP.md",
    outcome: "Cloud-ready app with Firebase Auth + Firestore; works offline in demo mode without config.",
    challenge: "Graceful fallback when Firebase is not configured — app must still run for demonstration.",
  },
  {
    n: 7,
    title: "Testing, Documentation & Submission",
    topics: "End-to-end testing · Screenshot evidence · README · Week 6–7 revision",
    instructions: [
      "Test every screen and navigation path on emulator or real device.",
      "Capture screenshots for CAT evidence.",
      "Write clear README with setup and run instructions.",
      "Prepare logbook documenting all weeks and CAT criteria.",
      "Answer Week 6–7 revision questions on networking, APIs, JSON, Firebase, storage.",
    ],
    activities: [
      "Ran flutter analyze — no errors in production code.",
      "Tested demo mode: any email + password → opens Siti & Ahmad sample wedding.",
      "Tested register → new local account → custom wedding profile saved in SharedPreferences.",
      "Verified all 14 screens accessible via bottom nav and More menu.",
      "Tested guest RSVP filters, budget pie chart, schedule expansion, sign-out flow.",
      "Captured 9 UI screenshots for CAT (splash, login, register, dashboard, budget, guests, schedule, settings, error).",
      "Wrote nikah_planner/README.md and SOUMISSION_PROF.md for instructor.",
      "Published source code on GitHub: github.com/moinaalia/nikah-planner.",
      "Completed revision Q&A (Section 8) — networking, client-server, API, JSON, Firebase, CRUD, local vs cloud.",
      "Finalized this CAT logbook (Weeks 1–7) for submission.",
    ],
    files: "README.md · SOUMISSION_PROF.md · test/ · integration_test/screenshots_test.dart",
    outcome: "Tested, documented, and submission-ready Nikah Planner package.",
    challenge: "Testing on Windows without Android emulator — used flutter run on Edge web where possible.",
  },
];

function esc(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pb() {
  return '<br clear="all" style="page-break-before:always;mso-break-type:section-break"/>';
}

function h1(text) {
  return `<h1 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2.5pt solid ${GOLD};padding-bottom:6pt;margin:0 0 14pt;">${esc(text)}</h1>`;
}

function h2(text) {
  return `<h2 style="font-family:Georgia;font-size:13pt;color:${NAVY};margin:16pt 0 8pt;">${esc(text)}</h2>`;
}

function p(text) {
  return `<p style="font-family:Calibri;font-size:11pt;line-height:1.55;color:#222;margin:0 0 10pt;text-align:justify;">${text}</p>`;
}

function markRow(label = "Instructor mark") {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:14pt 0;border:1pt solid #DDD;">
  <tr style="background:#F7F7F7;">
    <td style="padding:8pt 12pt;font-family:Calibri;font-size:10pt;width:28%;"><b>${esc(label)}</b></td>
    <td style="padding:8pt 12pt;font-family:Calibri;font-size:10pt;width:22%;">________ / ______</td>
    <td style="padding:8pt 12pt;font-family:Calibri;font-size:10pt;"><b>Date:</b> _______________</td>
  </tr>
  <tr>
    <td colspan="3" style="padding:8pt 12pt;font-family:Calibri;font-size:10pt;border-top:1pt solid #DDD;">
      <b>Instructor comments:</b> _________________________________________________________________
    </td>
  </tr>
</table>`;
}

function shotPlaceholder(s) {
  const exists = fs.existsSync(path.join(shotsDir, s.file));
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;page-break-inside:avoid;">
  <tr>
    <td style="background:${NAVY};padding:7pt 12pt;">
      <span style="color:#fff;font-family:Calibri;font-size:10pt;font-weight:bold;">Figure ${s.n} — ${esc(s.title)} (Week ${s.week})</span>
    </td>
  </tr>
  <tr>
    <td style="border:2pt dashed ${GOLD};background:${CREAM};padding:24pt;text-align:center;height:280px;vertical-align:middle;">
      <p style="font-family:Calibri;font-size:12pt;color:${NAVY};margin:0 0 6pt;"><b>[ Insert screenshot here ]</b></p>
      <p style="font-family:Consolas;font-size:9pt;color:#888;margin:0;">${esc(s.file)}</p>
      <p style="font-family:Calibri;font-size:9pt;color:#AAA;margin:10pt 0 0;">Word: Insert → Pictures → This Device</p>
      ${exists ? '<p style="font-size:8pt;color:#6A9;margin:6pt 0 0;">File found in screenshots folder</p>' : ""}
    </td>
  </tr>
  <tr>
    <td style="padding:6pt 12pt;font-family:Calibri;font-size:9pt;color:#666;font-style:italic;border:1pt solid #EEE;border-top:none;">
      Caption: ${esc(s.title)} — Nikah Planner mobile application
    </td>
  </tr>
</table>`;
}

function cover() {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border:3pt double ${GOLD};">
  <tr><td style="padding:36pt 30pt;text-align:center;background:${CREAM};">
    <p style="font-family:Calibri;font-size:10pt;color:#888;letter-spacing:3pt;margin:0 0 24pt;">CONTINUOUS ASSESSMENT TEST (CAT)</p>
    <p style="font-family:Georgia;font-size:28pt;color:${NAVY};margin:0 0 10pt;font-weight:bold;">Development Logbook</p>
    <p style="font-family:Calibri;font-size:13pt;color:${GOLD};margin:0 0 30pt;">Week 1 — Week 7 · Technical Report</p>
    <table width="85%" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;text-align:left;">
      <tr><td style="padding:9pt 0;border-bottom:1pt solid #E0D8D0;font-family:Calibri;font-size:11pt;"><b>Module:</b> ${esc(STUDENT.module)}</td></tr>
      <tr><td style="padding:9pt 0;border-bottom:1pt solid #E0D8D0;font-family:Calibri;font-size:11pt;"><b>Project:</b> ${esc(STUDENT.project)}</td></tr>
      <tr><td style="padding:9pt 0;border-bottom:1pt solid #E0D8D0;font-family:Calibri;font-size:11pt;"><b>Student name:</b> ${esc(STUDENT.name)}</td></tr>
      <tr><td style="padding:9pt 0;border-bottom:1pt solid #E0D8D0;font-family:Calibri;font-size:11pt;"><b>Student ID:</b> ${esc(STUDENT.id)}</td></tr>
      <tr><td style="padding:9pt 0;border-bottom:1pt solid #E0D8D0;font-family:Calibri;font-size:11pt;"><b>GitHub:</b> ${esc(STUDENT.github)}</td></tr>
      <tr><td style="padding:9pt 0;font-family:Calibri;font-size:11pt;"><b>Submission date:</b> ${esc(STUDENT.date)}</td></tr>
    </table>
  </td></tr>
</table>
${pb()}`;
}

function toc() {
  const items = [
    ["1", "Student & Project Information"],
    ["2", "Weekly Development Log (Week 1 – 7)"],
    ["3", "CAT Assessment Criteria & Evidence"],
    ["4", "Task 2 — Student Database Design"],
    ["5", "Application Architecture"],
    ["6", "Testing & Demonstration Guide"],
    ["7", "Screenshots (Evidence)"],
    ["8", "Week 6–7 Revision Questions"],
    ["9", "Grading Sheet (Instructor)"],
    ["10", "References & Declaration"],
  ];
  const rows = items.map(([n, t]) => `
    <tr>
      <td style="padding:7pt 10pt;font-family:Calibri;font-size:11pt;border-bottom:1pt dotted #CCC;width:30pt;">${n}.</td>
      <td style="padding:7pt 10pt;font-family:Calibri;font-size:11pt;border-bottom:1pt dotted #CCC;">${esc(t)}</td>
      <td style="padding:7pt 10pt;font-family:Calibri;font-size:11pt;border-bottom:1pt dotted #CCC;text-align:right;color:#BBB;">...</td>
    </tr>`).join("");
  return `${h1("Table of Contents")}<table width="100%" cellpadding="0" cellspacing="0">${rows}</table>${pb()}`;
}

function section1() {
  return `
${h1("1. Student & Project Information")}
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:11pt;">
  <tr style="background:${NAVY};color:#fff;"><td colspan="2" style="padding:8pt;"><b>Student details</b></td></tr>
  <tr><td style="border:1pt solid #DDD;padding:8pt;width:35%;"><b>Full name</b></td><td style="border:1pt solid #DDD;padding:8pt;">${esc(STUDENT.name)}</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;padding:8pt;"><b>Student ID</b></td><td style="border:1pt solid #DDD;padding:8pt;">${esc(STUDENT.id)}</td></tr>
  <tr><td style="border:1pt solid #DDD;padding:8pt;"><b>Module</b></td><td style="border:1pt solid #DDD;padding:8pt;">${esc(STUDENT.module)}</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;padding:8pt;"><b>Submission date</b></td><td style="border:1pt solid #DDD;padding:8pt;">${esc(STUDENT.date)}</td></tr>
</table>
${h2("1.1 Project overview")}
${p(`<b>Nikah Planner</b> is a cross-platform wedding planning mobile application built with <b>Flutter</b>.
It helps couples plan an Islamic-friendly wedding by managing budget, guest lists (RSVP), event schedules,
vendor contacts, and photo galleries. The app supports offline demo mode with local storage and optional
Firebase cloud synchronisation.`)}
${h2("1.2 Technology stack")}
<table width="100%" cellpadding="7" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10.5pt;">
  <tr style="background:#EEE;"><td><b>Component</b></td><td><b>Technology</b></td></tr>
  <tr><td style="border-top:1pt solid #DDD;">Mobile framework</td><td style="border-top:1pt solid #DDD;">Flutter 3.x / Dart</td></tr>
  <tr style="background:${CREAM};"><td>Navigation</td><td>go_router + bottom tab bar</td></tr>
  <tr><td>State management</td><td>Riverpod</td></tr>
  <tr style="background:${CREAM};"><td>Local storage</td><td>SharedPreferences + JSON</td></tr>
  <tr><td>Cloud backend</td><td>Firebase Auth + Cloud Firestore</td></tr>
  <tr><td>Charts</td><td>fl_chart</td></tr>
  <tr style="background:${CREAM};"><td>UI prototype</td><td>React + Vite + Tailwind CSS</td></tr>
  <tr><td>Version control</td><td>Git / GitHub (moinaalia/nikah-planner)</td></tr>
</table>
${h2("1.3 Complete application inventory — Nikah Planner")}
<p style="font-family:Calibri;font-size:10pt;color:#666;margin:0 0 8pt;"><b>14 Flutter screens built (nikah_planner/lib/features/):</b></p>
<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10pt;margin-bottom:12pt;">
  <tr style="background:${NAVY};color:#fff;"><td><b>#</b></td><td><b>Screen</b></td><td><b>File</b></td><td><b>Main features</b></td></tr>
  <tr><td style="border:1pt solid #DDD;">1</td><td style="border:1pt solid #DDD;">Splash</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">splash_screen.dart</td><td style="border:1pt solid #DDD;">Animated logo, auto-redirect</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">2</td><td style="border:1pt solid #DDD;">Login</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">login_screen.dart</td><td style="border:1pt solid #DDD;">Email/password, demo mode, error message</td></tr>
  <tr><td style="border:1pt solid #DDD;">3</td><td style="border:1pt solid #DDD;">Register</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">register_screen.dart</td><td style="border:1pt solid #DDD;">Couple account creation</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">4</td><td style="border:1pt solid #DDD;">Dashboard</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">home_screen.dart</td><td style="border:1pt solid #DDD;">Countdown, tasks, budget snapshot</td></tr>
  <tr><td style="border:1pt solid #DDD;">5</td><td style="border:1pt solid #DDD;">Budget</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">budget_screen.dart</td><td style="border:1pt solid #DDD;">Pie chart (fl_chart), expense categories</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">6</td><td style="border:1pt solid #DDD;">Guests</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">guest_list_screen.dart</td><td style="border:1pt solid #DDD;">RSVP filters, search, bride/groom side</td></tr>
  <tr><td style="border:1pt solid #DDD;">7</td><td style="border:1pt solid #DDD;">Gallery</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">gallery_screen.dart</td><td style="border:1pt solid #DDD;">Photo grid, decoration ideas</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">8</td><td style="border:1pt solid #DDD;">Schedule</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">schedule_screen.dart</td><td style="border:1pt solid #DDD;">Expandable event timeline</td></tr>
  <tr><td style="border:1pt solid #DDD;">9</td><td style="border:1pt solid #DDD;">More</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">more_screen.dart</td><td style="border:1pt solid #DDD;">Hub to sub-modules</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">10</td><td style="border:1pt solid #DDD;">Vendors</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">vendor_screen.dart</td><td style="border:1pt solid #DDD;">Catering, photo, venue list</td></tr>
  <tr><td style="border:1pt solid #DDD;">11</td><td style="border:1pt solid #DDD;">Profile</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">profile_screen.dart</td><td style="border:1pt solid #DDD;">Bride & groom info</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">12</td><td style="border:1pt solid #DDD;">Invitation</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">invitation_screen.dart</td><td style="border:1pt solid #DDD;">Digital & physical cards</td></tr>
  <tr><td style="border:1pt solid #DDD;">13</td><td style="border:1pt solid #DDD;">Notifications</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">notifications_screen.dart</td><td style="border:1pt solid #DDD;">Alert list</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;">14</td><td style="border:1pt solid #DDD;">Settings</td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9pt;">settings_screen.dart</td><td style="border:1pt solid #DDD;">Preferences, sign out</td></tr>
</table>
${h2("1.4 Data storage — what we used (and what we did NOT use)")}
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10.5pt;">
  <tr style="background:#E8F5E9;"><td style="border:1pt solid #DDD;width:35%;"><b>✓ Used</b></td><td style="border:1pt solid #DDD;"><b>SharedPreferences</b> — local JSON on device (offline demo accounts & wedding data)</td></tr>
  <tr style="background:#E8F5E9;"><td style="border:1pt solid #DDD;"><b>✓ Used</b></td><td style="border:1pt solid #DDD;"><b>Firebase Firestore</b> — cloud NoSQL database (users, weddings, guests, budget, events)</td></tr>
  <tr style="background:#E8F5E9;"><td style="border:1pt solid #DDD;"><b>✓ Used</b></td><td style="border:1pt solid #DDD;"><b>Firebase Auth</b> — email/password authentication in cloud mode</td></tr>
  <tr style="background:#FFEBEE;"><td style="border:1pt solid #DDD;"><b>✗ Not used</b></td><td style="border:1pt solid #DDD;"><b>MySQL</b> — server database not connected to Flutter mobile app</td></tr>
  <tr style="background:#FFEBEE;"><td style="border:1pt solid #DDD;"><b>✗ Not used</b></td><td style="border:1pt solid #DDD;"><b>SQLite</b> — not used in Nikah Planner (local storage is SharedPreferences)</td></tr>
</table>
${pb()}`;
}

function weekBlock(w) {
  const instr = w.instructions.map((a) => `<li style="margin:3pt 0;font-family:Calibri;font-size:10pt;color:#555;">${esc(a)}</li>`).join("");
  const acts = w.activities.map((a) => `<li style="margin:4pt 0;font-family:Calibri;font-size:10.5pt;line-height:1.45;">${esc(a)}</li>`).join("");
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 6pt;">
  <tr>
    <td style="background:${NAVY};color:#fff;padding:10pt 14pt;">
      <span style="font-family:Georgia;font-size:14pt;">Week ${w.n}</span>
      <span style="font-family:Calibri;font-size:12pt;"> — ${esc(w.title)}</span>
    </td>
  </tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8pt;">
  <tr><td style="padding:8pt 0;font-family:Calibri;font-size:10pt;color:#666;"><b>Module topics:</b> ${esc(w.topics)}</td></tr>
  <tr><td style="padding:4pt 0;font-family:Calibri;font-size:10pt;"><b>Week dates:</b> _______________ to _______________</td></tr>
</table>
${h2(`Week ${w.n} — Module instructions (what we were asked to do)`)}
<ul style="margin:0 0 12pt;padding-left:18pt;border-left:3pt solid ${GOLD};padding-left:14pt;">${instr}</ul>
${h2(`Week ${w.n} — What I completed on Nikah Planner`)}
<ul style="margin:0 0 10pt;padding-left:18pt;">${acts}</ul>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin:8pt 0;font-family:Calibri;font-size:10pt;">
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;width:22%;"><b>Key files</b></td><td style="border:1pt solid #DDD;font-family:Consolas;font-size:9.5pt;">${esc(w.files)}</td></tr>
  <tr><td style="border:1pt solid #DDD;"><b>Learning outcome</b></td><td style="border:1pt solid #DDD;">${esc(w.outcome)}</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;"><b>Challenge faced</b></td><td style="border:1pt solid #DDD;">${esc(w.challenge)}</td></tr>
</table>
${markRow(`Week ${w.n} mark`)}
${w.n < 7 ? pb() : ""}`;
}

function section2() {
  return `${h1("2. Weekly Development Log (Week 1 – 7)")}
${p("This section records — for each week — the <b>module instructions</b> (what we were taught to do) and <b>what was actually built</b> on the Nikah Planner application.")}
${WEEKS.map(weekBlock).join("\n")}
${pb()}`;
}

function section3() {
  const criteria = [
    ["User Interface Design", "5", "13 screens with gold/sage theme, reusable widgets, consistent typography", "Screenshots 1–8"],
    ["Navigation", "4", "GoRouter named routes, bottom tabs, stack navigation to sub-screens", "Screenshot 4"],
    ["Event Handling", "—", "Form validation, onTap/onChanged, filters, setState, button actions", "Screenshots 5–7"],
    ["Local Storage", "5", "SharedPreferences JSON persistence for wedding profiles", "Week 5 log"],
    ["Data Retrieval", "4", "WeddingRepository load/save; mock data and Firestore retrieval", "Week 5 log"],
    ["Networking / API", "5", "Firebase Auth + Cloud Firestore with offline fallback", "auth_service.dart"],
    ["Error Handling", "3", "AuthResult type, validation messages, try/catch on network calls", "Screenshot 9"],
  ];
  const rows = criteria.map(([c, m, e, s], i) => `
    <tr style="background:${i % 2 ? CREAM : "#fff"};">
      <td style="padding:8pt;border:1pt solid #DDD;font-family:Calibri;font-size:10pt;">${esc(c)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;text-align:center;">${esc(m)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;font-family:Calibri;font-size:10pt;">${esc(e)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;font-family:Calibri;font-size:9.5pt;">${esc(s)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;">______</td>
    </tr>`).join("");
  return `
${h1("3. CAT Assessment Criteria & Evidence")}
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
  <tr style="background:${NAVY};color:#fff;font-family:Calibri;font-size:10pt;">
    <td style="padding:8pt;"><b>Criterion</b></td>
    <td style="padding:8pt;width:40pt;"><b>Max</b></td>
    <td style="padding:8pt;"><b>How I met it (Nikah Planner)</b></td>
    <td style="padding:8pt;width:80pt;"><b>Evidence</b></td>
    <td style="padding:8pt;width:50pt;"><b>Mark</b></td>
  </tr>${rows}
</table>
${pb()}`;
}

function section4() {
  return `
${h1("4. Task 2 — Student Database Design")}
${p("Design a relational database for a university student management system. The schema below supports student registration, course enrolment, and attendance tracking.")}
${h2("4.1 Entity-Relationship overview")}
<p style="font-family:Consolas;font-size:9.5pt;background:#F8F8F8;padding:12pt;border:1pt solid #DDD;line-height:1.7;">
students (1) ──&lt; enrollments &gt;── (N) courses<br/>
enrollments (1) ──&lt; attendance
</p>
${h2("4.2 Table definitions")}
<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10pt;margin:8pt 0;">
  <tr style="background:${GOLD};color:#fff;"><td colspan="3"><b>students</b> — Primary Key: student_id</td></tr>
  <tr style="background:#EEE;"><td><b>Column</b></td><td><b>Type</b></td><td><b>Constraints</b></td></tr>
  <tr><td>student_id</td><td>VARCHAR(20)</td><td>PRIMARY KEY</td></tr>
  <tr style="background:${CREAM};"><td>full_name</td><td>VARCHAR(100)</td><td>NOT NULL</td></tr>
  <tr><td>year_of_study</td><td>INTEGER</td><td>NOT NULL, CHECK (1–5)</td></tr>
  <tr style="background:${CREAM};"><td>phone_number</td><td>VARCHAR(20)</td><td>UNIQUE</td></tr>
  <tr><td>password_hash</td><td>VARCHAR(255)</td><td>NOT NULL (hashed, never plain text)</td></tr>
</table>
<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10pt;margin:8pt 0;">
  <tr style="background:${NAVY};color:#fff;"><td colspan="3"><b>courses</b> — Primary Key: course_id</td></tr>
  <tr><td>course_id</td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td></tr>
  <tr style="background:${CREAM};"><td>course_code</td><td>VARCHAR(20)</td><td>UNIQUE NOT NULL</td></tr>
  <tr><td>course_name</td><td>VARCHAR(100)</td><td>NOT NULL</td></tr>
</table>
<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10pt;margin:8pt 0;">
  <tr style="background:#7A6B8A;color:#fff;"><td colspan="3"><b>enrollments</b> — PK: enrollment_id · FK: student_id, course_id</td></tr>
  <tr><td>enrollment_id</td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td></tr>
  <tr style="background:${CREAM};"><td>student_id</td><td>VARCHAR(20)</td><td>FOREIGN KEY → students(student_id)</td></tr>
  <tr><td>course_id</td><td>INTEGER</td><td>FOREIGN KEY → courses(course_id)</td></tr>
  <tr style="background:${CREAM};"><td>enrolled_date</td><td>DATE</td><td>NOT NULL DEFAULT CURRENT_DATE</td></tr>
</table>
<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10pt;margin:8pt 0;">
  <tr style="background:#6B8F71;color:#fff;"><td colspan="3"><b>attendance</b> — PK: attendance_id · FK: enrollment_id</td></tr>
  <tr><td>attendance_id</td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td></tr>
  <tr style="background:${CREAM};"><td>enrollment_id</td><td>INTEGER</td><td>FOREIGN KEY → enrollments(enrollment_id)</td></tr>
  <tr><td>attendance_date</td><td>DATE</td><td>NOT NULL</td></tr>
  <tr style="background:${CREAM};"><td>status</td><td>VARCHAR(10)</td><td>CHECK (present, absent, late)</td></tr>
</table>
${h2("4.3 Normalization & security")}
<ul style="font-family:Calibri;font-size:10.5pt;line-height:1.6;">
  <li><b>1NF:</b> All columns contain atomic values (no repeating groups).</li>
  <li><b>2NF:</b> No partial dependencies — all non-key attributes depend on the full primary key.</li>
  <li><b>3NF:</b> No transitive dependencies — course details stored only in courses table.</li>
  <li><b>Password security:</b> SHA-256 hash with random salt before INSERT — passwords never stored as plain text.</li>
</ul>
${markRow("Task 2 mark")}
${pb()}`;
}

function section5() {
  return `
${h1("5. Application Architecture")}
<pre style="font-family:Consolas;font-size:9.5pt;background:#F8F8F8;padding:14pt;border:1pt solid #DDD;line-height:1.65;">
┌──────────────────────────────────────────────────────┐
│              NIKAH PLANNER (Flutter UI)               │
│   Splash → Login/Register → Dashboard → Modules       │
│   (Budget · Guests · Schedule · Gallery · Settings)   │
└────────────────────┬─────────────────────────────────┘
                     │
         ┌───────────┴────────────┐
         ▼                        ▼
  SharedPreferences          Firebase Cloud
  (local JSON on device)  (Auth + Firestore)
  offline demo mode         optional cloud sync

Firestore collections:
  users/{userId}
  weddings/{weddingId}/guests/{guestId}
  weddings/{weddingId}/budgetCategories/{catId}
  weddings/{weddingId}/events/{eventId}
  weddings/{weddingId}/vendors/{vendorId}
</pre>
${pb()}`;
}

function section6() {
  return `
${h1("6. Testing & Demonstration Guide")}
<table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
  <tr><td style="background:${NAVY};color:#fff;font-family:Calibri;font-size:10pt;padding:8pt;"><b>Step</b></td><td style="background:${NAVY};color:#fff;font-family:Calibri;font-size:10pt;padding:8pt;"><b>Action</b></td></tr>
  <tr><td style="border:1pt solid #DDD;padding:8pt;">1</td><td style="border:1pt solid #DDD;padding:8pt;font-family:Consolas;font-size:9.5pt;">git clone https://github.com/moinaalia/nikah-planner</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;padding:8pt;">2</td><td style="border:1pt solid #DDD;padding:8pt;font-family:Consolas;font-size:9.5pt;">cd nikah_planner</td></tr>
  <tr><td style="border:1pt solid #DDD;padding:8pt;">3</td><td style="border:1pt solid #DDD;padding:8pt;font-family:Consolas;font-size:9.5pt;">flutter pub get</td></tr>
  <tr style="background:${CREAM};"><td style="border:1pt solid #DDD;padding:8pt;">4</td><td style="border:1pt solid #DDD;padding:8pt;font-family:Consolas;font-size:9.5pt;">flutter run</td></tr>
  <tr><td style="border:1pt solid #DDD;padding:8pt;">5</td><td style="border:1pt solid #DDD;padding:8pt;font-family:Calibri;font-size:10pt;">Demo login: any email + any password → explore all screens</td></tr>
</table>
${pb()}`;
}

function section7() {
  return `
${h1("7. Screenshots (Evidence)")}
${p("Insert screenshots below using <b>Insert → Pictures → This Device</b> in Microsoft Word. Each figure supports the CAT criteria listed in Section 3.")}
${SCREENSHOTS.map(shotPlaceholder).join("\n")}
${pb()}`;
}

function section8() {
  const qa = [
    ["What is mobile application networking?", "Communication between a mobile app (client) and remote servers over the internet using protocols like HTTP/HTTPS. In Nikah Planner, Firebase provides the network layer for authentication and cloud data storage."],
    ["Explain client-server architecture.", "The client (mobile app) sends requests; the server processes them and returns responses. The app never accesses the database directly — Firebase acts as the intermediary server."],
    ["What is an API?", "Application Programming Interface — a set of rules and endpoints that allow software programs to communicate. Firebase SDK provides APIs for Auth, Firestore, etc."],
    ["What is JSON?", "JavaScript Object Notation — a lightweight text format for data exchange: { \"name\": \"Siti\", \"rsvp\": \"confirmed\" }. Used in SharedPreferences storage."],
    ["Differentiate GET and POST HTTP methods.", "GET retrieves data from a server (read-only, parameters in URL). POST sends data to create or update resources (data in request body). Firestore uses both internally."],
    ["What is SQLite?", "A lightweight embedded relational database engine that runs on the device. It stores structured data locally and supports SQL queries — useful for offline mobile apps."],
    ["What is Firebase?", "Google's Backend-as-a-Service platform providing Authentication, Cloud Firestore, Storage, and more — accessed via mobile SDK without building a custom server."],
    ["Explain CRUD operations.", "Create, Read, Update, Delete — the four basic data operations. Implemented in Nikah Planner via Firestore and SharedPreferences (guests, budget, schedule)."],
    ["Compare local storage vs cloud storage.", "Local (SharedPreferences): on-device, works offline, data stays on phone. Cloud (Firebase): requires internet, syncs across devices, accessible from anywhere."],
    ["Why are databases important in mobile apps?", "They provide persistent structured storage, support complex queries (JOINs, filters), enforce data integrity (PKs, FKs), enable security (hashing), and scale with growing data."],
  ];
  const blocks = qa.map(([q, a], i) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:10pt 0;border:1pt solid #E0E0E0;">
      <tr><td style="background:${NAVY};color:#fff;padding:7pt 12pt;font-family:Calibri;font-size:10pt;"><b>Q${i + 1}.</b> ${esc(q)}</td></tr>
      <tr><td style="padding:10pt 12pt;font-family:Calibri;font-size:10.5pt;line-height:1.5;">${esc(a)}</td></tr>
    </table>`).join("");
  return `${h1("8. Week 6–7 Revision Questions")}${blocks}${pb()}`;
}

function section9() {
  const rows = [
    ["User Interface Design", "5"],
    ["Navigation", "4"],
    ["Event Handling", "—"],
    ["Local Storage", "5"],
    ["Data Retrieval", "4"],
    ["Networking / API", "5"],
    ["Error Handling", "3"],
    ["Task 2 — Database Design", "—"],
    ["Weekly Logbook (Weeks 1–7)", "—"],
  ];
  const tr = rows.map(([c, m], i) => `
    <tr style="background:${i % 2 ? CREAM : "#fff"};">
      <td style="padding:8pt;border:1pt solid #DDD;font-family:Calibri;font-size:10pt;">${c}</td>
      <td style="padding:8pt;border:1pt solid #DDD;text-align:center;">${m}</td>
      <td style="padding:8pt;border:1pt solid #DDD;">________________</td>
    </tr>`).join("");
  return `
${h1("9. Grading Sheet (Instructor)")}
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
  <tr style="background:${NAVY};color:#fff;font-family:Calibri;font-size:10pt;">
    <td style="padding:8pt;"><b>Criterion</b></td><td style="padding:8pt;width:60pt;"><b>Max Mark</b></td><td style="padding:8pt;width:100pt;"><b>Mark Awarded</b></td>
  </tr>${tr}
  <tr style="background:${GOLD};color:#fff;font-weight:bold;">
    <td style="padding:8pt;">TOTAL</td><td style="padding:8pt;text-align:center;">30+</td><td style="padding:8pt;">________________</td>
  </tr>
</table>
<p style="margin-top:24pt;font-family:Calibri;font-size:11pt;">
  <b>Instructor name:</b> _________________________________ &nbsp;&nbsp;
  <b>Signature:</b> _________________________________ &nbsp;&nbsp;
  <b>Date:</b> _______________
</p>
${pb()}`;
}

function section10() {
  return `
${h1("10. References & Declaration")}
${h2("10.1 References")}
<ol style="font-family:Calibri;font-size:10.5pt;line-height:2;">
  <li>Flutter Documentation — https://docs.flutter.dev</li>
  <li>Dart Language Tour — https://dart.dev/guides/language</li>
  <li>Firebase Documentation — https://firebase.google.com/docs</li>
  <li>go_router package — https://pub.dev/packages/go_router</li>
  <li>Android Developer Guides — https://developer.android.com</li>
  <li>Project repository — ${esc(STUDENT.github)}</li>
</ol>
${h2("10.2 Student declaration")}
<table width="100%" cellpadding="20" cellspacing="0" style="border:2pt solid ${NAVY};margin-top:12pt;">
  <tr><td style="font-family:Calibri;font-size:10.5pt;line-height:1.7;text-align:center;">
    I, <b>${esc(STUDENT.name)}</b> (${esc(STUDENT.id)}), declare that this logbook is my own work
    submitted for the Continuous Assessment Test (CAT) in ${esc(STUDENT.module)}.
    It documents Weeks 1 to 7 of the Nikah Planner mobile application project.
    <br/><br/>
    <b>Student signature:</b> _________________________ &nbsp;&nbsp;&nbsp;
    <b>Date:</b> _______________
  </td></tr>
</table>
<p style="text-align:center;font-family:Georgia;font-size:10pt;color:#AAA;margin-top:30pt;font-style:italic;">
— End of Logbook — ${esc(STUDENT.name)} · ${esc(STUDENT.id)} · ${esc(STUDENT.date)} —
</p>`;
}

const body = [
  cover(),
  toc(),
  section1(),
  section2(),
  section3(),
  section4(),
  section5(),
  section6(),
  section7(),
  section8(),
  section9(),
  section10(),
].join("\n");

const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<title>CAT Logbook — ${esc(STUDENT.name)} — Weeks 1-7</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
  @page { size: A4; margin: 2.2cm 2.5cm 2.2cm 2.5cm; }
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #222; margin: 0; }
</style>
</head>
<body>${body}</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");
fs.mkdirSync(desktopShots, { recursive: true });
for (const s of SCREENSHOTS) {
  const src = path.join(shotsDir, s.file);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(desktopShots, s.file));
}
try { fs.copyFileSync(outPath, desktopDoc); } catch { /* ignore */ }

console.log("CAT logbook Word document created:");
console.log(`  Desktop: ${desktopDoc}`);
console.log(`  Project: ${outPath}`);
console.log("");
console.log("Next steps:");
console.log("  1. Open LOGBOOK_CAT.doc in Microsoft Word");
console.log("  2. Insert screenshots (Insert -> Pictures -> This Device)");
console.log("  3. File -> Save As -> PDF for submission");
