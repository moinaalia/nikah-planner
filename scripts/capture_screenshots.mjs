import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "screenshots");
const baseUrl = process.env.SCREENSHOT_URL ?? "http://127.0.0.1:5174";

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not ready: ${url}`);
}

async function capturePhone(page, fileName) {
  const frame = page.locator("div.relative.overflow-hidden.flex.flex-col").first();
  await frame.screenshot({ path: path.join(outDir, fileName) });
  console.log(`Saved ${fileName}`);
}

async function main() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await waitForServer(baseUrl);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 1000 } });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  const bottomNav = page.locator("div").filter({ has: page.getByRole("button", { name: "Home" }) }).last();

  await page.waitForTimeout(1400);
  await capturePhone(page, "01_splash.png");

  await page.waitForSelector("text=Welcome Back", { timeout: 10000 });
  await page.waitForTimeout(600);
  await capturePhone(page, "02_login.png");

  await page.getByText("Register now").click();
  await page.waitForTimeout(800);
  await capturePhone(page, "03_register.png");

  await page.getByText("Sign in").first().click();
  await page.waitForTimeout(600);
  await page.getByPlaceholder("your@email.com").fill("demo@nikah.app");
  await page.getByPlaceholder("••••••••").fill("demo1234");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForTimeout(1000);
  await capturePhone(page, "04_dashboard.png");

  await bottomNav.getByRole("button", { name: "Budget" }).click();
  await page.waitForTimeout(800);
  await capturePhone(page, "05_budget.png");

  await bottomNav.getByRole("button", { name: "Guests" }).click();
  await page.waitForTimeout(600);
  await page.getByText("Bride's Side").click();
  await page.waitForTimeout(500);
  await capturePhone(page, "06_guests.png");

  await bottomNav.getByRole("button", { name: "Home" }).click();
  await page.waitForTimeout(500);
  await page.getByText("Schedule").first().click();
  await page.waitForTimeout(800);
  await capturePhone(page, "07_schedule.png");

  await page.locator("button").filter({ hasText: "Back" }).evaluate((btn) => btn.click());
  await page.waitForTimeout(600);
  await bottomNav.getByRole("button", { name: "More" }).click();
  await page.waitForTimeout(500);
  await page.getByText("Settings").click();
  await page.waitForTimeout(800);
  await capturePhone(page, "08_settings.png");

  await page.getByText("Sign Out").click();
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForTimeout(400);
  await capturePhone(page, "09_error.png");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
