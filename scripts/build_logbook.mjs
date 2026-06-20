import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "logbook", "images");
const sourceDir = path.join(root, "screenshots");
const mdOut = path.join(root, "LOGBOOK.md");
const docOut = path.join(root, "LOGBOOK.doc");

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

function row(files, width) {
  return `<p align="center">${files
    .map((file) => {
      const s = SCREENSHOTS.find((x) => x.file === file);
      const alt = s?.alt ?? file;
      return `<img src="logbook/images/${file}" alt="${alt}" width="${width}"/>`;
    })
    .join("\n")}</p>\n`;
}

function githubImg(file, alt, width = 280) {
  return `<p align="center"><img src="logbook/images/${file}" alt="${alt}" width="${width}"/></p>\n`;
}

function section11() {
  return [
    "## 11. Required screenshots",
    "",
    "Screenshots required by the CAT instructions:",
    "",
    ...SCREENSHOTS.flatMap((s) => [
      `### 11.${s.num} ${s.title}`,
      "",
      githubImg(s.file, s.alt),
    ]),
    "**How to capture:** Android emulator, or `flutter run` on a phone, then screenshot.",
  ].join("\n");
}

function injectScreenshots(md) {
  let out = md;

  out = out.replace(
    "**Key files:** `lib/core/theme/`, `lib/core/widgets/wedding_widgets.dart`\n\n**Instructor mark:**",
    `**Key files:** \`lib/core/theme/\`, \`lib/core/widgets/wedding_widgets.dart\`\n\n**Screenshots:**\n\n${row(["01_splash.png", "02_login.png", "03_register.png", "04_dashboard.png", "05_budget.png"], 160)}\n**Instructor mark:**`,
  );

  out = out.replace(
    "/schedule, /vendors, /profile, /settings, /notifications\n```\n\n**Instructor mark:** ____________ / 4",
    `/schedule, /vendors, /profile, /settings, /notifications\n\`\`\`\n\n**Screenshot:**\n\n${githubImg("04_dashboard.png", "Dashboard navigation", 300)}\n**Instructor mark:** ____________ / 4`,
  );

  out = out.replace(
    "**Files:** `login_screen.dart`, `register_screen.dart`, `guest_list_screen.dart`, `schedule_screen.dart`\n\n**Instructor mark:**",
    `**Files:** \`login_screen.dart\`, \`register_screen.dart\`, \`guest_list_screen.dart\`, \`schedule_screen.dart\`\n\n**Screenshots:**\n\n${row(["06_guests.png", "07_schedule.png", "08_settings.png"], 200)}\n**Instructor mark:**`,
  );

  out = out.replace(
    "**File:** `lib/services/auth_service.dart` → `AuthResult` class\n\n**Instructor mark:** ____________ / 3",
    `**File:** \`lib/services/auth_service.dart\` → \`AuthResult\` class\n\n**Screenshot:**\n\n${githubImg("09_error.png", "Login error message", 280)}\n**Instructor mark:** ____________ / 3`,
  );

  out = out.replace(
    /## 11\. Required screenshots[\s\S]*?(?=---\n\n## 12\. Revision)/,
    `${section11()}\n\n`,
  );

  out = out.replace(
    "| Technical report / logbook | [LOGBOOK.md](LOGBOOK.md) (this document on GitHub) |",
    "| Complete report (Word) | [LOGBOOK.doc](LOGBOOK.doc) — full text + embedded screenshots |",
  );

  out = out.replace(
    "├── screenshots/       ← UI screenshots\n├── src/",
    "├── LOGBOOK.doc        ← Complete CAT report (Word)\n├── src/",
  );
  out = out.replace(
    "└── JOURNAL_DE_BORD.doc / .pdf (submit to instructor separately)",
    "└── LOGBOOK.md         ← Same report (Markdown preview on GitHub)",
  );

  return out;
}

const baseMd = execSync("git show f341a21:LOGBOOK.md", { cwd: root, encoding: "utf8" });
let githubMd = injectScreenshots(baseMd);
githubMd = githubMd.replace(
  "**Submission date:** June 2026  ",
  "**Submission date:** June 2026\n\n> **Complete document (recommended):** Download **[LOGBOOK.doc](LOGBOOK.doc)** — full English report with all screenshots embedded.\n",
);
fs.writeFileSync(mdOut, githubMd, "utf8");

try {
  fs.copyFileSync(mdOut, path.join(root, "JOURNAL_DE_BORD.md"));
} catch {
  // ignore
}

console.log(`LOGBOOK.md  → ${(fs.statSync(mdOut).size / 1024).toFixed(1)} KB (GitHub markdown)`);

// Complete Word document (full text + embedded screenshots)
execSync("node scripts/generate_logbook_word_natural.mjs", { cwd: root, stdio: "inherit" });
console.log(`LOGBOOK.doc → ${(fs.statSync(docOut).size / (1024 * 1024)).toFixed(2)} MB (complete Word report)`);
