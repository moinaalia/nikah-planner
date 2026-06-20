import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "logbook", "images");
const sourceDir = path.join(root, "screenshots");
const mdOut = path.join(root, "LOGBOOK.md");
const docOut = path.join(root, "LOGBOOK.doc");
const desktopDoc = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK.doc");

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

function b64(file) {
  return fs.readFileSync(path.join(imagesDir, file)).toString("base64");
}

function githubImg(file, alt, width = 280) {
  return `<p align="center"><img src="logbook/images/${file}" alt="${alt}" width="${width}"/></p>\n`;
}

function docImg(file, alt, width = 280) {
  return `<p align="center"><img src="data:image/png;base64,${b64(file)}" alt="${alt}" width="${width}"/></p>\n`;
}

function row(files, width, embedFn) {
  return `<p align="center">${files
    .map((file) => {
      const s = SCREENSHOTS.find((x) => x.file === file);
      const alt = s?.alt ?? file;
      const b64data = embedFn === docImg ? b64(file) : null;
      if (b64data) {
        return `<img src="data:image/png;base64,${b64data}" alt="${alt}" width="${width}"/>`;
      }
      return `<img src="logbook/images/${file}" alt="${alt}" width="${width}"/>`;
    })
    .join("\n")}</p>\n`;
}

function section11(embedFn) {
  return [
    "## 11. Required screenshots",
    "",
    "Screenshots required by the CAT instructions:",
    "",
    ...SCREENSHOTS.flatMap((s) => [
      `### 11.${s.num} ${s.title}`,
      "",
      embedFn(s.file, s.alt),
    ]),
    "**How to capture:** Android emulator, or `flutter run` on a phone, then screenshot.",
  ].join("\n");
}

function injectScreenshots(md, embedFn) {
  let out = md;

  out = out.replace(
    "**Key files:** `lib/core/theme/`, `lib/core/widgets/wedding_widgets.dart`\n\n**Instructor mark:**",
    `**Key files:** \`lib/core/theme/\`, \`lib/core/widgets/wedding_widgets.dart\`\n\n**Screenshots:**\n\n${row(["01_splash.png", "02_login.png", "03_register.png", "04_dashboard.png", "05_budget.png"], 160, embedFn)}\n**Instructor mark:**`,
  );

  out = out.replace(
    "/schedule, /vendors, /profile, /settings, /notifications\n```\n\n**Instructor mark:** ____________ / 4",
    `/schedule, /vendors, /profile, /settings, /notifications\n\`\`\`\n\n**Screenshot:**\n\n${embedFn("04_dashboard.png", "Dashboard navigation", 300)}\n**Instructor mark:** ____________ / 4`,
  );

  out = out.replace(
    "**Files:** `login_screen.dart`, `register_screen.dart`, `guest_list_screen.dart`, `schedule_screen.dart`\n\n**Instructor mark:**",
    `**Files:** \`login_screen.dart\`, \`register_screen.dart\`, \`guest_list_screen.dart\`, \`schedule_screen.dart\`\n\n**Screenshots:**\n\n${row(["06_guests.png", "07_schedule.png", "08_settings.png"], 200, embedFn)}\n**Instructor mark:**`,
  );

  out = out.replace(
    "**File:** `lib/services/auth_service.dart` → `AuthResult` class\n\n**Instructor mark:** ____________ / 3",
    `**File:** \`lib/services/auth_service.dart\` → \`AuthResult\` class\n\n**Screenshot:**\n\n${embedFn("09_error.png", "Login error message", 280)}\n**Instructor mark:** ____________ / 3`,
  );

  out = out.replace(
    /## 11\. Required screenshots[\s\S]*?(?=---\n\n## 12\. Revision)/,
    `${section11(embedFn)}\n\n`,
  );

  out = out.replace(
    "├── screenshots/       ← UI screenshots\n├── src/",
    "├── LOGBOOK.md         ← Technical report (English)\n├── src/",
  );
  out = out.replace(
    "└── JOURNAL_DE_BORD.doc / .pdf (submit to instructor separately)",
    "└── LOGBOOK.doc        ← Full report with embedded screenshots",
  );

  return out;
}

