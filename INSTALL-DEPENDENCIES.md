# 📦 Install GitHub Dependencies - Step by Step Guide
## Required Software for SFMC GitHub Synchronization

### 🎯 **Dependencies Overview**
To run the GitHub sync scripts, you need these tools installed on your Windows machine:

---

## 📥 **1. Git for Windows (Required)**

### **Download and Install:**
1. **Go to**: https://git-scm.com/download/win
2. **Download**: Latest version (64-bit recommended)
3. **Run installer** with these recommended settings:
   - ✅ Use Git from the Windows Command Prompt
   - ✅ Use the native Windows Secure Channel library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use Windows' default console window
   - ✅ Enable Git Credential Manager

### **Verify Installation:**
```cmd
# Open Command Prompt and test
git --version
```
Should show: `git version 2.x.x.windows.x`

---

## 🔧 **2. GitHub CLI (Optional but Recommended)**

### **Download and Install:**
1. **Go to**: https://cli.github.com/
2. **Download**: Windows installer
3. **Run installer** with default settings

### **Authenticate with GitHub:**
```cmd
# After installation, authenticate
gh auth login
```
Follow prompts to authenticate through your browser.

### **Verify Installation:**
```cmd
gh --version
```

---

## 🛠️ **3. PowerShell 5.1+ (Usually Pre-installed)**

### **Check Current Version:**
```powershell
$PSVersionTable.PSVersion
```
Should show version 5.1 or higher.

### **If Outdated, Update:**
- **Windows 10/11**: Usually current
- **Older Windows**: Download PowerShell from Microsoft

---

## ⚙️ **4. Configure Git (Required)**

### **Set Your Identity:**
```bash
# Replace with your actual information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# For your GitHub account specifically:
git config --global user.name "yakhtar"
git config --global user.email "your.github.email@example.com"
```

### **Configure Credential Storage:**
```bash
# Store credentials securely
git config --global credential.helper manager-core
```

---

## 🔐 **5. GitHub Personal Access Token Setup**

### **Create PAT (if you don't have one):**
1. **Go to**: https://github.com/settings/tokens
2. **Click**: "Generate new token (classic)"
3. **Note**: "SFMC Certification Sync"
4. **Expiration**: Choose appropriate timeframe
5. **Scopes**: Select `repo` (Full control of private repositories)
6. **Generate** and **copy the token** (save it securely!)

### **Test Authentication:**
```bash
# Test if you can access your repository
git ls-remote https://github.com/yakhtar/SFMC_Cert.git
```

---

## 🧪 **Verification Checklist**

Run these commands to verify everything is installed:

### **Check Git:**
```cmd
git --version
git config --global user.name
git config --global user.email
```

### **Check GitHub CLI (if installed):**
```cmd
gh --version
gh auth status
```

### **Check PowerShell:**
```powershell
$PSVersionTable.PSVersion
Get-ExecutionPolicy
```

### **Test Repository Access:**
```bash
git ls-remote https://github.com/yakhtar/SFMC_Cert.git
```

---

## 🚀 **Installation Script (Run in PowerShell as Administrator)**

```powershell
# Check if Git is installed
try {
    git --version
    Write-Host "✅ Git is already installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found. Please install from: https://git-scm.com/download/win" -ForegroundColor Red
}

# Check if GitHub CLI is installed
try {
    gh --version
    Write-Host "✅ GitHub CLI is already installed" -ForegroundColor Green
} catch {
    Write-Host "⚠️ GitHub CLI not found. Recommended: https://cli.github.com/" -ForegroundColor Yellow
}

# Check PowerShell version
$psVersion = $PSVersionTable.PSVersion
if ($psVersion.Major -ge 5) {
    Write-Host "✅ PowerShell $($psVersion.Major).$($psVersion.Minor) is sufficient" -ForegroundColor Green
} else {
    Write-Host "❌ PowerShell version too old. Please update." -ForegroundColor Red
}

# Check execution policy
$policy = Get-ExecutionPolicy
Write-Host "ℹ️ Current execution policy: $policy" -ForegroundColor Blue
if ($policy -eq "Restricted") {
    Write-Host "⚠️ Consider running: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
}
```

---

## 📋 **Manual Installation Steps Summary**

### **Step 1: Install Git**
- Download: https://git-scm.com/download/win
- Run installer with recommended settings
- Verify: `git --version`

### **Step 2: Configure Git**
```bash
git config --global user.name "yakhtar"
git config --global user.email "your.email@example.com"
```

### **Step 3: Set Up Authentication**
- Option A: Use GitHub CLI (`gh auth login`)
- Option B: Use Personal Access Token when prompted

### **Step 4: Test Connection**
```bash
git ls-remote https://github.com/yakhtar/SFMC_Cert.git
```

### **Step 5: Run SFMC Sync Script**
```powershell
cd C:\Users\akhta\my_projects\sfmc_cert
.\sync-to-github.ps1
```

---

## 🆘 **Troubleshooting Common Issues**

### **Issue: "git is not recognized"**
**Solution**: 
- Restart Command Prompt/PowerShell after Git installation
- Add Git to PATH manually if needed: `C:\Program Files\Git\bin`

### **Issue: "Execution policy restricted"**
**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Issue: "Authentication failed"**
**Solution**:
- Use your GitHub username and Personal Access Token (not password)
- Ensure PAT has `repo` permissions
- Try GitHub CLI authentication: `gh auth login`

### **Issue: "Repository not found"**
**Solution**:
- Verify repository exists: https://github.com/yakhtar/SFMC_Cert
- Check repository visibility and permissions

---

## ✅ **Ready to Sync Checklist**

Before running the sync script, verify:
- [ ] Git is installed and configured
- [ ] GitHub authentication is set up
- [ ] Repository https://github.com/yakhtar/SFMC_Cert exists and is accessible
- [ ] PowerShell execution policy allows script execution
- [ ] You're in the correct directory: `C:\Users\akhta\my_projects\sfmc_cert`

**Once all dependencies are installed, your sync scripts will work perfectly!** 🎯