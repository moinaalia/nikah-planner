import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "logbook", "images");
const sourceDir = path.join(root, "screenshots");
const outPath = path.join(root, "LOGBOOK.doc");
const desktopPath = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK.doc");

const SCREENSHOTS = [
  { num: 1, title: "Splash screen", file: "01_splash.png" },
  { num: 2, title: "Login screen", file: "02_login.png" },
  { num: 3, title: "Register screen", file: "03_register.png" },
  { num: 4, title: "Dashboard (Home)", file: "04_dashboard.png" },
  { num: 5, title: "Budget / Reports", file: "05_budget.png" },
  { num: 6, title: "Guest list and filters", file: "06_guests.png" },
  { num: 7, title: "Schedule", file: "07_schedule.png" },
  { num: 8, title: "Settings and profile", file: "08_settings.png" },
  { num: 9, title: "Login error message", file: "09_error.png" },
];

fs.mkdirSync(imagesDir, { recursive: true });
for (const s of SCREENSHOTS) {
  fs.copyFileSync(path.join(sourceDir, s.file), path.join(imagesDir, s.file));
}

function b64(file) {
  return fs.readFileSync(path.join(imagesDir, file)).toString("base64");
}

let figureNum = 0;

function wordFigure(file, title, widthPx = 240) {
  figureNum += 1;
  const data = b64(file);
  return `
<p class="MsoNormal" align="center" style="text-align:center;margin:18pt 0 6pt 0;page-break-inside:avoid;">
  <span style="mso-no-proof:yes">
    <img src="data:image/png;base64,${data}" alt="${title}" width="${widthPx}" style="width:${widthPx}px;border:1px solid #CCCCCC;"/>
  </span>
</p>
<p class="MsoCaption" align="center" style="text-align:center;font-size:10pt;color:#666666;font-style:italic;margin:0 0 16pt 0;">
  Figure ${figureNum}: ${title}
</p>`;
}

function wordFigures(files, titles, widthPx = 200) {
  return files.map((file, i) => wordFigure(file, titles[i], widthPx)).join("\n");
}

