# Final SFMC GitHub Sync Script
# Fixed branch name issue

param(
    [string]$LocalPath = "C:\Users\akhta\my_projects\sfmc_cert",
    [string]$RepoUrl = "https://github.com/yakhtar/SFMC_Cert.git"
)

Write-Host "SFMC Certification GitHub Sync Script - Final Version" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "Git is installed" -ForegroundColor Green
}
catch {
    Write-Host "Git is not installed" -ForegroundColor Red
    exit 1
}

# Navigate to project directory
Set-Location $LocalPath
Write-Host "Working in: $LocalPath" -ForegroundColor Blue

# Check current branch name
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    $currentBranch = "master"
}

Write-Host "Current branch: $currentBranch" -ForegroundColor Blue

# Show current status
Write-Host "Checking repository status..." -ForegroundColor Blue
git status --short

# Add any new changes
Write-Host "Adding any new changes..." -ForegroundColor Yellow
git add .

# Check if there are new changes to commit
$status = git status --porcelain
if ($status) {
    # Create commit for new changes
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "sync: SFMC certification updates - $timestamp"
    
    Write-Host "Committing new changes..." -ForegroundColor Yellow
    git commit -m $commitMessage
}
else {
    Write-Host "No new changes to commit" -ForegroundColor Blue
}

# Push to GitHub using the correct branch name
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Repository: $RepoUrl" -ForegroundColor Blue
Write-Host "Branch: $currentBranch" -ForegroundColor Blue

git push -u origin $currentBranch

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully synced to GitHub!" -ForegroundColor Green
    Write-Host "View your repository: https://github.com/yakhtar/SFMC_Cert" -ForegroundColor Cyan
}
else {
    Write-Host "Push failed - likely needs authentication" -ForegroundColor Yellow
    Write-Host "When prompted for credentials:" -ForegroundColor White
    Write-Host "Username: yakhtar" -ForegroundColor Gray
    Write-Host "Password: [Your Personal Access Token]" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")