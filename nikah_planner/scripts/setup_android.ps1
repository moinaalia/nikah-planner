# Installe les outils Android manquants + émulateur pour Nikah Planner
$ErrorActionPreference = "Stop"

# SDK Android (priorite: C:\Android\Sdk, sinon dossier utilisateur)
$SdkRoot = if (Test-Path "C:\Android\Sdk") { "C:\Android\Sdk" } else { "$env:LOCALAPPDATA\Android\Sdk" }
$JavaHome = "C:\Program Files\Android\Android Studio\jbr"
if (-not (Test-Path "$JavaHome\bin\java.exe")) {
    Write-Error "Java introuvable. Installez Android Studio ou JDK 17."
    exit 1
}
[Environment]::SetEnvironmentVariable("JAVA_HOME", $JavaHome, "User")
$env:JAVA_HOME = $JavaHome
$env:Path = "$JavaHome\bin;$env:Path"
$CmdToolsLatest = Join-Path $SdkRoot "cmdline-tools\latest"
$SdkManager = Join-Path $CmdToolsLatest "bin\sdkmanager.bat"
$AvdManager = Join-Path $CmdToolsLatest "bin\avdmanager.bat"
$Flutter = "C:\src\flutter\bin\flutter.bat"
$NikahPlanner = Split-Path $PSScriptRoot -Parent

Write-Host "`n=== Setup Android SDK ===" -ForegroundColor Cyan
Write-Host "SDK: $SdkRoot"

# 1. cmdline-tools
if (-not (Test-Path $SdkManager)) {
    Write-Host "Telechargement des Android Command-line Tools..." -ForegroundColor Yellow
    $zip = Join-Path $env:TEMP "cmdline-tools-win.zip"
    $uri = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
    Invoke-WebRequest -Uri $uri -OutFile $zip -UseBasicParsing
    $extract = Join-Path $env:TEMP "cmdline-tools-extract"
    if (Test-Path $extract) { Remove-Item $extract -Recurse -Force }
    Expand-Archive -Path $zip -DestinationPath $extract -Force
    New-Item -ItemType Directory -Path (Join-Path $SdkRoot "cmdline-tools") -Force | Out-Null
    if (Test-Path $CmdToolsLatest) { Remove-Item $CmdToolsLatest -Recurse -Force }
    New-Item -ItemType Directory -Path $CmdToolsLatest -Force | Out-Null
    Copy-Item -Path (Join-Path $extract "cmdline-tools\*") -Destination $CmdToolsLatest -Recurse -Force
    Remove-Item $zip -Force -ErrorAction SilentlyContinue
    Write-Host "cmdline-tools installes." -ForegroundColor Green
}

# 2. Variables d'environnement
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $SdkRoot, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $SdkRoot, "User")
$env:ANDROID_HOME = $SdkRoot
$env:ANDROID_SDK_ROOT = $SdkRoot

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$toAdd = @(
    (Join-Path $SdkRoot "platform-tools"),
    (Join-Path $SdkRoot "emulator"),
    (Join-Path $CmdToolsLatest "bin")
)
foreach ($p in $toAdd) {
    if ($userPath -notlike "*$p*") { $userPath = "$userPath;$p" }
}
[Environment]::SetEnvironmentVariable("Path", $userPath, "User")
$env:Path = "$env:Path;$($toAdd -join ';')"

# 3. Packages SDK + image emulateur
Write-Host "Installation des packages Android (peut prendre plusieurs minutes)..." -ForegroundColor Yellow
$packages = @(
    "cmdline-tools;latest",
    "platform-tools",
    "emulator",
    "platforms;android-34",
    "build-tools;34.0.0",
    "system-images;android-34;google_apis;x86_64"
)
& $SdkManager --sdk_root=$SdkRoot @packages

Write-Host "Acceptation des licences Android..." -ForegroundColor Yellow
1..50 | ForEach-Object { "y" } | & $SdkManager --sdk_root=$SdkRoot --licenses 2>&1 | Out-Null

# 4. Emulateur AVD
$avdName = "Pixel_7_API_34"
$avdList = & $AvdManager list avd 2>&1
if ($avdList -notmatch $avdName) {
    Write-Host "Creation de l'emulateur $avdName..." -ForegroundColor Yellow
    echo "no" | & $AvdManager create avd -n $avdName -k "system-images;android-34;google_apis;x86_64" -d "pixel_7" --force
}

# 5. local.properties
$localPropsPath = Join-Path $NikahPlanner "android\local.properties"
$sdkDirEscaped = $SdkRoot -replace '\\', '\\'
$content = @"
sdk.dir=$sdkDirEscaped
flutter.sdk=C:\\src\\flutter
"@
Set-Content -Path $localPropsPath -Value $content -Encoding UTF8
Write-Host "local.properties mis a jour." -ForegroundColor Green

# 6. Flutter
& $Flutter config --android-sdk $SdkRoot
Write-Host "Acceptation des licences Flutter..." -ForegroundColor Yellow
1..50 | ForEach-Object { "y" } | & $Flutter doctor --android-licenses 2>&1 | Out-Null
& $Flutter pub get
Set-Location $NikahPlanner

Write-Host "`n=== Verification ===" -ForegroundColor Cyan
& $Flutter doctor
& $Flutter emulators

Write-Host "`n=== SUCCES ===" -ForegroundColor Green
Write-Host "Demarrer l'emulateur : flutter emulators --launch $avdName"
Write-Host "Lancer l'app         : flutter run"
Write-Host "Ou dans Android Studio : Run sur $avdName`n"
