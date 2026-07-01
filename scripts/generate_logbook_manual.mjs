import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const premium = path.join(path.dirname(fileURLToPath(import.meta.url)), "generate_logbook_premium.mjs");
spawnSync(process.execPath, [premium], { stdio: "inherit" });
