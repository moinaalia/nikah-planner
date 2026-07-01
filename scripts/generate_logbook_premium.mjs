import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = path.join(root, "screenshots");
const outPath = path.join(root, "LOGBOOK_A_REMPLIR.doc");
const desktopDoc = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK_A_REMPLIR.doc");
const desktopShots = path.join(process.env.USERPROFILE || "", "Desktop", "Nikah_Screenshots");

const GOLD = "#B8956A";
const SAGE = "#8FB5B0";
const NAVY = "#1A2B3C";
const CREAM = "#FBF8F4";

const SCREENSHOTS = [
  { num: 1, title: "Splash Screen", file: "01_splash.png", desc: "App launch & branding" },
  { num: 2, title: "Login Screen", file: "02_login.png", desc: "Authentication UI" },
  { num: 3, title: "Register Screen", file: "03_register.png", desc: "User registration" },
  { num: 4, title: "Dashboard", file: "04_dashboard.png", desc: "Home & countdown" },
  { num: 5, title: "Budget / Reports", file: "05_budget.png", desc: "Charts & expenses" },
  { num: 6, title: "Guest List", file: "06_guests.png", desc: "RSVP filters" },
  { num: 7, title: "Schedule", file: "07_schedule.png", desc: "Event timeline" },
  { num: 8, title: "Settings", file: "08_settings.png", desc: "Profile & preferences" },
  { num: 9, title: "Error Handling", file: "09_error.png", desc: "Login error message" },
];

const WEEKS = [
  {
    n: 1,
    title: "Requirements Analysis & UI Design",
    color: GOLD,
    topics: "Mobile intro · UI/UX principles · Requirements gathering",
    activities: [
      "Defined Nikah Planner scope — Islamic-friendly wedding planning",
      "Identified actors: couple, guest coordinator, vendors",
      "Built React UI prototype (src/) — gold & sage design system",
      "Mapped user flow: Splash → Auth → Dashboard → Modules",
      "Documented CAT rubric alignment (UI, nav, storage, API)",
    ],
    evidence: "src/ React prototype · README · UI wireframes",
    challenge: "Balancing cultural wedding traditions with modern mobile UX patterns",
  },
  {
    n: 2,
    title: "Flutter Setup & Theme System",
    color: SAGE,
    topics: "Flutter SDK · Project structure · Material Design",
    activities: [
      "Initialized nikah_planner/ Flutter project",
      "Configured pubspec.yaml — fonts, assets, dependencies",
      "Created app_colors.dart & app_theme.dart (Playfair + DM Sans)",
      "Built animated Splash screen",
      "Designed reusable widgets: WeddingCard, PrimaryButton, WeddingInputField",
    ],
    evidence: "lib/core/theme/ · lib/features/splash/ · lib/core/widgets/",
    challenge: "Matching React prototype fidelity in Flutter widgets",
  },
  {
    n: 3,
    title: "Authentication & Navigation",
    color: "#5B7FA5",
    topics: "Forms · Event handling · go_router · Stack navigation",
    activities: [
      "Login screen — validation, demo mode, error states",
      "Register screen — couple account creation",
      "GoRouter named routes (app_router.dart)",
      "Auth flow: /splash → /login → /register → /home",
      "MainShell bottom navigation — 5 tabs",
    ],
    evidence: "lib/features/auth/ · lib/router/ · lib/features/shell/",
    challenge: "Managing navigation state across auth and main app shells",
  },
  {
    n: 4,
    title: "Core Application Screens",
    color: "#7A6B8A",
    topics: "Data display · Lists · Filters · Charts",
    activities: [
      "Dashboard — wedding countdown, tasks, budget snapshot",
      "Budget screen — fl_chart pie chart, expense categories",
      "Guest list — RSVP filters, bride/groom side, search",
      "Schedule — expandable event timeline",
      "Settings & Profile — preferences, sign out",
    ],
    evidence: "lib/features/home/ · budget/ · guests/ · schedule/ · settings/",
    challenge: "Responsive layouts across different screen sizes",
  },
  {
    n: 5,
    title: "Local Storage & Data Retrieval",
    color: "#6B8F71",
    topics: "SharedPreferences · JSON · Session management",
    activities: [
      "Embedded demo data — mock_data.dart (Siti & Ahmad)",
      "SharedPreferences store — local_wedding_store.dart",
      "WeddingSession — in-memory active profile",
      "WeddingRepository — load/save per user account",
      "Compared temporary (RAM) vs permanent (disk) storage",
    ],
    evidence: "mock_data.dart · local_wedding_store.dart · wedding_repository.dart",
    challenge: "Serializing complex wedding profiles to JSON safely",
  },
  {
    n: 6,
    title: "Networking, API & Database Design",
    color: "#C17B5A",
    topics: "Firebase · Client-server · Task 2 database design",
    activities: [
      "Firebase Auth — register & sign-in (auth_service.dart)",
      "Cloud Firestore — users, weddings, guests collections",
      "Offline/demo fallback when Firebase unavailable",
      "Task 2: Designed students, courses, enrollments, attendance tables",
      "Defined PKs, FKs, normalization, password hashing strategy",
    ],
    evidence: "auth_service.dart · firestore_service.dart · ER diagram (Section 5)",
    challenge: "Graceful degradation between cloud and local-only modes",
  },
  {
    n: 7,
    title: "SQLite Mini Project & Revision",
    color: NAVY,
    topics: "SQLite · CRUD · Reports · Task 3 attendance app",
    activities: [
      "Built student_attendance/ Flutter app with sqflite",
      "CRUD: register students, mark attendance, generate reports",
      "SHA-256 + salt password hashing before SQLite INSERT",
      "SQL JOIN queries for attendance percentage reports",
      "Completed Week 6–7 revision questions · GitHub publication",
    ],
    evidence: "student_attendance/lib/database/database_helper.dart",
    challenge: "Designing relational schema that supports flexible reporting",
  },
];

