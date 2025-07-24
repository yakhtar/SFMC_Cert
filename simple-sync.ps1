# Simple SFMC GitHub Sync Script
# Clean version without problematic characters

param(
    [string]$LocalPath = "C:\Users\akhta\my_projects\sfmc_cert",
    [string]$RepoUrl = "https://github.com/yakhtar/SFMC_Cert.git"
)

Write-Host "SFMC Certification GitHub Sync Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "Git is installed" -ForegroundColor Green
}
catch {
    Write-Host "Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Navigate to project directory
if (-not (Test-Path $LocalPath)) {
    Write-Host "Local path does not exist: $LocalPath" -ForegroundColor Red
    exit 1
}

Set-Location $LocalPath
Write-Host "Working in: $LocalPath" -ForegroundColor Blue

# Initialize Git repository if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git remote add origin $RepoUrl
    Write-Host "Git repository initialized" -ForegroundColor Green
}
else {
    Write-Host "Git repository detected" -ForegroundColor Green
    # Update remote URL to make sure it's correct
    git remote set-url origin $RepoUrl
}

# Show current status
Write-Host "Checking repository status..." -ForegroundColor Blue
git status

# Add all files
Write-Host "Adding all changes..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to commit" -ForegroundColor Blue
    Write-Host "Repository is up to date" -ForegroundColor Green
    exit 0
}

# Create commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "sync: SFMC certification progress - $timestamp"

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to commit changes" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Repository: $RepoUrl" -ForegroundColor Blue

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully synced to GitHub!" -ForegroundColor Green
    Write-Host "View your repository: https://github.com/yakhtar/SFMC_Cert" -ForegroundColor Cyan
}
else {
    Write-Host "Failed to push to GitHub" -ForegroundColor Red
    Write-Host "This might be due to:" -ForegroundColor Yellow
    Write-Host "- Authentication issues (need username and Personal Access Token)" -ForegroundColor Gray
    Write-Host "- Network connectivity problems" -ForegroundColor Gray
    Write-Host "- Repository permissions" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")