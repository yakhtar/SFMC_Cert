# 📋 Manual Execution Guide - Step by Step
## How to Sync Your SFMC Materials to GitHub

### 🎯 **What You Need to Do Outside This Environment**

Since Claude Code cannot execute system commands, you need to run these steps in your Windows environment:

---

## 📝 **Step-by-Step Execution Instructions**

### **Step 1: Open PowerShell**
1. Press `Windows Key + R`
2. Type `powershell` and press Enter
3. Or right-click Start button → "Windows PowerShell"

### **Step 2: Navigate to Your Project**
Copy and paste this into PowerShell:
```powershell
cd C:\Users\akhta\my_projects\sfmc_cert
```

### **Step 3: Check Files Are Present**
```powershell
# List files to confirm everything is there
ls
```
You should see:
- `sync-to-github.ps1`
- `quick-sync.bat`
- `SFMC-NTO-Training-System/` folder
- Other files and folders

### **Step 4: Run the Sync Script**
```powershell
.\sync-to-github.ps1
```

If you get an execution policy error, try:
```powershell
powershell -ExecutionPolicy Bypass -File "sync-to-github.ps1"
```

---

## 🔐 **Authentication When Prompted**

When Git asks for credentials:
- **Username**: `yakhtar`
- **Password**: [Your Personal Access Token]

---

## 📊 **Expected Output**

You should see something like:
```
🚀 SFMC Certification GitHub Sync Script
=================================
📁 Working in: C:\Users\akhta\my_projects\sfmc_cert
📝 Initializing Git repository... (if first time)
🔗 Adding remote origin...
🔐 GitHub Authentication Required
📊 Checking repository status...
➕ Adding all changes...
💾 Committing changes...
⬆️ Pushing to GitHub...
✅ Successfully synced to GitHub!
🌐 View your repository: https://github.com/yakhtar/SFMC_Cert
```

---

## 🚨 **If You Get Errors**

### **Error 1: Execution Policy Restricted**
**Solution**: Run as Administrator or use:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Error 2: Git Not Found**
**Solution**: Install Git from https://git-scm.com/download/win

### **Error 3: Authentication Failed**
**Solution**: 
- Verify your GitHub username is `yakhtar`
- Ensure you're using your Personal Access Token (not password)
- Check token has `repo` permissions

### **Error 4: Repository Doesn't Exist**
**Solution**: The repo exists at https://github.com/yakhtar/SFMC_Cert - check if it's accessible

---

## 🎯 **Alternative: Quick Batch File**

If PowerShell doesn't work, try the batch file:
```cmd
# In Command Prompt
cd C:\Users\akhta\my_projects\sfmc_cert
quick-sync.bat
```

---

## 🔄 **What Happens After Success**

1. All your SFMC training materials will be uploaded to GitHub
2. You can view them at: https://github.com/yakhtar/SFMC_Cert
3. Future syncs will be faster (only uploads changes)
4. Your materials are now backed up and accessible anywhere

---

## 💡 **Tips for Success**

1. **Run from the correct directory**: Make sure you're in `C:\Users\akhta\my_projects\sfmc_cert`
2. **Have your PAT ready**: Keep your Personal Access Token handy for authentication
3. **Check internet connection**: Ensure you can access GitHub
4. **Be patient**: First sync might take a few minutes to upload all files

---

## 🆘 **If You Need Help**

After running the commands, if you get any errors:
1. Copy the exact error message
2. Paste it back in Claude Code
3. I'll help you troubleshoot the specific issue

**The scripts are ready - you just need to execute them in your Windows environment!** 🚀