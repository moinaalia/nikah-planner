# Lance Nikah Planner avec VOS donnees (14 aout 2026)
$NikahPlanner = Split-Path $PSScriptRoot -Parent
Set-Location $NikahPlanner

$personalFile = Join-Path $NikahPlanner "lib\core\data\wedding_personal.dart"
if (-not (Test-Path $personalFile)) {
    Write-Host "Fichier manquant: wedding_personal.dart" -ForegroundColor Red
    Write-Host "Copiez wedding_personal.example.dart vers wedding_personal.dart"
    exit 1
}

Write-Host "Mode personnel — mariage 14 aout" -ForegroundColor Green
flutter run --dart-define=PERSONAL_WEDDING=true @args
