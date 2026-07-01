import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = path.join(root, "screenshots");
const desktopShots = path.join(process.env.USERPROFILE || "", "Desktop", "Nikah_Screenshots");
const outPath = path.join(root, "LOGBOOK_PORTFOLIO.doc");
const desktopDoc = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK_PORTFOLIO.doc");

const TEAL = "#0F4C5C";
const ROSE = "#D4A5A5";
const IVORY = "#FFFDF8";
const INK = "#2C2C2C";
const MINT = "#A8DADC";

const SCREENSHOTS = [
  { num: 1, title: "Splash Screen", file: "01_splash.png" },
  { num: 2, title: "Login", file: "02_login.png" },
  { num: 3, title: "Register", file: "03_register.png" },
  { num: 4, title: "Dashboard", file: "04_dashboard.png" },
  { num: 5, title: "Budget", file: "05_budget.png" },
  { num: 6, title: "Guests", file: "06_guests.png" },
  { num: 7, title: "Schedule", file: "07_schedule.png" },
  { num: 8, title: "Settings", file: "08_settings.png" },
  { num: 9, title: "Error State", file: "09_error.png" },
];

const WEEKS = [
  { n: 1, title: "Requirements & UI Design", focus: "Scope · React prototype · User flows", work: ["Wedding app scope (budget, guests, schedule)", "React UI prototype with gold/sage theme", "Screen flow: Splash → Auth → Dashboard", "CAT rubric mapping"], files: "src/ · README" },
  { n: 2, title: "Flutter Setup & Theme", focus: "SDK · Material · Reusable widgets", work: ["Flutter project nikah_planner/", "Theme: app_colors.dart, app_theme.dart", "Animated splash screen", "WeddingCard, PrimaryButton widgets"], files: "lib/core/theme/ · lib/features/splash/" },
  { n: 3, title: "Auth & Navigation", focus: "Forms · go_router · Shell", work: ["Login & register screens", "GoRouter named routes", "Auth flow and redirect guards", "Bottom navigation (5 tabs)"], files: "lib/features/auth/ · lib/router/" },
  { n: 4, title: "Core Screens", focus: "Lists · Charts · Filters", work: ["Dashboard with countdown", "Budget pie chart (fl_chart)", "Guest list RSVP filters", "Schedule timeline · Settings"], files: "lib/features/home/ · budget/ · guests/" },
  { n: 5, title: "Local Storage", focus: "SharedPreferences · JSON", work: ["mock_data.dart demo profiles", "local_wedding_store.dart persistence", "WeddingRepository load/save", "RAM vs disk storage comparison"], files: "local_wedding_store.dart · wedding_repository.dart" },
  { n: 6, title: "Firebase & DB Design", focus: "Auth · Firestore · Task 2", work: ["Firebase Auth integration", "Cloud Firestore collections", "Offline/demo fallback mode", "Task 2: 4-table relational schema"], files: "auth_service.dart · firestore_service.dart" },
  { n: 7, title: "SQLite Mini Project", focus: "sqflite · CRUD · Task 3", work: ["student_attendance/ Flutter app", "Register students · mark attendance", "SQL JOIN attendance reports", "SHA-256 password hashing"], files: "student_attendance/lib/database/" },
];