function esc(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pageBreak() {
  return '<br clear="all" style="page-break-before:always;mso-break-type:section-break"/>';
}

function shotBox(s, accent = GOLD) {
  const exists = fs.existsSync(path.join(shotsDir, s.file));
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:14pt 0;">
  <tr>
    <td style="background:${accent};padding:8pt 14pt;">
      <span style="color:#fff;font-family:Calibri;font-size:11pt;font-weight:bold;">SCREENSHOT ${s.num} — ${esc(s.title.toUpperCase())}</span>
    </td>
  </tr>
  <tr>
    <td style="border:2px dashed ${accent};background:${CREAM};padding:28pt;text-align:center;min-height:320px;">
      <p style="font-family:Calibri;font-size:13pt;color:${NAVY};margin:0 0 6pt;"><b>Insert screenshot here</b></p>
      <p style="font-family:Calibri;font-size:10pt;color:#888;margin:0 0 4pt;">${esc(s.desc)}</p>
      <p style="font-family:Consolas;font-size:9pt;color:#666;margin:8pt 0 0;">${esc(s.file)} ${exists ? "✓" : "(capture needed)"}</p>
      <p style="font-family:Calibri;font-size:9pt;color:#999;margin:12pt 0 0;">Insert → Pictures → This Device</p>
    </td>
  </tr>
</table>`;
}

function shotBoxCustom(title, hint, accent = NAVY) {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:14pt 0;">
  <tr><td style="background:${accent};padding:8pt 14pt;"><span style="color:#fff;font-family:Calibri;font-size:11pt;font-weight:bold;">${esc(title.toUpperCase())}</span></td></tr>
  <tr><td style="border:2px dashed ${accent};background:#F0F4F8;padding:28pt;text-align:center;min-height:280px;">
    <p style="font-family:Calibri;font-size:13pt;color:${NAVY};margin:0;"><b>Insert screenshot here</b></p>
    <p style="font-family:Calibri;font-size:9pt;color:#888;margin:10pt 0 0;">${esc(hint)}</p>
  </td></tr>
</table>`;
}

function markBox(label = "Instructor mark") {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;background:#F5F5F5;border-left:4pt solid ${GOLD};">
  <tr><td style="padding:10pt 14pt;font-family:Calibri;font-size:10pt;">
    <b>${esc(label)}:</b> _________________________ &nbsp;&nbsp;
    <b>Comments:</b> ________________________________________________
  </td></tr>
</table>`;
}

function weekCard(w) {
  const acts = w.activities.map((a) => `<li style="margin:4pt 0;font-family:Calibri;font-size:10.5pt;">${esc(a)}</li>`).join("");
  return `
${w.n > 1 ? pageBreak() : ""}
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16pt;">
  <tr>
    <td width="56" style="background:${w.color};text-align:center;vertical-align:middle;padding:12pt 0;">
      <span style="font-family:Georgia;font-size:22pt;color:#fff;font-weight:bold;">${w.n}</span>
    </td>
    <td style="background:linear-gradient(90deg,${w.color}22,transparent);padding:12pt 16pt;border-bottom:2pt solid ${w.color};">
      <p style="margin:0;font-family:Calibri;font-size:14pt;font-weight:bold;color:${NAVY};">Week ${w.n} — ${esc(w.title)}</p>
      <p style="margin:4pt 0 0;font-family:Calibri;font-size:9.5pt;color:#666;font-style:italic;">${esc(w.topics)}</p>
    </td>
  </tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:10pt;">
  <tr>
    <td width="50%" style="vertical-align:top;padding-right:10pt;">
      <p style="font-family:Calibri;font-size:10pt;font-weight:bold;color:${w.color};margin:0 0 6pt;">ACTIVITIES COMPLETED</p>
      <ul style="margin:0;padding-left:18pt;">${acts}</ul>
    </td>
    <td width="50%" style="vertical-align:top;padding-left:10pt;border-left:1pt solid #E0E0E0;">
      <p style="font-family:Calibri;font-size:10pt;font-weight:bold;color:${w.color};margin:0 0 6pt;">EVIDENCE</p>
      <p style="font-family:Consolas;font-size:9.5pt;color:#444;margin:0 0 10pt;">${esc(w.evidence)}</p>
      <p style="font-family:Calibri;font-size:10pt;font-weight:bold;color:${w.color};margin:0 0 4pt;">CHALLENGE</p>
      <p style="font-family:Calibri;font-size:10pt;color:#555;margin:0;">${esc(w.challenge)}</p>
      <p style="font-family:Calibri;font-size:10pt;margin:12pt 0 4pt;"><b>Date:</b> _______________</p>
    </td>
  </tr>
</table>
${markBox(`Week ${w.n} mark`)}`;
}

function cover() {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;min-height:700px;">
  <tr><td style="background:${NAVY};padding:40pt 30pt;text-align:center;">
    <p style="font-family:Georgia;font-size:11pt;color:${SAGE};letter-spacing:4pt;margin:0 0 20pt;">MOBILE APPLICATION DEVELOPMENT</p>
    <p style="font-family:Georgia;font-size:32pt;color:#fff;margin:0 0 8pt;font-weight:bold;">Development Logbook</p>
    <p style="font-family:Calibri;font-size:14pt;color:${GOLD};margin:0 0 30pt;">Weeks 1 — 7 · Technical Report</p>
    <table width="80%" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:20pt auto;">
      <tr><td style="border:1pt solid ${GOLD};padding:20pt 24pt;background:rgba(255,255,255,0.05);">
        <p style="font-family:Calibri;font-size:13pt;color:#fff;margin:0 0 12pt;"><b>Project:</b> Nikah Planner + Student Attendance</p>
        <p style="font-family:Calibri;font-size:13pt;color:#fff;margin:0 0 12pt;"><b>Student:</b> Hadidja Aliani</p>
        <p style="font-family:Calibri;font-size:13pt;color:#fff;margin:0 0 12pt;"><b>Student ID:</b> BIT/2023/62116</p>
        <p style="font-family:Calibri;font-size:13pt;color:#fff;margin:0 0 12pt;"><b>GitHub:</b> github.com/moinaalia/nikah-planner</p>
        <p style="font-family:Calibri;font-size:13pt;color:#fff;margin:0;"><b>Submission:</b> June 2026</p>
      </td></tr>
    </table>
    <p style="font-family:Calibri;font-size:10pt;color:#8899AA;margin-top:30pt;">Flutter · Firebase · SQLite · Material Design</p>
  </td></tr>
</table>
${pageBreak()}`;
}

function toc() {
  const items = [
    "1. Project Overview",
    "2. Weekly Logbook — Weeks 1 to 7",
    "3. CAT Requirements Coverage",
    "4. Task 2 — Student Database Design",
    "5. Task 3 — Attendance Mini Project",
    "6. Technical Architecture",
    "7. Grading (Instructor)",
    "8. Testing & Demonstration",
    "9. Screenshots Gallery",
    "10. Week 6–7 Revision Questions",
    "11. References",
  ];
  const rows = items.map((item, i) => `
    <tr style="background:${i % 2 === 0 ? CREAM : "#fff"};">
      <td style="padding:8pt 12pt;font-family:Calibri;font-size:11pt;border-bottom:1pt solid #EEE;">${esc(item)}</td>
      <td style="padding:8pt 12pt;font-family:Calibri;font-size:11pt;border-bottom:1pt solid #EEE;text-align:right;color:#999;">...</td>
    </tr>`).join("");
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">Table of Contents</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:16pt 0;">${rows}</table>
${pageBreak()}`;
}

function overview() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">1. Project Overview</h2>
<p style="font-family:Calibri;font-size:11pt;line-height:1.5;text-align:justify;">
This logbook documents <b>seven weeks</b> of mobile application development coursework.
The primary deliverable is <b>Nikah Planner</b> — a Flutter wedding planning application with 13 screens,
Firebase integration, and local storage. Weeks 6–7 extend the portfolio with formal <b>database design</b>
(Task 2) and a <b>Student Attendance</b> SQLite mini-project (Task 3).
</p>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin:16pt 0;font-family:Calibri;font-size:10pt;">
  <tr style="background:${NAVY};color:#fff;"><td><b>Layer</b></td><td><b>Technology</b></td></tr>
  <tr style="background:${CREAM};"><td>Mobile (main)</td><td>Flutter 3.x / Dart</td></tr>
  <tr><td>Navigation</td><td>go_router + bottom tabs</td></tr>
  <tr style="background:${CREAM};"><td>Local storage</td><td>SharedPreferences + SQLite</td></tr>
  <tr><td>Cloud</td><td>Firebase Auth + Firestore</td></tr>
  <tr style="background:${CREAM};"><td>Mini project (W7)</td><td>sqflite relational database</td></tr>
  <tr><td>Version control</td><td>Git / GitHub</td></tr>
</table>
${pageBreak()}
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">2. Weekly Logbook</h2>
<p style="font-family:Calibri;font-size:10pt;color:#666;margin-bottom:16pt;">Detailed activity log for each week of the module.</p>
${WEEKS.map(weekCard).join("\n")}
${pageBreak()}`;
}

function catSection() {
  const rows = [
    ["User Interface Design", "5", "13 screens, gold/sage theme, reusable widgets"],
    ["Navigation", "4", "GoRouter, 5 tabs, sub-page stack"],
    ["Event Handling", "—", "Forms, filters, onTap, setState"],
    ["Local Storage", "5", "SharedPreferences + SQLite"],
    ["Data Retrieval", "4", "Repository pattern, SQL JOINs"],
    ["Networking / API", "5", "Firebase Auth + Firestore"],
    ["Error Handling", "3", "AuthResult, validation messages"],
  ];
  const table = rows.map(([c, m, e], i) => `
    <tr style="background:${i % 2 === 0 ? CREAM : "#fff"};">
      <td style="padding:8pt;border:1pt solid #DDD;font-family:Calibri;font-size:10pt;">${esc(c)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;text-align:center;">${esc(m)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;font-family:Calibri;font-size:10pt;">${esc(e)}</td>
      <td style="padding:8pt;border:1pt solid #DDD;">________</td>
    </tr>`).join("");
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">3. CAT Requirements Coverage</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:16pt 0;">
  <tr style="background:${NAVY};color:#fff;font-family:Calibri;font-size:10pt;">
    <td style="padding:8pt;"><b>Criterion</b></td><td style="padding:8pt;"><b>Max</b></td><td style="padding:8pt;"><b>Evidence</b></td><td style="padding:8pt;"><b>Mark</b></td>
  </tr>${table}
</table>
<h3 style="font-family:Calibri;font-size:12pt;color:${GOLD};margin-top:20pt;">UI Design — Screenshots</h3>
${SCREENSHOTS.slice(0, 5).map((s) => shotBox(s)).join("")}
<h3 style="font-family:Calibri;font-size:12pt;color:${GOLD};">Navigation Evidence</h3>
${shotBox(SCREENSHOTS[3])}
<h3 style="font-family:Calibri;font-size:12pt;color:${GOLD};">Event Handling Evidence</h3>
${shotBox(SCREENSHOTS[5])}${shotBox(SCREENSHOTS[6])}${shotBox(SCREENSHOTS[7])}
<h3 style="font-family:Calibri;font-size:12pt;color:${GOLD};">Error Handling Evidence</h3>
${shotBox(SCREENSHOTS[8])}
${pageBreak()}`;
}

function task2() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">4. Task 2 — Student Database Design</h2>
<p style="font-family:Calibri;font-size:11pt;">Relational database for university student management application.</p>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;font-family:Calibri;font-size:10pt;">
  <tr style="background:${GOLD};color:#fff;"><td colspan="3"><b>Table: students</b> — PK: student_id</td></tr>
  <tr style="background:#EEE;"><td><b>Column</b></td><td><b>Type</b></td><td><b>Constraints</b></td></tr>
  <tr><td>student_id</td><td>VARCHAR(20)</td><td>PRIMARY KEY</td></tr>
  <tr style="background:${CREAM};"><td>full_name</td><td>VARCHAR(100)</td><td>NOT NULL</td></tr>
  <tr><td>year_of_study</td><td>INTEGER</td><td>NOT NULL</td></tr>
  <tr style="background:${CREAM};"><td>phone_number</td><td>VARCHAR(20)</td><td>UNIQUE</td></tr>
  <tr><td>password_hash</td><td>VARCHAR(255)</td><td>NOT NULL (hashed)</td></tr>
</table>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;font-family:Calibri;font-size:10pt;">
  <tr style="background:${SAGE};color:#fff;"><td colspan="3"><b>Table: courses</b> — PK: course_id</td></tr>
  <tr><td>course_id</td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td></tr>
  <tr style="background:${CREAM};"><td>course_code</td><td>VARCHAR(20)</td><td>UNIQUE</td></tr>
  <tr><td>course_name</td><td>VARCHAR(100)</td><td>NOT NULL</td></tr>
</table>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;font-family:Calibri;font-size:10pt;">
  <tr style="background:${NAVY};color:#fff;"><td colspan="3"><b>Table: enrollments</b> — PK: enrollment_id · FK: student_id, course_id</td></tr>
  <tr><td>enrollment_id</td><td>INTEGER</td><td>PRIMARY KEY</td></tr>
  <tr style="background:${CREAM};"><td>student_id</td><td>VARCHAR(20)</td><td>FK → students</td></tr>
  <tr><td>course_id</td><td>INTEGER</td><td>FK → courses</td></tr>
</table>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;font-family:Calibri;font-size:10pt;">
  <tr style="background:#7A6B8A;color:#fff;"><td colspan="3"><b>Table: attendance</b> — PK: attendance_id · FK: enrollment_id</td></tr>
  <tr><td>attendance_id</td><td>INTEGER</td><td>PRIMARY KEY</td></tr>
  <tr style="background:${CREAM};"><td>enrollment_id</td><td>INTEGER</td><td>FK → enrollments</td></tr>
  <tr><td>attendance_date</td><td>DATE</td><td>NOT NULL</td></tr>
  <tr style="background:${CREAM};"><td>status</td><td>VARCHAR(10)</td><td>present / absent / late</td></tr>
</table>
<p style="font-family:Calibri;font-size:10pt;"><b>Normalization:</b> 1NF (atomic values) · 2NF (no partial deps) · 3NF (no transitive deps) · <b>Password:</b> SHA-256 + salt before INSERT</p>
${markBox("Task 2 mark")}
${pageBreak()}`;
}

function task3() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">5. Task 3 — Student Attendance Mini Project</h2>
<table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;">
  <tr><td style="background:${CREAM};padding:12pt;border-left:4pt solid ${GOLD};font-family:Calibri;font-size:10.5pt;">
    <b>Storage:</b> SQLite (sqflite) — offline relational database on device<br/>
    <b>Why:</b> Structured data, SQL JOINs for reports, works without internet, course evidence of DB created<br/>
    <b>Features:</b> Register students · Mark attendance · Generate % reports<br/>
    <b>Security:</b> Passwords hashed (SHA-256 + salt) — never stored as plain text
  </td></tr>
</table>
${shotBoxCustom("Student Attendance — Register", "student_attendance app · Register screen")}
${shotBoxCustom("Student Attendance — Mark Attendance", "Present / Absent / Late per date")}
${shotBoxCustom("Student Attendance — Reports", "Attendance % table with SQL JOIN")}
${markBox("Task 3 mark")}
${pageBreak()}`;
}

function architecture() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">6. Technical Architecture</h2>
<table width="100%" cellpadding="16" cellspacing="0" style="border-collapse:collapse;background:#F8F9FA;border:1pt solid #DDD;font-family:Consolas;font-size:9.5pt;">
  <tr><td>
<pre style="margin:0;font-family:Consolas;font-size:9.5pt;line-height:1.6;">
┌─────────────────────────────────────────┐
│         Nikah Planner (Flutter UI)       │
│  Splash → Auth → Dashboard → Modules     │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┴──────────┐
    ▼                    ▼
SharedPreferences    Firebase Cloud
(local JSON)       (Auth + Firestore)

┌─────────────────────────────────────────┐
│    Student Attendance (Week 7)           │
│  Register → Mark → Reports               │
└─────────────┬───────────────────────────┘
              ▼
         SQLite (.db file)
</pre>
  </td></tr>
</table>
${pageBreak()}`;
}

