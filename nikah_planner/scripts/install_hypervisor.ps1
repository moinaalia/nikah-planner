# Installe le pilote hyperviseur Android (requis pour l'emulateur x86_64)
# EXECUTER EN POWERSHELL ADMINISTRATEUR, puis redemarrer le PC.

$ErrorActionPreference = "Stop"

$driverDir = "C:\Android\Sdk\extras\google\Android_Emulator_Hypervisor_Driver"
$installer = Join-Path $driverDir "silent_install.bat"

if (-not (Test-Path $installer)) {
    Write-Host "Pilote introuvable. Installez-le via Android Studio :" -ForegroundColor Yellow
    Write-Host "  Tools > SDK Manager > SDK Tools > Android Emulator hypervisor driver"
    exit 1
}

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Relance en administrateur..." -ForegroundColor Yellow
    Start-Process powershell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    exit 0
}

Write-Host "Installation du pilote hyperviseur Android..." -ForegroundColor Cyan
Set-Location $driverDir
& cmd /c silent_install.bat

Write-Host "`nRedemarrez votre PC, puis lancez :" -ForegroundColor Green
Write-Host "  flutter emulators --launch Pixel_7_API_34"
Write-Host "  flutter run"
