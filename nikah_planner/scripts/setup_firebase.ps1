# Lie le projet Firebase a Nikah Planner (apres avoir cree le projet sur console.firebase.google.com)
$ErrorActionPreference = "Stop"

$NikahPlanner = Split-Path $PSScriptRoot -Parent
$PubBin = Join-Path $env:LOCALAPPDATA "Pub\Cache\bin"
$env:Path = "$PubBin;$env:Path"

Set-Location $NikahPlanner

Write-Host "`n=== Firebase + Nikah Planner ===" -ForegroundColor Cyan
Write-Host "1. Creez le projet sur https://console.firebase.google.com"
Write-Host "2. Activez Authentication (Email/Mot de passe) + Firestore"
Write-Host "3. Ce script va ouvrir la connexion Google et configurer l'app`n"

if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de Firebase CLI..." -ForegroundColor Yellow
    npm install -g firebase-tools
    $env:Path = "$env:Path;$env:APPDATA\npm"
}

if (-not (Get-Command flutterfire -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de FlutterFire CLI..." -ForegroundColor Yellow
    dart pub global activate flutterfire_cli
    $env:Path = "$PubBin;$env:Path"
}

Write-Host "Connexion Firebase (navigateur)..." -ForegroundColor Yellow
firebase login

Write-Host "Configuration Flutter (selectionnez android)..." -ForegroundColor Yellow
flutterfire configure --project=nikah-planner --platforms=android --yes 2>$null
if ($LASTEXITCODE -ne 0) {
    flutterfire configure
}

flutter pub get
Write-Host "`n=== Termine ===" -ForegroundColor Green
Write-Host "Lancez: flutter run"
Write-Host "Guide complet: FIREBASE_SETUP.md`n"
