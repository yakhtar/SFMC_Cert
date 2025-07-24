# 🔰 Complete Beginner's Guide to GitHub Setup
## Step-by-Step Instructions for SFMC Certification Sync

### 👋 **Welcome! You're New to Git/GitHub - That's Perfectly Fine!**

This guide assumes you've never used Git or GitHub before. We'll go **very slowly** with screenshots and explanations for each step.

---

## 📋 **What We're Going to Do**

1. **Install Git** (the tool that talks to GitHub)
2. **Set up your identity** (so Git knows who you are)
3. **Test everything works**
4. **Sync your SFMC materials to GitHub**

**Time needed**: About 15-20 minutes

---

## 🚀 **STEP 1: Install Git for Windows**

### **1.1 Download Git**
1. **Open your web browser** (Chrome, Edge, Firefox, etc.)
2. **Go to this website**: https://git-scm.com/download/win
3. **Click the big blue "Download" button** - it will automatically detect you're using Windows
4. **Wait for download** - the file will be about 47 MB

### **1.2 Install Git**
1. **Find the downloaded file** (usually in your Downloads folder)
   - Look for: `Git-2.xx.x-64-bit.exe`
2. **Double-click the file** to start installation
3. **Click "Yes"** when Windows asks for permission
4. **Follow these choices in the installer**:

   **License Screen**: Click **"Next"**
   
   **Installation Location**: Keep default, click **"Next"**
   
   **Components**: Keep all checkboxes as they are, click **"Next"**
   
   **Start Menu**: Keep default, click **"Next"**
   
   **Default Editor**: Select **"Use Notepad as Git's default editor"**, click **"Next"**
   
   **Branch Name**: Keep **"Let Git decide"**, click **"Next"**
   
   **PATH Environment**: Keep **"Git from the command line and also from 3rd-party software"**, click **"Next"**
   
   **SSH**: Keep **"Use bundled OpenSSH"**, click **"Next"**
   
   **HTTPS**: Keep **"Use the native Windows Secure Channel library"**, click **"Next"**
   
   **Line Endings**: Keep **"Checkout Windows-style, commit Unix-style"**, click **"Next"**
   
   **Terminal**: Keep **"Use Windows' default console window"**, click **"Next"**
   
   **Git Pull**: Keep **"Default (fast-forward or merge)"**, click **"Next"**
   
   **Credential Helper**: Keep **"Git Credential Manager"**, click **"Next"**
   
   **Extra Options**: Keep defaults, click **"Next"**
   
   **Experimental**: Leave unchecked, click **"Install"**

5. **Wait for installation** (about 2-3 minutes)
6. **Click "Finish"** when done

### **1.3 Test Git Installation**
1. **Press Windows key + R**
2. **Type**: `cmd` and press Enter
3. **In the black window that opens, type**: `git --version`
4. **Press Enter**
5. **You should see something like**: `git version 2.43.0.windows.1`

**✅ If you see a version number, Git is installed correctly!**
**❌ If you see "git is not recognized", restart your computer and try again**

---

## 🆔 **STEP 2: Tell Git Who You Are**

Git needs to know your name and email for every change you make.

### **2.1 Open Command Prompt**
1. **Press Windows key + R**
2. **Type**: `cmd` and press Enter

### **2.2 Set Your Name**
1. **Type this command** (replace "Your Name" with your actual name):
   ```
   git config --global user.name "Your Name"
   ```
2. **Press Enter**

**Example**: `git config --global user.name "John Smith"`

### **2.3 Set Your Email**
1. **Type this command** (replace with your email):
   ```
   git config --global user.email "your.email@example.com"
   ```
2. **Press Enter**

**Example**: `git config --global user.email "john.smith@gmail.com"`

### **2.4 Verify Your Settings**
1. **Type**: `git config --global user.name`
2. **Press Enter** - should show your name
3. **Type**: `git config --global user.email`
4. **Press Enter** - should show your email

**✅ If both commands show your correct information, you're ready for the next step!**

---

## 🔐 **STEP 3: Set Up GitHub Authentication**

Since your repository is public, this step is simpler.

### **3.1 Test Repository Access**
1. **In Command Prompt, type**:
   ```
   git ls-remote https://github.com/yakhtar/SFMC_Cert.git
   ```
