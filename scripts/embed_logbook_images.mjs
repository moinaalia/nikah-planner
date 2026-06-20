import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

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

const IMG_PREFIX = "logbook/images";

fs.mkdirSync(imagesDir, { recursive: true });
for (const s of SCREENSHOTS) {
  fs.copyFileSync(path.join(sourceDir, s.file), path.join(imagesDir, s.file));
}

function img(file, alt, width = 280) {
  const src = `${IMG_PREFIX}/${file}`;
  return [
    `<p align="center">`,
    `<img src="${src}" alt="${alt}" width="${width}"/>`,
    `</p>`,
    ``,
    `![${alt}](${src})`,
    ``,
  ].join("\n");
}

const gallery = [
  "## 11. Required screenshots",
  "",
  "All screenshots are included **directly in this logbook** (images below).",
  "They are stored in [`logbook/images/`](logbook/images/) and rendered inline here.",
  "",
  ...SCREENSHOTS.flatMap((s) => [
    `### 11.${s.num} ${s.title}`,
    "",
    img(s.file, s.alt),
  ]),
  "**Screenshot summary:**",
  "",
  "| # | Screen | Preview |",
  "|---|--------|---------|",
  ...SCREENSHOTS.map(
    (s) => `| ${s.num} | ${s.title} | ![${s.title}](${IMG_PREFIX}/${s.file}) |`,
  ),
  "",
  "**How to capture:** Android emulator camera button, or `flutter run` on a phone, then screenshot.",
].join("\n");

// Restore readable logbook without broken base64 blobs.
let md = execSync("git show f341a21:LOGBOOK.md", { cwd: root, encoding: "utf8" });

md = md.replace(/## 11\. Required screenshots[\s\S]*?(?=---\n\n## 12\.)/, `${gallery}\n\n---\n\n`);

const inline = {
  ui: `<p align="center">${SCREENSHOTS.slice(0, 5)
    .map((s) => `<img src="${IMG_PREFIX}/${s.file}" alt="${s.alt}" width="180"/>`)
    .join("\n")}</p>`,
  nav: img("04_dashboard.png", "Dashboard navigation", 300),
  events: `<p align="center">${["06_guests.png", "07_schedule.png", "08_settings.png"]
    .map((file) => `<img src="${IMG_PREFIX}/${file}" alt="${file}" width="220"/>`)
    .join("\n")}</p>`,
  error: img("09_error.png", "Login error message", 280),
};

md = md.replace(
  "**Key files:** `lib/core/theme/`, `lib/core/widgets/wedding_widgets.dart`\n\n**Instructor mark:**",
  `**Key files:** \`lib/core/theme/\`, \`lib/core/widgets/wedding_widgets.dart\`\n\n**Screenshots (UI design):**\n\n${inline.ui}\n\n**Instructor mark:**`,
);
md = md.replace(
  "/schedule, /vendors, /profile, /settings, /notifications\n```\n\n**Instructor mark:** ____________ / 4",
  `/schedule, /vendors, /profile, /settings, /notifications\n\`\`\`\n\n**Screenshot (navigation / dashboard):**\n\n${inline.nav}\n\n**Instructor mark:** ____________ / 4`,
);
md = md.replace(
  "**Files:** `login_screen.dart`, `register_screen.dart`, `guest_list_screen.dart`, `schedule_screen.dart`\n\n**Instructor mark:**",
  `**Files:** \`login_screen.dart\`, \`register_screen.dart\`, \`guest_list_screen.dart\`, \`schedule_screen.dart\`\n\n**Screenshots (event handling):**\n\n${inline.events}\n\n**Instructor mark:**`,
);
md = md.replace(
  "**File:** `lib/services/auth_service.dart` → `AuthResult` class\n\n**Instructor mark:** ____________ / 3",
  `**File:** \`lib/services/auth_service.dart\` → \`AuthResult\` class\n\n**Screenshot (error handling):**\n\n${inline.error}\n\n**Instructor mark:** ____________ / 3`,
);

md = md.replace(
  "├── screenshots/       ← UI screenshots\n├── src/",
  "├── logbook/images/    ← Screenshots shown in LOGBOOK.md\n├── src/",
);
md = md.replace(
  "└── screenshots/       ← UI screenshots (embedded in LOGBOOK.md)",
  "└── logbook/images/    ← Screenshot PNG files",
);

fs.writeFileSync(logbookPath, md, "utf8");
try {
  fs.copyFileSync(logbookPath, path.join(root, "JOURNAL_DE_BORD.md"));
} catch {
  // local journal may be gitignored
}

const sizeKb = (fs.statSync(logbookPath).size / 1024).toFixed(1);
console.log(`Updated LOGBOOK.md (${sizeKb} KB) with ${SCREENSHOTS.length} GitHub-visible screenshots.`);
