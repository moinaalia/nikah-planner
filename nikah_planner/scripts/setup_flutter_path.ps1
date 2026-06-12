# Adds Flutter to user PATH and verifies installation.
$flutterBin = 'C:\src\flutter\bin'

if (-not (Test-Path "$flutterBin\flutter.bat")) {
    Write-Error "Flutter not found at $flutterBin. Install Flutter to C:\src\flutter first."
    exit 1
}

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$flutterBin*") {
    [Environment]::SetEnvironmentVariable('Path', "$userPath;$flutterBin", 'User')
    Write-Host "Added $flutterBin to user PATH."
} else {
    Write-Host "Flutter already in PATH."
}

$env:Path = "$env:Path;$flutterBin"
& "$flutterBin\flutter.bat" --version
& "$flutterBin\flutter.bat" doctor
