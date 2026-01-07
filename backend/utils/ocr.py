import pytesseract
from PIL import Image


def extract_text(image_path):
    pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    print("Extracted text", text)
    return text.strip()