function grading() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">7. Grading (Instructor)</h2>
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Calibri;font-size:10pt;">
  <tr style="background:${NAVY};color:#fff;"><td><b>Criterion</b></td><td><b>Max</b></td><td><b>Mark</b></td></tr>
  ${["User Interface Design|5", "Navigation|4", "Local Storage|5", "Data Retrieval|4", "Networking / API|5", "Error Handling|3", "Database Design (Task 2)|—", "Mini Project (Task 3)|—", "Weekly Logbook|—"].map((r, i) => {
    const [c, m] = r.split("|");
    return `<tr style="background:${i % 2 === 0 ? CREAM : "#fff"};"><td style="padding:8pt;border:1pt solid #DDD;">${c}</td><td style="padding:8pt;border:1pt solid #DDD;text-align:center;">${m}</td><td style="padding:8pt;border:1pt solid #DDD;">________</td></tr>`;
  }).join("")}
  <tr style="background:${GOLD};color:#fff;font-weight:bold;"><td style="padding:8pt;">TOTAL</td><td style="padding:8pt;text-align:center;">30+</td><td style="padding:8pt;">________</td></tr>
</table>
<p style="margin-top:20pt;font-family:Calibri;font-size:10pt;"><b>Instructor signature:</b> _________________________ &nbsp; <b>Date:</b> _______________</p>
${pageBreak()}`;
}

function testing() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">8. Testing &amp; Demonstration</h2>
<table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin:10pt 0;">
  <tr><td style="background:${NAVY};color:#fff;font-family:Calibri;font-size:11pt;padding:10pt;"><b>Nikah Planner</b></td></tr>
  <tr><td style="font-family:Consolas;font-size:9.5pt;padding:10pt;background:${CREAM};">cd nikah_planner → flutter pub get → flutter run<br/>Demo: any email + password → Dashboard → Budget → Guests</td></tr>
  <tr><td style="background:${SAGE};color:#fff;font-family:Calibri;font-size:11pt;padding:10pt;"><b>Student Attendance</b></td></tr>
  <tr><td style="font-family:Consolas;font-size:9.5pt;padding:10pt;background:${CREAM};">cd student_attendance → flutter pub get → flutter run<br/>Demo: Register → Mark attendance → View report</td></tr>
</table>
${pageBreak()}`;
}

