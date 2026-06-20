import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = path.join(root, "screenshots");
const outPath = path.join(root, "LOGBOOK_A_REMPLIR.doc");
const desktopDoc = path.join(process.env.USERPROFILE || "", "Desktop", "LOGBOOK_A_REMPLIR.doc");
const desktopShots = path.join(process.env.USERPROFILE || "", "Desktop", "Nikah_Screenshots");

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

function esc(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

function placeholderBox(s, label = "") {
  const exists = fs.existsSync(path.join(shotsDir, s.file));
  const title = label || s.title;
  return `
<table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:12px 0;page-break-inside:avoid;">
  <tr>
    <td style="border:2px dashed #B8956A;background:#FBF8F4;padding:20px;text-align:center;min-height:360px;height:360px;vertical-align:middle;">
      <p style="font-size:12pt;color:#7A5C3A;margin:0 0 8px;"><b>Screenshot ${s.num} — ${esc(title)}</b></p>
      <p style="font-size:11pt;color:#8C7B6B;margin:0 0 10px;">Insert image here</p>
      <p style="font-size:10pt;color:#5C4A32;margin:0;"><b>File:</b> <code>${esc(s.file)}</code></p>
      <p style="font-size:9pt;color:#8C7B6B;margin:8px 0 0;">${exists ? "PNG found in screenshots folder" : "Capture missing — use project screenshots folder"}</p>
      <p style="font-size:9pt;color:#8C7B6B;margin:10px 0 0;">Word: <b>Insert</b> → <b>Pictures</b> → <b>This Device</b></p>
    </td>
  </tr>
</table>`;
}

function placeholdersFor(files, labels) {
  return files.map((file, i) => {
    const s = SCREENSHOTS.find((x) => x.file === file);
    return placeholderBox(s, labels?.[i] || s?.title);
  }).join("\n");
}

function injectPlaceholders(md) {
  let out = md;

  out = out.replace(
    "**Key files:** `lib/core/theme/`, `lib/core/widgets/wedding_widgets.dart`\n\n**Instructor mark:**",
    `**Key files:** \`lib/core/theme/\`, \`lib/core/widgets/wedding_widgets.dart\`\n\n**Screenshots (insert manually):**\n\n${placeholdersFor(
      ["01_splash.png", "02_login.png", "03_register.png", "04_dashboard.png", "05_budget.png"],
      ["Splash screen", "Login screen", "Register screen", "Dashboard", "Budget / Reports"],
    )}\n**Instructor mark:**`,
  );

  out = out.replace(
    "/schedule, /vendors, /profile, /settings, /notifications\n```\n\n**Instructor mark:** ____________ / 4",
    `/schedule, /vendors, /profile, /settings, /notifications\n\`\`\`\n\n**Screenshot (insert manually):**\n\n${placeholderBox(SCREENSHOTS[3], "Dashboard and navigation")}\n**Instructor mark:** ____________ / 4`,
  );

  out = out.replace(
    "**Files:** `login_screen.dart`, `register_screen.dart`, `guest_list_screen.dart`, `schedule_screen.dart`\n\n**Instructor mark:**",
    `**Files:** \`login_screen.dart\`, \`register_screen.dart\`, \`guest_list_screen.dart\`, \`schedule_screen.dart\`\n\n**Screenshots (insert manually):**\n\n${placeholdersFor(
      ["06_guests.png", "07_schedule.png", "08_settings.png"],
      ["Guest list", "Schedule", "Settings"],
    )}\n**Instructor mark:**`,
  );

  out = out.replace(
    "**File:** `lib/services/auth_service.dart` → `AuthResult` class\n\n**Instructor mark:** ____________ / 3",
    `**File:** \`lib/services/auth_service.dart\` → \`AuthResult\` class\n\n**Screenshot (insert manually):**\n\n${placeholderBox(SCREENSHOTS[8], "Login error message")}\n**Instructor mark:** ____________ / 3`,
  );

  const section11 = [
    "## 11. Required screenshots",
    "",
    "Insert each screenshot in the box below (Word: **Insert** → **Pictures** → **This Device**).",
    "",
    ...SCREENSHOTS.flatMap((s) => [`### 11.${s.num} ${s.title}`, "", placeholderBox(s), ""]),
  ].join("\n");

  out = out.replace(/## 11\. Required screenshots[\s\S]*?(?=---\n\n## 12\. Revision)/, `${section11}\n\n`);

  return out;
}

function mdToWordHtml(source) {
  const lines = source.split("\n");
  const out = [];
  let inCode = false;
  let inTable = false;
  let listOpen = false;
  let inHtml = false;

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

    if (line.startsWith("<table") || line.startsWith("<tr>") || line.startsWith("<td") || line.startsWith("</table") || line.startsWith("</tr") || line.startsWith("</td") || line.startsWith("<p style=\"font-size:12pt")) {
      inHtml = true;
      closeList();
      closeTable();
      out.push(line);
      continue;
    }
    if (inHtml) {
      out.push(line);
      if (line.includes("</table>")) inHtml = false;
      continue;
    }

    if (line.startsWith("```")) {
      closeList();
      closeTable();
      if (!inCode) {
        inCode = true;
        out.push('<pre style="background:#F2F2F2;padding:8pt;font-family:Consolas,monospace;font-size:9pt;">');
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
      out.push("<p style='margin:12pt 0;'>&nbsp;</p>");
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1 style='font-family:Calibri;font-size:22pt;color:#2F5496;'>${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      if (line.includes("11.")) out.push("<br clear=all style='page-break-before:always'/>");
      out.push(`<h2 style='font-family:Calibri;font-size:14pt;color:#2F5496;margin-top:16pt;'>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      out.push(`<h3 style='font-family:Calibri;font-size:12pt;margin-top:10pt;'>${inline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- [x] ") || line.startsWith("- [ ] ")) {
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      out.push(`<li>${line.startsWith("- [x] ") ? "☑" : "☐"} ${inline(line.slice(6))}</li>`);
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
    out.push(`<p style='font-family:Calibri;font-size:11pt;margin:0 0 6pt 0;line-height:1.35;'>${inline(line)}</p>`);
  }

  closeList();
  closeTable();
  return out.join("\n");
}

const baseMd = execSync("git show f341a21:LOGBOOK.md", { cwd: root, encoding: "utf8" });
const docMd = injectPlaceholders(baseMd);

const cover = `
<p align="center" style="margin-top:60pt;font-size:24pt;font-weight:bold;color:#2F5496;">Nikah Planner</p>
<p align="center" style="font-size:14pt;margin:10pt 0;">Logbook &amp; Technical Report — CAT Mobile Application</p>
<p align="center" style="margin-top:40pt;font-size:12pt;line-height:1.8;">
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
  <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
  <![endif]-->
  <style>
    @page { size: A4; margin: 2cm; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #000; }
  </style>
</head>
<body>
${cover}
${mdToWordHtml(docMd)}
</body>
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

console.log(`Word document: ${outPath}`);
console.log(`Desktop: ${desktopDoc}`);
console.log(`Screenshots folder: ${desktopShots}`);
console.log("Open in Microsoft Word, then Insert → Pictures in each dashed box.");
