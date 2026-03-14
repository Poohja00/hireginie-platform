"""
resume_parser.py

This file reads resume files and extracts useful information.

Supported formats:
PDF
DOCX

The goal is to convert resume files into readable text
so our ATS can analyze them.
"""

import pdfplumber
import docx


# ---------------------------------------------------------
# FUNCTION: EXTRACT TEXT FROM PDF
# ---------------------------------------------------------

def extract_text_from_pdf(file_path):

    text = ""

    # Open PDF file
    with pdfplumber.open(file_path) as pdf:

        # Loop through all pages
        for page in pdf.pages:
            text += page.extract_text() or ""

    return text


# ---------------------------------------------------------
# FUNCTION: EXTRACT TEXT FROM DOCX
# ---------------------------------------------------------

def extract_text_from_docx(file_path):

    doc = docx.Document(file_path)

    text = ""

    # Loop through paragraphs
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"

    return text


# ---------------------------------------------------------
# FUNCTION: READ RESUME FILE
# ---------------------------------------------------------

def parse_resume(file_path):

    """
    Detect file type and extract text accordingly.
    """

    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)

    elif file_path.endswith(".docx"):
        return extract_text_from_docx(file_path)

    else:
        return "Unsupported file format"