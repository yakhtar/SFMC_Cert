@echo off
REM Quick Sync to GitHub - SFMC Certification Materials
REM Updated for: https://github.com/yakhtar/SFMC_Cert

echo.
echo ==========================================
echo   SFMC Certification - Quick GitHub Sync
echo ==========================================
echo.
echo Target Repository: https://github.com/yakhtar/SFMC_Cert
echo.

REM Navigate to project directory
cd /d "C:\Users\akhta\my_projects\sfmc_cert"

REM Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is available
echo.

REM Check if this is a git repository
if not exist ".git" (
    echo 📝 Initializing Git repository...
    git init
    git remote add origin https://github.com/yakhtar/SFMC_Cert.git
) else (
    echo ✅ Git repository detected
    echo 🔄 Updating remote origin...
    git remote set-url origin https://github.com/yakhtar/SFMC_Cert.git
)

echo.
echo 📊 Current repository status:
git status --short

echo.
echo ➕ Adding all changes...
git add .

echo.
echo 💾 Creating commit...
for /f "tokens=2 delims==" %%I in ('wmic OS Get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%:%datetime:~12,2%

git commit -m "sync: SFMC certification progress - %timestamp%

- Updated training materials and progress tracking
- Synchronized with SFMC-NTO-Training-System structure
- Automated sync from Windows environment

Generated on: %COMPUTERNAME% at %timestamp%"

if errorlevel 1 (
    echo ℹ️ No changes to commit or commit failed
    echo.
) else (
    echo ✅ Changes committed successfully
    echo.
)

echo ⬆️ Pushing to GitHub...
echo Repository: https://github.com/yakhtar/SFMC_Cert
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push failed. This might be due to:
    echo   - Authentication issues (need username and Personal Access Token)
    echo   - Network connectivity problems
    echo   - Repository permissions
    echo.
    echo 💡 For authentication, when prompted:
    echo   Username: yakhtar
    echo   Password: [Your Personal Access Token]
    echo.
    echo 🔧 Alternative: Use GitHub CLI for easier authentication:
    echo   gh auth login
    echo.
) else (
    echo.
    echo ✅ Successfully synced to GitHub!
    echo 🌐 View your repository: https://github.com/yakhtar/SFMC_Cert
    echo.
)

echo Press any key to continue...
pause >nul