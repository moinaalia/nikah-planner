import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mdPath = path.join(root, "JOURNAL_DE_BORD.md");
const shotsDir = path.join(root, "screenshots");
const outPath = path.join(root, "JOURNAL_DE_BORD_A_REMPLIR.doc");

const SCREENSHOTS = [
  { num: 1, title: "Splash", file: "01_splash.png" },
  { num: 2, title: "Login", file: "02_login.png" },
  { num: 3, title: "Register", file: "03_register.png" },
  { num: 4, title: "Dashboard (Home)", file: "04_dashboard.png" },
  { num: 5, title: "Budget / Reports", file: "05_budget.png" },
  { num: 6, title: "Guest List + filters", file: "06_guests.png" },
  { num: 7, title: "Schedule", file: "07_schedule.png" },
  { num: 8, title: "Settings + profile", file: "08_settings.png" },
  { num: 9, title: "Login error message", file: "09_error.png" },
];

const md = fs.readFileSync(mdPath, "utf8");

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

function placeholderBox(s) {
  const fullPath = path.join(shotsDir, s.file).replace(/\\/g, "\\\\");
  const exists = fs.existsSync(path.join(shotsDir, s.file));
  return `
<table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:16px 0;page-break-inside:avoid;">
  <tr>
    <td style="border:2px dashed #B8956A;background:#FBF8F4;padding:24px;text-align:center;min-height:420px;height:420px;vertical-align:middle;">
      <p style="font-size:13pt;color:#7A5C3A;margin:0 0 8px;"><b>Screenshot ${s.num} — ${esc(s.title)}</b></p>
      <p style="font-size:11pt;color:#8C7B6B;margin:0 0 12px;">⬇ Insert image here ⬇</p>
      <p style="font-size:10pt;color:#5C4A32;margin:0 0 6px;"><b>File:</b> <code>screenshots\\${esc(s.file)}</code></p>
      <p style="font-size:9pt;color:#8C7B6B;margin:0;">${exists ? "✓ File found on disk" : "✗ File missing — run npm run screenshots"}</p>
      <p style="font-size:9pt;color:#8C7B6B;margin:12px 0 0;">Word: <b>Insert</b> → <b>Pictures</b> → <b>This Device</b></p>
    </td>
  </tr>
</table>`;
}

function buildScreenshotGallery() {
  const shotsFolder = shotsDir.replace(/\\/g, "/");
  const parts = [
    '<div style="page-break-before:always;"></div>',
    '<h2 style="color:#7A5C3A;font-size:14pt;">11. Required screenshots</h2>',
    `<p><b>How to add screenshots manually in Word:</b></p>
    <ol style="font-size:10pt;line-height:1.6;">
      <li>Open folder: <code>${esc(shotsFolder)}</code></li>
      <li>Click inside each dashed box below</li>
      <li>Menu <b>Insert</b> → <b>Pictures</b> → <b>This Device</b></li>
      <li>Select the matching PNG file (e.g. <code>01_splash.png</code>)</li>
      <li>Resize image to fit the box (width ~6 cm)</li>
    </ol>
    <p style="background:#F5EDE0;padding:10px;border-radius:8px;font-size:10pt;">
      <b>Tip:</b> All screenshots are in the <code>screenshots</code> folder next to this project.
    </p>`,
  ];
  for (const s of SCREENSHOTS) {
    parts.push(`<h3 style="color:#5C4A32;font-size:12pt;margin-top:18px;">${s.num}. ${esc(s.title)}</h3>`);
    parts.push(placeholderBox(s));
  }
  return parts.join("\n");
}

function mdToWordHtml(source) {
  const lines = source.split("\n");
  const out = [];
  let inCode = false;
  let inTable = false;
  let listOpen = false;
  let skipUntilSection12 = false;

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

    if (line.startsWith("## 12.")) {
      skipUntilSection12 = false;
    }
    if (skipUntilSection12) continue;

    if (line.startsWith("## 11.")) {
      closeList();
      closeTable();
      out.push(`<h2 style="color:#7A5C3A;font-size:14pt;">${inline(line.slice(3))}</h2>`);
      out.push(buildScreenshotGallery());
      skipUntilSection12 = true;
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
        closeList();
        out.push("<ul>");
        listOpen = true;
      }
      const checked = line.startsWith("- [x] ");
      out.push(`<li>${checked ? "☑" : "☐"} ${inline(line.slice(6))}</li>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!listOpen) {
        closeList();
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

const body = mdToWordHtml(md);

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
    a { color: #B8956A; }
    img { max-width: 280px; height: auto; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");

const desktop = path.join(process.env.USERPROFILE || "", "Desktop", "JOURNAL_DE_BORD_A_REMPLIR.doc");
try {
  fs.copyFileSync(outPath, desktop);
  console.log(`Copied to Desktop: ${desktop}`);
} catch {
  // ignore
}

console.log(`Word document created: ${outPath}`);
console.log(`Screenshot placeholders: ${SCREENSHOTS.length} (insert manually in Word)`);
