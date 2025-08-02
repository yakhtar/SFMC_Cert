# PowerShell Script to Convert HTML to PDF using Chrome
# Make sure Chrome is installed on your system

param(
    [string]$InputFile = "enhanced_case_study_presentation.html",
    [string]$OutputFile = "Adobe_Target_Case_Study_Presentation.pdf"
)

# Get the full path of the HTML file
$HtmlPath = Join-Path (Get-Location) $InputFile
$PdfPath = Join-Path (Get-Location) $OutputFile

# Check if HTML file exists
if (Test-Path $HtmlPath) {
    Write-Host "Converting $InputFile to PDF..." -ForegroundColor Green
    
    # Use Chrome to convert HTML to PDF
    $ChromePath = "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe"
    if (Test-Path $ChromePath) {
        & $ChromePath --headless --disable-gpu --print-to-pdf="$PdfPath" --print-to-pdf-no-header --no-margins "file:///$HtmlPath"
        Write-Host "PDF created successfully: $OutputFile" -ForegroundColor Green
    } else {
        Write-Host "Chrome not found. Please install Google Chrome." -ForegroundColor Red
    }
} else {
    Write-Host "HTML file not found: $InputFile" -ForegroundColor Red
}

Read-Host "Press Enter to continue..."