2. **Press Enter**
3. **You should see a list of references** (like `refs/heads/main`)

**✅ If you see references, your repository is accessible!**
**❌ If you get an error, the repository might not exist yet**

---

## 🧪 **STEP 4: Test Everything Together**

Let's make sure all components work together.

### **4.1 Navigate to Your Project**
1. **In Command Prompt, type**:
   ```
   cd C:\Users\akhta\my_projects\sfmc_cert
   ```
2. **Press Enter**

### **4.2 Check What Files Are There**
1. **Type**: `dir`
2. **Press Enter**
3. **You should see files like**:
   - `sync-to-github.ps1`
   - `SFMC-NTO-Training-System` (folder)
   - Other files we created

**✅ If you see these files, we're ready for the final step!**

---

## 🚀 **STEP 5: Run Your First Sync**

Now the exciting part - uploading your SFMC materials to GitHub!

### **5.1 Run the Sync Script**
1. **Make sure you're still in the project folder** (`C:\Users\akhta\my_projects\sfmc_cert`)
2. **Type this command**:
   ```
   powershell -ExecutionPolicy Bypass -File "sync-to-github.ps1"
   ```
3. **Press Enter**

### **5.2 What You'll See**
The script will show you colored messages like:
```
🚀 SFMC Certification GitHub Sync Script
=================================
📁 Working in: C:\Users\akhta\my_projects\sfmc_cert
📝 Initializing Git repository...
🔗 Adding remote origin...
📊 Checking repository status...
➕ Adding all changes...
💾 Committing changes...
⬆️ Pushing to GitHub...
```

### **5.3 If It Asks for Authentication**
If you see prompts like:
- **Username**: Type `yakhtar`
- **Password**: This is where you'd use your Personal Access Token

### **5.4 Success!**
You should see:
```
✅ Successfully synced to GitHub!
🌐 View your repository: https://github.com/yakhtar/SFMC_Cert
```

---

## 🎉 **STEP 6: Verify It Worked**

### **6.1 Check GitHub**
1. **Open your web browser**
2. **Go to**: https://github.com/yakhtar/SFMC_Cert
3. **You should see all your SFMC files uploaded!**

**Look for**:
- `SFMC-NTO-Training-System/` folder
- `sync-to-github.ps1` file
- `README.md` files
- Your training materials

---

## 🆘 **If Something Goes Wrong**

### **Problem: "git is not recognized"**
**Solution**: 
1. Restart your computer
2. Try the git command again
3. If still not working, reinstall Git

### **Problem: "Execution policy restricted"**
**Solution**: 
1. **Right-click on Command Prompt icon**
2. **Choose "Run as administrator"**
3. **Type**: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
4. **Press Enter**, type `Y`, press Enter again
5. **Try the sync command again**

### **Problem: "Authentication failed"**
**Solution**:
1. Make sure you typed username as `yakhtar`
2. Use your GitHub Personal Access Token (not your GitHub password)
3. If you don't have a token, we can help you create one

### **Problem: "Repository not found"**
**Solution**:
1. Double-check the repository exists at https://github.com/yakhtar/SFMC_Cert
2. Make sure it's public (not private)

---

## ✅ **Success Checklist**

After completing all steps, you should have:
- [ ] Git installed and working (`git --version` shows a version)
- [ ] Your name and email configured in Git
- [ ] Successfully run the sync script
- [ ] Your SFMC materials visible at https://github.com/yakhtar/SFMC_Cert

## 🎯 **What Happens Next?**

**Every time you want to backup your work**:
1. Open Command Prompt
2. Navigate to your project: `cd C:\Users\akhta\my_projects\sfmc_cert`
3. Run: `powershell -ExecutionPolicy Bypass -File "sync-to-github.ps1"`
4. Your latest changes get uploaded to GitHub!

**You've successfully set up GitHub synchronization for your SFMC certification materials!** 🎉

---

## 📞 **Need More Help?**

If you get stuck on any step:
1. **Copy the exact error message**
2. **Tell me which step you're on**
3. **I'll help you solve the specific problem**

Remember: Everyone was a beginner once - you're doing great! 🌟