import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logbookPath = path.join(root, "LOGBOOK.md");
const imagesDir = path.join(root, "logbook", "images");
const sourceDir = path.join(root, "screenshots");

const SCREENSHOTS = [
  { num: 1, title: "Splash screen", file: "01_splash.png", alt: "Splash screen" },
  { num: 2, title: "Login screen", file: "02_login.png", alt: "Login screen" },
  { num: 3, title: "Register screen", file: "03_register.png", alt: "Register screen" },
  { num: 4, title: "Dashboard (Home)", file: "04_dashboard.png", alt: "Dashboard home screen" },
  { num: 5, title: "Budget / Reports", file: "05_budget.png", alt: "Budget and reports screen" },
  { num: 6, title: "Guest list and filters", file: "06_guests.png", alt: "Guest list with filters" },
  { num: 7, title: "Schedule", file: "07_schedule.png", alt: "Wedding schedule screen" },
  { num: 8, title: "Settings and profile", file: "08_settings.png", alt: "Settings and profile screen" },
  { num: 9, title: "Login error message", file: "09_error.png", alt: "Login error message" },
];

fs.mkdirSync(imagesDir, { recursive: true });
for (const s of SCREENSHOTS) {
  fs.copyFileSync(path.join(sourceDir, s.file), path.join(imagesDir, s.file));
}

function img(file, alt, width = 280) {
  const full = path.join(imagesDir, file);
  const b64 = fs.readFileSync(full).toString("base64");
  return `<p align="center"><img src="data:image/png;base64,${b64}" alt="${alt}" width="${width}"/></p>`;
}

function section(num, title, file, alt) {
  return `### 11.${num} ${title}\n\n${img(file, alt)}\n`;
}

const gallery = [
  "## 11. Required screenshots",
  "",
  "All screenshots are **embedded directly in this logbook** (base64 images below).",
  "",
  ...SCREENSHOTS.flatMap((s) => [
    `### 11.${s.num} ${s.title}`,
    "",
    img(s.file, s.alt),
    "",
  ]),
  "**Screenshot summary:**",
  "",
  "| # | Screen | File |",
  "|---|--------|------|",
  ...SCREENSHOTS.map((s) => `| ${s.num} | ${s.title} | \`${s.file}\` |`),
  "",
  "**How to capture:** Android emulator camera button, or `flutter run` on a phone, then screenshot.",
].join("\n");

let md = fs.readFileSync(logbookPath, "utf8");
md = md.replace(/## 11\. Required screenshots[\s\S]*?(?=---\n\n## 12\.)/, `${gallery}\n\n---\n\n`);

const inline = {
  ui: `<p align="center">${SCREENSHOTS.slice(0, 5).map((s) => {
    const b64 = fs.readFileSync(path.join(imagesDir, s.file)).toString("base64");
    return `<img src="data:image/png;base64,${b64}" alt="${s.alt}" width="180"/>`;
  }).join(" ")}</p>`,
  nav: img("04_dashboard.png", "Dashboard navigation", 300),
  events: `<p align="center">${["06_guests.png", "07_schedule.png", "08_settings.png"].map((file) => {
    const b64 = fs.readFileSync(path.join(imagesDir, file)).toString("base64");
    return `<img src="data:image/png;base64,${b64}" alt="${file}" width="220"/>`;
  }).join(" ")}</p>`,
  error: img("09_error.png", "Login error message", 280),
};

if (!md.includes("**Screenshots (UI design):**")) {
  md = md.replace(
    "**Key files:** `lib/core/theme/`, `lib/core/widgets/wedding_widgets.dart`\n\n**Instructor mark:**",
    `**Key files:** \`lib/core/theme/\`, \`lib/core/widgets/wedding_widgets.dart\`\n\n**Screenshots (UI design):**\n\n${inline.ui}\n\n**Instructor mark:**`,
  );
}
if (!md.includes("**Screenshot (navigation / dashboard):**")) {
  md = md.replace(
    "/schedule, /vendors, /profile, /settings, /notifications\n```\n\n**Instructor mark:** ____________ / 4",
    `/schedule, /vendors, /profile, /settings, /notifications\n\`\`\`\n\n**Screenshot (navigation / dashboard):**\n\n${inline.nav}\n\n**Instructor mark:** ____________ / 4`,
  );
}
if (!md.includes("**Screenshots (event handling):**")) {
  md = md.replace(
    "**Files:** `login_screen.dart`, `register_screen.dart`, `guest_list_screen.dart`, `schedule_screen.dart`\n\n**Instructor mark:**",
    `**Files:** \`login_screen.dart\`, \`register_screen.dart\`, \`guest_list_screen.dart\`, \`schedule_screen.dart\`\n\n**Screenshots (event handling):**\n\n${inline.events}\n\n**Instructor mark:**`,
  );
}
if (!md.includes("**Screenshot (error handling):**")) {
  md = md.replace(
    "**File:** `lib/services/auth_service.dart` → `AuthResult` class\n\n**Instructor mark:** ____________ / 3",
    `**File:** \`lib/services/auth_service.dart\` → \`AuthResult\` class\n\n**Screenshot (error handling):**\n\n${inline.error}\n\n**Instructor mark:** ____________ / 3`,
  );
}

md = md.replace(
  "├── screenshots/       ← UI screenshots\n├── src/",
  "├── logbook/images/    ← Screenshots embedded in LOGBOOK.md\n├── src/",
);
md = md.replace(
  "└── screenshots/       ← UI screenshots (embedded in LOGBOOK.md)",
  "└── logbook/images/    ← Source PNG files (embedded in LOGBOOK.md)",
);

fs.writeFileSync(logbookPath, md, "utf8");
fs.copyFileSync(logbookPath, path.join(root, "JOURNAL_DE_BORD.md"));

const sizeMb = (fs.statSync(logbookPath).size / (1024 * 1024)).toFixed(2);
console.log(`Updated LOGBOOK.md (${sizeMb} MB) with ${SCREENSHOTS.length} embedded screenshots.`);
