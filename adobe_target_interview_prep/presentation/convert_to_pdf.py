#!/usr/bin/env python3
"""
HTML to PDF Converter using wkhtmltopdf
Install required package: pip install pdfkit wkhtmltopdf
"""

import pdfkit
import os
from pathlib import Path

def convert_html_to_pdf():
    # File paths
    html_file = "enhanced_case_study_presentation.html"
    pdf_file = "Adobe_Target_Case_Study_Presentation.pdf"
    
    # Check if HTML file exists
    if not os.path.exists(html_file):
        print(f"❌ HTML file not found: {html_file}")
        return
    
    # PDF options for better formatting
    options = {
        'page-size': 'A4',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': "UTF-8",
        'no-outline': None,
        'enable-local-file-access': None,
        'print-media-type': None,
        'disable-smart-shrinking': None
    }
    
    try:
        print("🔄 Converting HTML to PDF...")
        pdfkit.from_file(html_file, pdf_file, options=options)
        print(f"✅ PDF created successfully: {pdf_file}")
        print(f"📁 Location: {os.path.abspath(pdf_file)}")
    except Exception as e:
        print(f"❌ Error converting to PDF: {str(e)}")
        print("💡 Make sure wkhtmltopdf is installed: pip install pdfkit wkhtmltopdf")

if __name__ == "__main__":
    convert_html_to_pdf()
    input("Press Enter to continue...")