function injectScreenshots(md) {
  let out = md;

  out = out.replace(
    "**Key files:** `lib/core/theme/`, `lib/core/widgets/wedding_widgets.dart`\n\n**Instructor mark:**",
    `**Key files:** \`lib/core/theme/\`, \`lib/core/widgets/wedding_widgets.dart\`\n\n**Evidence (screenshots):**\n\n${wordFigures(
      ["01_splash.png", "02_login.png", "03_register.png", "04_dashboard.png", "05_budget.png"],
      ["Splash screen", "Login screen", "Register screen", "Dashboard", "Budget / Reports"],
      200,
    )}\n**Instructor mark:**`,
  );

  out = out.replace(
    "/schedule, /vendors, /profile, /settings, /notifications\n```\n\n**Instructor mark:** ____________ / 4",
    `/schedule, /vendors, /profile, /settings, /notifications\n\`\`\`\n\n**Evidence (screenshot):**\n\n${wordFigure("04_dashboard.png", "Dashboard and bottom navigation", 260)}\n**Instructor mark:** ____________ / 4`,
  );

  out = out.replace(
    "**Files:** `login_screen.dart`, `register_screen.dart`, `guest_list_screen.dart`, `schedule_screen.dart`\n\n**Instructor mark:**",
    `**Files:** \`login_screen.dart\`, \`register_screen.dart\`, \`guest_list_screen.dart\`, \`schedule_screen.dart\`\n\n**Evidence (screenshots):**\n\n${wordFigures(
      ["06_guests.png", "07_schedule.png", "08_settings.png"],
      ["Guest list with filters", "Schedule timeline", "Settings screen"],
      220,
    )}\n**Instructor mark:**`,
  );

  out = out.replace(
    "**File:** `lib/services/auth_service.dart` → `AuthResult` class\n\n**Instructor mark:** ____________ / 3",
    `**File:** \`lib/services/auth_service.dart\` → \`AuthResult\` class\n\n**Evidence (screenshot):**\n\n${wordFigure("09_error.png", "Login error message", 260)}\n**Instructor mark:** ____________ / 3`,
  );

  const section11 = [
    "## 11. Required screenshots",
    "",
    "The following screenshots document the main screens of the Nikah Planner application:",
    "",
    ...SCREENSHOTS.flatMap((s) => [wordFigure(s.file, s.title, 240), ""]),
    "**Note:** Screenshots captured from the application running on emulator / browser.",
  ].join("\n");

  out = out.replace(/## 11\. Required screenshots[\s\S]*?(?=---\n\n## 12\. Revision)/, `${section11}\n\n`);

  return out;
}

function esc(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<span style='font-family:Consolas,monospace;background:#F2F2F2;'>$1</span>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function mdToWordHtml(source) {
  const lines = source.split("\n");
  const out = [];
  let inCode = false;
  let inTable = false;
  let listOpen = false;
  let inHtmlBlock = false;

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

    if (line.includes("<p class=\"MsoNormal\"") || line.includes("<p class=\"MsoCaption\"")) {
      inHtmlBlock = true;
      closeList();
      closeTable();
      out.push(line);
      continue;
    }
    if (inHtmlBlock) {
      out.push(line);
      if (line.includes("</p>") && !line.includes("<p ")) inHtmlBlock = false;
      continue;
    }

    if (line.startsWith("```")) {
      closeList();
      closeTable();
      if (!inCode) {
        inCode = true;
        out.push("<p class='MsoNormal' style='margin:6pt 0;'><pre style='font-family:Consolas,monospace;font-size:9pt;background:#F2F2F2;padding:8pt;border:1px solid #DDDDDD;'>");
      } else {
        inCode = false;
        out.push("</pre></p>");
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
        out.push("<table border='1' cellpadding='4' cellspacing='0' style='border-collapse:collapse;width:100%;font-size:10pt;'>");
        out.push("<tr>");
        cells.forEach((c) => out.push(`<td style='background:#E8E8E8;font-weight:bold;'>${inline(c)}</td>`));
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
      out.push("<p class='MsoNormal' style='margin:12pt 0;'>&nbsp;</p>");
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1 style='font-family:Calibri;font-size:22pt;color:#1F1F1F;margin:0 0 12pt 0;'>${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      const t = line.slice(3);
      if (t.startsWith("11.")) {
        out.push("<br clear=all style='page-break-before:always'/>");
      }
      out.push(`<h2 style='font-family:Calibri;font-size:14pt;color:#2F5496;margin:18pt 0 8pt 0;'>${inline(t)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      out.push(`<h3 style='font-family:Calibri;font-size:12pt;color:#404040;margin:12pt 0 6pt 0;'>${inline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- [x] ") || line.startsWith("- [ ] ")) {
      if (!listOpen) {
        out.push("<ul style='margin:6pt 0 6pt 18pt;'>");
        listOpen = true;
      }
      const checked = line.startsWith("- [x] ");
      out.push(`<li style='margin:3pt 0;'>${checked ? "☑" : "☐"} ${inline(line.slice(6))}</li>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!listOpen) {
        out.push("<ul style='margin:6pt 0 6pt 18pt;'>");
        listOpen = true;
      }
      out.push(`<li style='margin:3pt 0;'>${inline(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    out.push(`<p class='MsoNormal' style='font-family:Calibri;font-size:11pt;margin:0 0 6pt 0;line-height:1.35;text-align:justify;'>${inline(line)}</p>`);
  }

  closeList();
  closeTable();
  return out.join("\n");
}

figureNum = 0;
const baseMd = execSync("git show f341a21:LOGBOOK.md", { cwd: root, encoding: "utf8" });
const docMd = injectScreenshots(baseMd);

const cover = `
<p class="MsoNormal" align="center" style="text-align:center;margin-top:72pt;">
  <span style="font-size:26pt;font-weight:bold;color:#2F5496;">Nikah Planner</span>
</p>
<p class="MsoNormal" align="center" style="text-align:center;font-size:14pt;margin:12pt 0;">
  Logbook &amp; Technical Report — CAT Mobile Application
</p>
<p class="MsoNormal" align="center" style="text-align:center;margin-top:48pt;font-size:12pt;line-height:1.8;">
  <b>Student:</b> Hadidja Aliani<br/>
  <b>Student ID:</b> BIT/2023/62116<br/>
  <b>Module:</b> Mobile Application Development<br/>
  <b>Submission date:</b> June 2026
</p>
<br clear=all style="page-break-before:always"/>
`;

const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>Logbook — Nikah Planner — Hadidja Aliani</title>
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
    @page Section1 { size: 595.3pt 841.9pt; margin: 72pt 72pt 72pt 72pt; }
    div.Section1 { page: Section1; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #000000; }
    p.MsoNormal { font-family: Calibri, Arial, sans-serif; font-size: 11pt; }
    h1, h2, h3 { font-family: Calibri, Arial, sans-serif; }
    img { display: block; margin: 0 auto; }
  </style>
</head>
<body>
<div class="Section1">
${cover}
${mdToWordHtml(docMd)}
</div>
</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");
fs.copyFileSync(outPath, desktopPath);

console.log(`Created: ${outPath}`);
console.log(`Desktop: ${desktopPath}`);
console.log(`Size: ${(fs.statSync(outPath).size / (1024 * 1024)).toFixed(2)} MB — open with Microsoft Word`);