function screenshots() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">9. Screenshots Gallery</h2>
<p style="font-family:Calibri;font-size:10pt;color:#666;">Insert screenshots: <b>Insert → Pictures → This Device</b></p>
${SCREENSHOTS.map((s) => shotBox(s)).join("")}
<h3 style="font-family:Calibri;font-size:12pt;color:${NAVY};margin-top:20pt;">Week 7 — Attendance App</h3>
${shotBoxCustom("Register Student", "student_attendance/", NAVY)}
${shotBoxCustom("Mark Attendance", "student_attendance/", NAVY)}
${shotBoxCustom("Attendance Reports", "student_attendance/", NAVY)}
${pageBreak()}`;
}

function revision() {
  const qa = [
    ["What is mobile application networking?", "Communication between mobile app (client) and remote servers via HTTP/APIs (e.g. Firebase)."],
    ["Explain client-server architecture.", "Client sends requests; server processes and returns responses. App never accesses DB directly."],
    ["Define API.", "Application Programming Interface — rules for programs to communicate."],
    ["What is JSON?", "JavaScript Object Notation — text format: { \"key\": \"value\" }."],
    ["Differentiate GET and POST.", "GET reads data (URL params); POST sends/creates data (body)."],
    ["Define SQLite.", "Embedded relational DB on device; tables + SQL; used in attendance app."],
    ["What is Firebase?", "Google BaaS — Auth, Firestore, Storage via mobile SDK."],
    ["Explain CRUD.", "Create, Read, Update, Delete — all in attendance app."],
    ["Compare local vs cloud storage.", "Local: on-device, offline. Cloud: internet, sync across devices."],
    ["Importance of databases in mobile apps?", "Persistent structured storage, queries, integrity, security, scalability."],
  ];
  const rows = qa.map(([q, a], i) => `
    <tr><td colspan="2" style="background:${i % 2 === 0 ? CREAM : "#fff"};padding:10pt 12pt;border-bottom:1pt solid #EEE;">
      <p style="margin:0 0 4pt;font-family:Calibri;font-size:10.5pt;font-weight:bold;color:${NAVY};">${i + 1}. ${esc(q)}</p>
      <p style="margin:0;font-family:Calibri;font-size:10pt;color:#444;">${esc(a)}</p>
    </td></tr>`).join("");
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">10. Week 6–7 Revision Questions</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
${pageBreak()}`;
}

