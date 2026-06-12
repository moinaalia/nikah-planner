# Publier Nikah Planner sur GitHub (compte moinaalia)
# Clic droit > Exécuter avec PowerShell, ou : .\PUBLIER_GITHUB.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
$Gh = "C:\Program Files\GitHub CLI\gh.exe"
$Repo = "moinaalia/nikah-planner"

Set-Location $ProjectRoot

Write-Host "`n=== Nikah Planner — Publication GitHub ===" -ForegroundColor Cyan
Write-Host "Dépôt cible : https://github.com/$Repo`n"

# 1. Connexion GitHub
if (Test-Path $Gh) {
    $auth = & $Gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Connexion à GitHub requise..." -ForegroundColor Yellow
        Write-Host "Suivez les instructions (navigateur ou token)." -ForegroundColor Yellow
        & $Gh auth login -h github.com -p https -w
    }
} else {
    Write-Host "GitHub CLI non trouvé. Installez-le : winget install GitHub.cli" -ForegroundColor Yellow
    Write-Host "Ou créez le dépôt manuellement : https://github.com/new?name=nikah-planner" -ForegroundColor Yellow
}

# 2. Créer le dépôt s'il n'existe pas
if (Test-Path $Gh) {
    $view = & $Gh repo view $Repo 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Création du dépôt public $Repo ..." -ForegroundColor Green
        & $Gh repo create nikah-planner --public --description "Application mobile de planification de mariage — Flutter + React UI" --source=. --remote=origin
    } else {
        Write-Host "Le dépôt existe déjà sur GitHub." -ForegroundColor Green
        git remote remove origin 2>$null
        git remote add origin "https://github.com/$Repo.git"
    }
}

# 3. Pousser le code
Write-Host "Envoi du code sur GitHub..." -ForegroundColor Green
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== SUCCÈS ===" -ForegroundColor Green
    Write-Host "Profil  : https://github.com/moinaalia"
    Write-Host "Projet  : https://github.com/moinaalia/nikah-planner"
    Write-Host "`nEnvoyez ces liens au professeur (voir SOUMISSION_PROF.md).`n"
} else {
    Write-Host "`nÉchec du push. Vérifiez :" -ForegroundColor Red
    Write-Host "  1. Compte GitHub connecté (gh auth login)"
    Write-Host "  2. Dépôt créé : https://github.com/new?name=nikah-planner"
    Write-Host "  3. Relancez : git push -u origin main`n"
}
