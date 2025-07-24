# SFMC Certification GitHub Sync Script
# Secure script to sync local repository to GitHub

param(
    [string]$LocalPath = "C:\Users\akhta\my_projects\sfmc_cert",
    [string]$RepoUrl = "https://github.com/yakhtar/SFMC_Cert.git",
    [switch]$Force = $false
)

Write-Host "🚀 SFMC Certification GitHub Sync Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Function to check if Git is installed
function Test-GitInstalled {
    try {
        git --version | Out-Null
        return $true
    }
    catch {
        Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
        Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
        return $false
    }
}

# Function to safely get GitHub credentials
function Get-GitHubCredentials {
    Write-Host "🔐 GitHub Authentication Required" -ForegroundColor Yellow
    Write-Host "For security, please configure Git credentials using one of these methods:" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 1 - GitHub CLI (Recommended):" -ForegroundColor Cyan
    Write-Host "  gh auth login" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2 - Git Credential Manager:" -ForegroundColor Cyan
    Write-Host "  Git will prompt for your GitHub username and token" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 3 - Set Git config:" -ForegroundColor Cyan
    Write-Host "  git config --global user.name 'Your Name'" -ForegroundColor Gray
    Write-Host "  git config --global user.email 'your.email@example.com'" -ForegroundColor Gray
    Write-Host ""
    
    $continue = Read-Host "Have you configured GitHub authentication? (y/n)"
    return $continue -eq 'y' -or $continue -eq 'Y'
}

# Main sync function
function Sync-ToGitHub {
    param(
        [string]$LocalPath,
        [string]$RepoUrl,
        [bool]$Force
    )
    
    # Check if Git is installed
    if (-not (Test-GitInstalled)) {
        return $false
    }
    
    # Navigate to local directory
    if (-not (Test-Path $LocalPath)) {
        Write-Host "❌ Local path does not exist: $LocalPath" -ForegroundColor Red
        return $false
    }
    
    Set-Location $LocalPath
    Write-Host "📁 Working in: $LocalPath" -ForegroundColor Blue
    
    # Check if this is a Git repository
    if (-not (Test-Path ".git")) {
        Write-Host "📝 Initializing Git repository..." -ForegroundColor Yellow
        git init
        
        # Add remote origin
        Write-Host "🔗 Adding remote origin..." -ForegroundColor Yellow
        git remote add origin $RepoUrl
    }
    else {
        Write-Host "✅ Git repository detected" -ForegroundColor Green
        
        # Check remote origin
        $currentRemote = git remote get-url origin 2>$null
        if ($currentRemote -ne $RepoUrl) {
            Write-Host "🔄 Updating remote origin..." -ForegroundColor Yellow
            git remote set-url origin $RepoUrl
        }
    }
    
    # Check for GitHub credentials
    if (-not (Get-GitHubCredentials)) {
        Write-Host "❌ Please configure GitHub authentication first" -ForegroundColor Red
        return $false
    }
    
    # Get current status
    Write-Host "📊 Checking repository status..." -ForegroundColor Blue
    git status --porcelain
    
    # Add all changes
    Write-Host "➕ Adding all changes..." -ForegroundColor Yellow
    git add .
    
    # Check if there are changes to commit
    $changes = git diff --cached --name-only
    if (-not $changes) {
        Write-Host "ℹ️ No changes to commit" -ForegroundColor Blue
        
        # Try to pull latest changes
        Write-Host "⬇️ Checking for remote updates..." -ForegroundColor Blue
        try {
            git pull origin main --ff-only
            Write-Host "✅ Repository is up to date" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠️ Could not pull from remote (this is normal for new repos)" -ForegroundColor Yellow
        }
        return $true
    }
    
    # Create commit message
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "sync: SFMC certification progress - $timestamp

- Automated sync from local development environment
- Updated training materials and progress tracking
- Synchronized with SFMC-NTO-Training-System structure

Generated on: $env:COMPUTERNAME at $timestamp"
    
    # Commit changes
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m $commitMessage
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to commit changes" -ForegroundColor Red
        return $false
    }
    
    # Push to GitHub
    Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host "Repository: $RepoUrl" -ForegroundColor Blue
    
    try {
        # First time push to set upstream
        git push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully synced to GitHub!" -ForegroundColor Green
            Write-Host "🌐 View your repository: https://github.com/yakhtar/SFMC_Cert" -ForegroundColor Cyan
            return $true
        }
        else {
            Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
            Write-Host "This might be due to:" -ForegroundColor Yellow
            Write-Host "  - Authentication issues" -ForegroundColor Gray
            Write-Host "  - Repository doesn't exist on GitHub" -ForegroundColor Gray
            Write-Host "  - Network connectivity issues" -ForegroundColor Gray
            return $false
        }
    }
    catch {
        Write-Host "❌ Error during push: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to setup GitHub repository if it doesn't exist
function Setup-GitHubRepo {
    Write-Host "🔧 GitHub Repository Setup Helper" -ForegroundColor Cyan
    Write-Host "If the repository doesn't exist, you can create it using:" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 1 - GitHub CLI:" -ForegroundColor Yellow
    Write-Host "  gh repo create yakhtar/SFMC_Cert --public --description 'SFMC Email Specialist Certification Training'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2 - GitHub Web Interface:" -ForegroundColor Yellow
    Write-Host "  1. Go to https://github.com/new" -ForegroundColor Gray
    Write-Host "  2. Repository name: SFMC_Cert" -ForegroundColor Gray
    Write-Host "  3. Description: SFMC Email Specialist Certification Training" -ForegroundColor Gray
    Write-Host "  4. Click 'Create repository'" -ForegroundColor Gray
    Write-Host ""
}

# Execute sync
Write-Host "Starting sync process..." -ForegroundColor Blue
Write-Host ""

$success = Sync-ToGitHub -LocalPath $LocalPath -RepoUrl $RepoUrl -Force $Force

if ($success) {
    Write-Host ""
    Write-Host "🎉 Sync completed successfully!" -ForegroundColor Green
    Write-Host "Your SFMC certification materials are now backed up to GitHub" -ForegroundColor White
}
else {
    Write-Host ""
    Write-Host "❌ Sync failed" -ForegroundColor Red
    Setup-GitHubRepo
    Write-Host ""
    Write-Host "After creating the repository, run this script again:" -ForegroundColor Yellow
    Write-Host "  .\sync-to-github.ps1" -ForegroundColor Gray
}

# Keep window open for review
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")