function references() {
  return `
<h2 style="font-family:Georgia;font-size:18pt;color:${NAVY};border-bottom:2pt solid ${GOLD};padding-bottom:6pt;">11. References</h2>
<ol style="font-family:Calibri;font-size:10.5pt;line-height:2;">
  <li>Flutter Documentation — https://docs.flutter.dev</li>
  <li>Firebase Documentation — https://firebase.google.com/docs</li>
  <li>SQLite Documentation — https://www.sqlite.org/docs.html</li>
  <li>sqflite package — https://pub.dev/packages/sqflite</li>
  <li>Android Developer — https://developer.android.com</li>
  <li>Project repository — https://github.com/moinaalia/nikah-planner</li>
</ol>
<p style="margin-top:40pt;text-align:center;font-family:Georgia;font-size:10pt;color:#999;font-style:italic;">
  — End of Logbook — Weeks 1 to 7 —<br/>Hadidja Aliani · BIT/2023/62116
</p>`;
}

const body = [
  cover(),
  toc(),
  overview(),
  catSection(),
  task2(),
  task3(),
  architecture(),
  grading(),
  testing(),
  screenshots(),
  revision(),
  references(),
].join("\n");

const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>Logbook Weeks 1-7 — Hadidja Aliani</title>
  <!--[if gte mso 9]>
  <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
  <![endif]-->
  <style>
    @page { size: A4; margin: 2cm 2.2cm; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1A2B3C; margin: 0; padding: 0; }
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
try {
  fs.copyFileSync(outPath, desktopDoc);
} catch {
  // ignore
}

console.log("Premium logbook generated!");
console.log(`  ${outPath}`);
console.log(`  ${desktopDoc}`);
