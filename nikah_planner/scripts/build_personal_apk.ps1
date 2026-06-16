# Build APK personnel pour votre telephone
$NikahPlanner = Split-Path $PSScriptRoot -Parent
Set-Location $NikahPlanner

Write-Host "Build APK mode personnel..." -ForegroundColor Green
flutter build apk --release --dart-define=PERSONAL_WEDDING=true
Write-Host "APK: build\app\outputs\flutter-apk\app-release.apk"