const baseMd = execSync("git show f341a21:LOGBOOK.md", { cwd: root, encoding: "utf8" });
const githubMd = injectScreenshots(baseMd, githubImg);
fs.writeFileSync(mdOut, githubMd, "utf8");

const docMd = injectScreenshots(baseMd, docImg);

function esc(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function mdToWordHtml(source) {
  const lines = source.split("\n");
  const out = [];
  let inCode = false;
  let inTable = false;
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      out.push("</ul>");
      listOpen = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      out.push("</table>");
      inTable = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("<p align") || line.startsWith("<img")) {
      closeList();
      closeTable();
      out.push(line);
      continue;
    }

    if (line.startsWith("```")) {
      closeList();
      closeTable();
      if (!inCode) {
        inCode = true;
        out.push('<pre style="background:#F5F0E8;border:1px solid #E0D5C8;padding:10px;font-family:Consolas,monospace;font-size:9pt;">');
      } else {
        inCode = false;
        out.push("</pre>");
      }
      continue;
    }

    if (inCode) {
      out.push(esc(line) + "\n");
      continue;
    }

    if (line.startsWith("|")) {
      closeList();
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) continue;
      if (!inTable) {
        inTable = true;
        out.push('<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:10pt;">');
        out.push("<tr>");
        cells.forEach((c) => out.push(`<th style="background:#F5EDE0;color:#7A5C3A;">${inline(c)}</th>`));
        out.push("</tr>");
      } else {
        out.push("<tr>");
        cells.forEach((c) => out.push(`<td>${inline(c)}</td>`));
        out.push("</tr>");
      }
      continue;
    } else {
      closeTable();
    }

    if (!line) {
      closeList();
      continue;
    }

    if (line === "---") {
      closeList();
      out.push('<hr style="border:none;border-top:1px solid #E0D5C8;margin:18px 0;" />');
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1 style="color:#7A5C3A;font-size:20pt;border-bottom:2px solid #B8956A;padding-bottom:6px;">${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      out.push(`<h2 style="color:#7A5C3A;font-size:14pt;margin-top:20px;">${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      out.push(`<h3 style="color:#5C4A32;font-size:12pt;margin-top:14px;">${inline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- [x] ") || line.startsWith("- [ ] ")) {
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      const checked = line.startsWith("- [x] ");
      out.push(`<li>${checked ? "☑" : "☐"} ${inline(line.slice(6))}</li>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    out.push(`<p style="margin:6px 0;line-height:1.5;">${inline(line)}</p>`);
  }

  closeList();
  closeTable();
  if (inCode) out.push("</pre>");
  return out.join("\n");
}

const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>Logbook — Nikah Planner</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page { size: A4; margin: 2cm; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #2D2417; }
    code { font-family: Consolas, monospace; background: #F5F0E8; padding: 1px 4px; }
    img { max-width: 320px; height: auto; }
  </style>
</head>
<body>
${mdToWordHtml(docMd)}
</body>
</html>`;

fs.writeFileSync(docOut, html, "utf8");
try {
  fs.copyFileSync(docOut, desktopDoc);
  console.log(`Desktop copy: ${desktopDoc}`);
} catch {
  // ignore
}

try {
  fs.copyFileSync(mdOut, path.join(root, "JOURNAL_DE_BORD.md"));
} catch {
  // ignore
}

console.log(`LOGBOOK.md  → ${(fs.statSync(mdOut).size / 1024).toFixed(1)} KB (GitHub)`);
console.log(`LOGBOOK.doc → ${(fs.statSync(docOut).size / (1024 * 1024)).toFixed(2)} MB (Word, screenshots inside)`);
