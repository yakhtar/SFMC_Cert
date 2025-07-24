# ✅ Quick Start Checklist - GitHub Setup
## Simple Step-by-Step for Beginners

### 🎯 **Your Mission**: Get your SFMC files onto GitHub

---

## 📋 **Step 1: Install Git (5 minutes)**

### **Do This:**
1. **Open browser** → Go to: https://git-scm.com/download/win
2. **Click blue "Download" button**
3. **Run the downloaded file** (Git-2.xx.x-64-bit.exe)
4. **Keep clicking "Next"** through all screens (defaults are fine)
5. **Click "Install"** and wait
6. **Click "Finish"**

### **Test It:**
1. **Press Windows + R** → Type `cmd` → Press Enter
2. **Type**: `git --version` → Press Enter
3. **Should see**: `git version 2.xx.x`

**✅ Working? Continue to Step 2**
**❌ Not working? Restart computer and test again**

---

## 📋 **Step 2: Tell Git Your Name (2 minutes)**

### **Do This:**
1. **In Command Prompt (the black window), type these commands**:
   ```
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
   *(Replace with your actual name and email)*

### **Test It:**
1. **Type**: `git config --global user.name` → Should show your name
2. **Type**: `git config --global user.email` → Should show your email

**✅ Shows your info? Continue to Step 3**

---

## 📋 **Step 3: Navigate to Your Project (1 minute)**

### **Do This:**
1. **In Command Prompt, type**:
   ```
   cd C:\Users\akhta\my_projects\sfmc_cert
   ```
2. **Press Enter**

### **Test It:**
1. **Type**: `dir` → Press Enter
2. **Should see files like**: `sync-to-github.ps1`, `SFMC-NTO-Training-System`

**✅ See the files? Continue to Step 4**

---

## 📋 **Step 4: Run the Magic Command (2 minutes)**

### **Do This:**
1. **Copy and paste this exact command**:
   ```
   powershell -ExecutionPolicy Bypass -File "sync-to-github.ps1"
   ```
2. **Press Enter**

### **What You'll See:**
- Lots of colored text with emojis
- Messages about "adding files", "committing", "pushing"
- May ask for username: Type `yakhtar`
- May ask for password: Use your GitHub Personal Access Token

### **Success Looks Like:**
```
✅ Successfully synced to GitHub!
🌐 View your repository: https://github.com/yakhtar/SFMC_Cert
```

---

## 📋 **Step 5: Verify Success (1 minute)**

### **Do This:**
1. **Open browser**
2. **Go to**: https://github.com/yakhtar/SFMC_Cert
3. **Look for your files**:
   - SFMC-NTO-Training-System folder
   - Various .md files
   - Your training materials

**✅ See your files on GitHub? SUCCESS! 🎉**

---

## 🚨 **Common Problems & Quick Fixes**

### **Problem**: "git is not recognized"
**Fix**: Restart computer, try again

### **Problem**: "Execution policy restricted"  
**Fix**: 
1. Right-click Command Prompt → "Run as administrator"
2. Type: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Type `Y` → Press Enter

### **Problem**: "Authentication failed"
**Fix**: 
- Username: `yakhtar`
- Password: Your GitHub Personal Access Token (not your GitHub password)

### **Problem**: Script shows errors
**Fix**: Copy the error message and ask for help

---

## 🎯 **Total Time**: About 10-15 minutes

## 🏆 **When You're Done**:
- Your SFMC certification materials are backed up on GitHub
- You can access them from anywhere
- They're safe even if your computer crashes
- You can sync new changes anytime by running Step 4 again

## 📞 **Need Help?**
If any step doesn't work:
1. **Don't panic!** 😊
2. **Copy the exact error message**
3. **Tell me which step failed**
4. **I'll help you fix it**

**You've got this!** 💪