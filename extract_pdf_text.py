import pdfplumber

# Change this to your PDF file path
pdf_path = r"SFMC-NTO-Training-System\nto-training-materials\processed-pdfs\MKT101-64.0v1-EN-SG-1-100.pdf"
output_txt = r"extracted_text.txt"

with pdfplumber.open(pdf_path) as pdf:
    all_text = ""
    for page in pdf.pages:
        all_text += page.extract_text() or ""
        all_text += "\n\n--- PAGE BREAK ---\n\n"

with open(output_txt, "w", encoding="utf-8") as f:
    f.write(all_text)

print(f"Text extracted to {output_txt}")