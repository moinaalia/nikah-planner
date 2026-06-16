import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mdPath = path.join(root, "JOURNAL_DE_BORD.md");
const pdfPath = path.join(root, "JOURNAL_DE_BORD.pdf");
const htmlPath = path.join(root, "JOURNAL_DE_BORD.html");

const md = fs.readFileSync(mdPath, "utf8");

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function mdToHtml(source) {
  const lines = source.split("\n");
  const out = [];
  let inCode = false;
  let inTable = false;
  let listType = null;

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  const closeTable = () => {
    if (inTable) {
      out.push("</tbody></table>");
      inTable = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("```")) {
      closeList();
      closeTable();
      if (!inCode) {
        inCode = true;
        out.push('<pre><code>');
      } else {
        inCode = false;
        out.push("</code></pre>");
      }
      continue;
    }

    if (inCode) {
      out.push(escapeHtml(line));
      continue;
    }

    if (line.startsWith("|")) {
      closeList();
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) continue;
      if (!inTable) {
        inTable = true;
        out.push('<table><thead><tr>');
        cells.forEach((c) => out.push(`<th>${inline(c)}</th>`));
        out.push("</tr></thead><tbody>");
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
      out.push("<hr />");
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- [x] ")) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>✅ ${inline(line.slice(6))}</li>`);
      continue;
    }
    if (line.startsWith("- [ ] ")) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>☐ ${inline(line.slice(6))}</li>`);
      continue;
    }
    if (line.startsWith("- ")) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }

  closeList();
  closeTable();
  if (inCode) out.push("</code></pre>");
  return out.join("\n");
}

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Journal de bord — Nikah Planner</title>
  <style>
    @page { margin: 18mm 16mm; }
    body {
      font-family: "Segoe UI", Arial, sans-serif;
      color: #2d2417;
      line-height: 1.55;
      font-size: 11pt;
      max-width: 900px;
      margin: 0 auto;
      padding: 24px;
    }
    h1 { color: #7a5c3a; font-size: 24pt; border-bottom: 2px solid #b8956a; padding-bottom: 8px; }
    h2 { color: #7a5c3a; font-size: 16pt; margin-top: 28px; }
    h3 { color: #5c4a32; font-size: 13pt; margin-top: 20px; }
    p { margin: 8px 0; }
    code, pre {
      font-family: Consolas, monospace;
      background: #f5f0e8;
      border-radius: 6px;
    }
    code { padding: 2px 5px; font-size: 9.5pt; }
    pre {
      padding: 12px;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 9pt;
      border: 1px solid #e8dfd2;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 18px;
      font-size: 10pt;
    }
    th, td {
      border: 1px solid #ddd4c8;
      padding: 8px 10px;
      text-align: left;
      vertical-align: top;
    }
    th { background: #f5ede0; color: #7a5c3a; }
    hr { border: none; border-top: 1px solid #e0d5c8; margin: 24px 0; }
    ul { margin: 8px 0 12px 20px; }
    a { color: #b8956a; }
  </style>
</head>
<body>
${mdToHtml(md)}
</body>
</html>`;

fs.writeFileSync(htmlPath, html, "utf8");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: { top: "18mm", right: "16mm", bottom: "18mm", left: "16mm" },
});
await browser.close();

console.log(`PDF created: ${pdfPath}`);
