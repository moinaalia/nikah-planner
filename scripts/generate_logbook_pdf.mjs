import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const portfolioScript = path.join(root, "scripts", "generate_logbook_portfolio.mjs");
const htmlPath = path.join(root, "LOGBOOK_PORTFOLIO.html");
const pdfPath = path.join(root, "LOGBOOK.pdf");

spawnSync(process.execPath, [portfolioScript], { stdio: "inherit" });

const docPath = path.join(root, "LOGBOOK_PORTFOLIO.doc");
if (!fs.existsSync(docPath)) {
  console.error("Missing LOGBOOK_PORTFOLIO.doc");
  process.exit(1);
}
fs.copyFileSync(docPath, htmlPath);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, { waitUntil: "load" });
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: { top: "18mm", right: "16mm", bottom: "18mm", left: "16mm" },
});
await browser.close();

const kb = Math.round(fs.statSync(pdfPath).size / 1024);
console.log(`LOGBOOK.pdf created (${kb} KB): ${pdfPath}`);
