@echo off
REM SFMC Certification GitHub Sync Setup
REM This batch file helps set up secure GitHub synchronization

echo.
echo ==========================================
echo   SFMC Certification GitHub Sync Setup
echo ==========================================
echo.

echo Step 1: Checking PowerShell execution policy...
powershell -Command "Get-ExecutionPolicy"

echo.
echo If you see 'Restricted', you need to allow PowerShell scripts.
echo Run this command as Administrator:
echo   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
echo.

echo Step 2: Setting up GitHub authentication...
echo.
echo IMPORTANT: Never share your Personal Access Token in scripts!
echo.
echo Choose one of these secure authentication methods:
echo.
echo Option 1 - GitHub CLI (Recommended):
echo   1. Install GitHub CLI from: https://cli.github.com/
echo   2. Run: gh auth login
echo   3. Follow the prompts to authenticate
echo.
echo Option 2 - Git Credential Manager:
echo   1. Install Git for Windows (includes Credential Manager)
echo   2. Git will prompt for username and token when needed
echo.
echo Option 3 - Configure Git credentials:
echo   git config --global user.name "Your Name"
echo   git config --global user.email "your.email@example.com"
echo.

echo Step 3: Create GitHub repository if it doesn't exist
echo.
echo Repository already exists at: https://github.com/yakhtar/SFMC_Cert
echo This is a public repository ready for synchronization
echo No need to create a new repository
echo.

echo Step 4: Run the sync script
echo.
echo After completing the above steps, run:
echo   powershell -ExecutionPolicy Bypass -File "sync-to-github.ps1"
echo.

pause