function esc(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pb() {
  return '<br clear="all" style="page-break-before:always"/>';
}

function cover() {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
  <tr>
    <td width="38%" style="background:${TEAL};padding:50pt 24pt;vertical-align:middle;">
      <p style="font-family:Georgia;font-size:9pt;color:${MINT};letter-spacing:3pt;margin:0 0 30pt;">PORTFOLIO</p>
      <p style="font-family:Georgia;font-size:22pt;color:#fff;margin:0 0 24pt;line-height:1.3;">Mobile App<br/>Development<br/>Logbook</p>
      <p style="font-family:Calibri;font-size:10pt;color:#B8D4DC;margin:0 0 6pt;">Weeks 1 — 7</p>
      <p style="font-family:Calibri;font-size:10pt;color:#B8D4DC;margin:0;">June 2026</p>
    </td>
    <td style="background:${IVORY};padding:50pt 36pt;vertical-align:middle;border-left:6pt solid ${ROSE};">
      <p style="font-family:Calibri;font-size:10pt;color:#888;letter-spacing:2pt;margin:0 0 20pt;">STUDENT SUBMISSION</p>
      <p style="font-family:Georgia;font-size:26pt;color:${INK};margin:0 0 8pt;">Hadidja Aliani</p>
      <p style="font-family:Calibri;font-size:12pt;color:${TEAL};margin:0 0 28pt;">BIT/2023/62116</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr><td style="padding:10pt 0;border-top:1pt solid #E8E0D8;font-family:Calibri;font-size:11pt;"><b>Main project</b><br/>Nikah Planner (Flutter)</td></tr>
        <tr><td style="padding:10pt 0;border-top:1pt solid #E8E0D8;font-family:Calibri;font-size:11pt;"><b>Mini project</b><br/>Student Attendance (SQLite)</td></tr>
        <tr><td style="padding:10pt 0;border-top:1pt solid #E8E0D8;font-family:Calibri;font-size:11pt;"><b>Repository</b><br/>github.com/moinaalia/nikah-planner</td></tr>
      </table>
    </td>
  </tr>
</table>
${pb()}`;
}

function executiveSummary() {
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;margin:0 0 4pt;">OVERVIEW</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 16pt;border-bottom:3pt solid ${ROSE};padding-bottom:8pt;display:inline-block;">Executive Summary</h1>
<p style="font-family:Calibri;font-size:11pt;line-height:1.6;text-align:justify;color:${INK};">
This portfolio documents seven weeks of coursework in <b>Mobile Application Development</b>.
The primary deliverable is <b>Nikah Planner</b> — a culturally appropriate wedding planning app built with Flutter,
featuring authentication, multi-screen navigation, local persistence, and Firebase cloud integration.
Weeks 6–7 extend the work with formal relational database design (Task 2) and a standalone
<b>Student Attendance</b> application using SQLite (Task 3).
</p>
<table width="100%" cellpadding="0" cellspacing="8" style="margin:20pt 0;">
  <tr>
    <td width="33%" style="background:${TEAL};padding:16pt;text-align:center;">
      <p style="font-family:Georgia;font-size:28pt;color:#fff;margin:0;">13</p>
      <p style="font-family:Calibri;font-size:9pt;color:${MINT};margin:4pt 0 0;">Screens built</p>
    </td>
    <td width="33%" style="background:${ROSE};padding:16pt;text-align:center;">
      <p style="font-family:Georgia;font-size:28pt;color:#fff;margin:0;">7</p>
      <p style="font-family:Calibri;font-size:9pt;color:#fff;margin:4pt 0 0;">Weeks logged</p>
    </td>
    <td width="33%" style="background:${MINT};padding:16pt;text-align:center;">
      <p style="font-family:Georgia;font-size:28pt;color:${TEAL};margin:0;">2</p>
      <p style="font-family:Calibri;font-size:9pt;color:${TEAL};margin:4pt 0 0;">Projects delivered</p>
    </td>
  </tr>
</table>
<table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;border:1pt solid #DDD;">
  <tr style="background:#F5F5F5;"><td colspan="2" style="font-family:Calibri;font-size:10pt;font-weight:bold;padding:8pt;">Technology Stack</td></tr>
  <tr><td width="35%" style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Frontend</td><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Flutter 3.x · Dart · Material Design</td></tr>
  <tr><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Navigation</td><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">go_router · bottom tabs · stack routes</td></tr>
  <tr><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Local data</td><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">SharedPreferences · SQLite (sqflite)</td></tr>
  <tr><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Cloud</td><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Firebase Auth · Cloud Firestore</td></tr>
  <tr><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Version control</td><td style="padding:8pt;border-top:1pt solid #EEE;font-family:Calibri;font-size:10pt;">Git · GitHub (moinaalia/nikah-planner)</td></tr>
</table>
${pb()}`;
}

function timeline() {
  const cells = WEEKS.map((w) => `
    <td style="text-align:center;padding:4pt;">
      <div style="width:28pt;height:28pt;border-radius:50%;background:${TEAL};color:#fff;font-family:Calibri;font-size:10pt;line-height:28pt;margin:0 auto;">${w.n}</div>
      <p style="font-family:Calibri;font-size:7pt;color:#666;margin:4pt 0 0;">W${w.n}</p>
    </td>`).join("");
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">TIMELINE</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 20pt;">7-Week Progress Map</h1>
<table width="100%" cellpadding="0" cellspacing="0"><tr>${cells}</tr></table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:4pt 0 24pt;"><tr><td style="height:3pt;background:linear-gradient(90deg,${TEAL},${ROSE},${MINT});"></td></tr></table>
${pb()}`;
}

function weekPage(w) {
  const items = w.work.map((x) => `<li style="margin:5pt 0;font-family:Calibri;font-size:10.5pt;color:${INK};">${esc(x)}</li>`).join("");
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16pt;">
  <tr>
    <td width="48" style="background:${TEAL};text-align:center;vertical-align:top;padding:14pt 0;">
      <span style="font-family:Georgia;font-size:20pt;color:#fff;">${w.n}</span>
    </td>
    <td style="padding:12pt 16pt;background:#F9F7F4;border-bottom:2pt solid ${ROSE};">
      <p style="margin:0;font-family:Georgia;font-size:15pt;color:${INK};">Week ${w.n} — ${esc(w.title)}</p>
      <p style="margin:4pt 0 0;font-family:Calibri;font-size:9pt;color:#888;">${esc(w.focus)}</p>
    </td>
  </tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="58%" style="vertical-align:top;padding-right:14pt;">
      <p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:1pt;margin:0 0 8pt;">WORK COMPLETED</p>
      <ul style="margin:0;padding-left:16pt;">${items}</ul>
    </td>
    <td width="42%" style="vertical-align:top;padding:12pt;background:${IVORY};border:1pt solid #E8E0D8;">
      <p style="font-family:Calibri;font-size:9pt;color:${TEAL};margin:0 0 6pt;">KEY FILES</p>
      <p style="font-family:Consolas;font-size:9pt;color:#555;margin:0 0 12pt;">${esc(w.files)}</p>
      <p style="font-family:Calibri;font-size:9pt;color:${TEAL};margin:0 0 4pt;">DATE</p>
      <p style="font-family:Calibri;font-size:10pt;margin:0 0 12pt;">___________________</p>
      <p style="font-family:Calibri;font-size:9pt;color:${TEAL};margin:0 0 4pt;">INSTRUCTOR MARK</p>
      <p style="font-family:Calibri;font-size:10pt;margin:0;">________ / ____</p>
    </td>
  </tr>
</table>
<p style="font-family:Calibri;font-size:9pt;color:#999;margin:14pt 0 0;">Comments: _______________________________________________________________</p>
${w.n < 7 ? pb() : ""}`;
}

function shotFrame(s, half = false) {
  const exists = fs.existsSync(path.join(shotsDir, s.file));
  const w = half ? "48%" : "100%";
  return `
<td width="${w}" style="vertical-align:top;padding:6pt;">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr><td style="background:${TEAL};padding:6pt 10pt;">
      <span style="color:#fff;font-family:Calibri;font-size:9pt;">${s.num}. ${esc(s.title)}</span>
    </td></tr>
    <tr><td style="border:1.5pt dashed ${ROSE};background:${IVORY};padding:20pt;text-align:center;height:200px;vertical-align:middle;">
      <p style="font-family:Calibri;font-size:11pt;color:${INK};margin:0;"><b>Insert image</b></p>
      <p style="font-family:Consolas;font-size:8pt;color:#AAA;margin:6pt 0 0;">${esc(s.file)}</p>
      ${exists ? '<p style="font-size:8pt;color:#6A9;">✓ available</p>' : ""}
    </td></tr>
  </table>
</td>`;
}

function shotGrid() {
  const rows = [];
  for (let i = 0; i < SCREENSHOTS.length; i += 2) {
    const a = SCREENSHOTS[i];
    const b = SCREENSHOTS[i + 1];
    rows.push(`<tr>${shotFrame(a, true)}${b ? shotFrame(b, true) : "<td></td>"}</tr>`);
  }
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">EVIDENCE</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 6pt;">Screenshot Gallery</h1>
<p style="font-family:Calibri;font-size:10pt;color:#888;margin:0 0 16pt;">Insert → Pictures → This Device</p>
<table width="100%" cellpadding="0" cellspacing="0">${rows.join("")}</table>
${pb()}`;
}

function customShot(title, sub) {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin:10pt 0;">
  <tr><td style="background:${ROSE};padding:6pt 10pt;"><span style="color:#fff;font-family:Calibri;font-size:9pt;">${esc(title)}</span></td></tr>
  <tr><td style="border:1.5pt dashed ${TEAL};background:#F0F8F8;padding:24pt;text-align:center;height:220px;">
    <p style="font-family:Calibri;font-size:11pt;margin:0;"><b>Insert screenshot</b></p>
    <p style="font-family:Calibri;font-size:9pt;color:#888;margin:6pt 0 0;">${esc(sub)}</p>
  </td></tr>
</table>`;
}

function task2() {
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">TASK 2</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 16pt;">Database Design</h1>
<p style="font-family:Calibri;font-size:11pt;line-height:1.5;">Relational schema for a university student management system. Third normal form (3NF). Passwords stored as SHA-256 hashes.</p>
<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;margin:12pt 0;font-family:Calibri;font-size:9.5pt;">
  <tr style="background:${TEAL};color:#fff;"><td><b>students</b></td><td>student_id PK</td><td>full_name, year_of_study, phone, password_hash</td></tr>
  <tr style="background:${IVORY};"><td><b>courses</b></td><td>course_id PK</td><td>course_code UNIQUE, course_name</td></tr>
  <tr><td><b>enrollments</b></td><td>enrollment_id PK</td><td>student_id FK, course_id FK</td></tr>
  <tr style="background:${IVORY};"><td><b>attendance</b></td><td>attendance_id PK</td><td>enrollment_id FK, date, status</td></tr>
</table>
<p style="font-family:Calibri;font-size:10pt;"><b>Relationships:</b> students 1→N enrollments N→1 courses · enrollments 1→N attendance</p>
<p style="margin-top:14pt;font-family:Calibri;font-size:10pt;"><b>Task 2 mark:</b> __________ &nbsp; <b>Comments:</b> _________________________</p>
${pb()}`;
}

function task3() {
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">TASK 3</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 16pt;">Student Attendance App</h1>
<table width="100%" cellpadding="12" cellspacing="0" style="border-left:4pt solid ${TEAL};background:#F5FAFA;margin-bottom:16pt;">
  <tr><td style="font-family:Calibri;font-size:10.5pt;line-height:1.6;">
    <b>Stack:</b> Flutter + sqflite + crypto<br/>
    <b>Features:</b> Register students · Mark present/absent/late · Attendance % reports (SQL JOIN)<br/>
    <b>Security:</b> Password hashing before SQLite INSERT
  </td></tr>
</table>
${customShot("Register Student", "student_attendance app")}
${customShot("Mark Attendance", "Date picker + status buttons")}
${customShot("Attendance Report", "Percentage table per student/course")}
<p style="font-family:Calibri;font-size:10pt;"><b>Task 3 mark:</b> __________ &nbsp; <b>Comments:</b> _________________________</p>
${pb()}`;
}

function catRubric() {
  const rows = [
    ["User Interface Design", "5", "13 themed screens"],
    ["Navigation", "4", "GoRouter + 5 tabs"],
    ["Event Handling", "—", "Forms, filters, gestures"],
    ["Local Storage", "5", "SharedPreferences + SQLite"],
    ["Data Retrieval", "4", "Repository + SQL JOINs"],
    ["Networking / API", "5", "Firebase Auth + Firestore"],
    ["Error Handling", "3", "AuthResult validation"],
  ];
  const tr = rows.map(([c, m, e], i) => `
    <tr style="background:${i % 2 ? IVORY : "#fff"};">
      <td style="padding:8pt;border:1pt solid #E0E0E0;font-family:Calibri;font-size:10pt;">${c}</td>
      <td style="padding:8pt;border:1pt solid #E0E0E0;text-align:center;">${m}</td>
      <td style="padding:8pt;border:1pt solid #E0E0E0;font-family:Calibri;font-size:10pt;">${e}</td>
      <td style="padding:8pt;border:1pt solid #E0E0E0;">______</td>
    </tr>`).join("");
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">ASSESSMENT</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 16pt;">CAT Rubric</h1>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
  <tr style="background:${TEAL};color:#fff;font-family:Calibri;font-size:10pt;">
    <td style="padding:8pt;"><b>Criterion</b></td><td style="padding:8pt;"><b>Max</b></td><td style="padding:8pt;"><b>Evidence</b></td><td style="padding:8pt;"><b>Mark</b></td>
  </tr>${tr}
  <tr style="background:${ROSE};color:#fff;font-weight:bold;">
    <td style="padding:8pt;">TOTAL</td><td style="padding:8pt;text-align:center;">30+</td><td></td><td style="padding:8pt;">______</td>
  </tr>
</table>
<p style="margin-top:20pt;font-family:Calibri;font-size:10pt;"><b>Instructor signature:</b> _________________________ &nbsp; <b>Date:</b> _______________</p>
${pb()}`;
}

function revision() {
  const qa = [
    ["Mobile networking?", "Client-server communication via HTTP/APIs (Firebase)."],
    ["Client-server architecture?", "Client requests; server processes; app never hits DB directly."],
    ["What is an API?", "Rules for programs to exchange data."],
    ["What is JSON?", "Text format: { \"key\": \"value\" }."],
    ["GET vs POST?", "GET reads; POST sends/creates data."],
    ["SQLite?", "Embedded relational DB on device with SQL."],
    ["Firebase?", "Google BaaS: Auth, Firestore, Storage."],
    ["CRUD?", "Create, Read, Update, Delete operations."],
    ["Local vs cloud storage?", "Local = offline on device; cloud = internet sync."],
    ["Why databases in mobile?", "Persistent structured data, queries, integrity."],
  ];
  const blocks = qa.map(([q, a], i) => `
    <table width="100%" cellpadding="10" cellspacing="0" style="margin:8pt 0;border:1pt solid #E8E0D8;">
      <tr><td style="background:#F5F5F5;padding:6pt 10pt;font-family:Calibri;font-size:10pt;font-weight:bold;color:${TEAL};">Q${i + 1}. ${esc(q)}</td></tr>
      <tr><td style="padding:8pt 10pt;font-family:Calibri;font-size:10pt;">${esc(a)}</td></tr>
    </table>`).join("");
  return `
<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">REVISION</p>
<h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 16pt;">Week 6–7 Questions</h1>
${blocks}
${pb()}`;
}

function closing() {
  return `
<table width="100%" cellpadding="24" cellspacing="0" style="border:2pt solid ${TEAL};margin-top:20pt;">
  <tr><td style="text-align:center;">
    <p style="font-family:Georgia;font-size:14pt;color:${INK};margin:0 0 12pt;">Declaration</p>
    <p style="font-family:Calibri;font-size:10pt;color:#555;line-height:1.6;margin:0 0 20pt;">
      I confirm that this logbook represents my own work for the Mobile Application Development module,
      Weeks 1 to 7, including Nikah Planner and the Student Attendance mini project.
    </p>
    <p style="font-family:Calibri;font-size:11pt;margin:0;"><b>Hadidja Aliani</b> · BIT/2023/62116</p>
    <p style="font-family:Calibri;font-size:10pt;color:#888;margin:12pt 0 0;">Signature: _________________________ &nbsp; Date: _______________</p>
  </td></tr>
</table>
<p style="text-align:center;font-family:Calibri;font-size:9pt;color:#BBB;margin-top:30pt;">github.com/moinaalia/nikah-planner · June 2026</p>`;
}

const body = [
  cover(),
  executiveSummary(),
  timeline(),
  `<p style="font-family:Calibri;font-size:9pt;color:${TEAL};letter-spacing:2pt;">LOGBOOK</p>
   <h1 style="font-family:Georgia;font-size:22pt;color:${INK};margin:0 0 20pt;">Weekly Activities</h1>`,
  WEEKS.map(weekPage).join(""),
  pb(),
  catRubric(),
  task2(),
  task3(),
  shotGrid(),
  revision(),
  closing(),
].join("\n");

const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<title>Portfolio Logbook — Hadidja Aliani</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>@page{size:A4;margin:2cm;} body{font-family:Calibri,Arial,sans-serif;margin:0;padding:0;color:${INK};}</style>
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

console.log("Portfolio logbook created:");
console.log(`  ${desktopDoc}`);
console.log(`  ${outPath}`);
