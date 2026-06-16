# Genere les 9 captures dans ../screenshots/
# Pre-requis: npm run dev (dans un autre terminal)
# Usage: .\scripts\generate_screenshots.ps1
#        .\scripts\generate_screenshots.ps1 -Port 5174

param([int]$Port = 5173)

$env:SCREENSHOT_URL = "http://127.0.0.1:$Port"
node "$PSScriptRoot\..\scripts\capture_screenshots.mjs"
