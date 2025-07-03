import requests
import pytesseract
from rapidfuzz import process
from PIL import Image
import json
import os

API_KEY = "AIzaSyBnCSWfPHtLHKX7G6xVXkcPDc_XkatWdpg"

CACHE_FILE = "fonts_cache.json"

def fetch_google_fonts():
    # Check cache first
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r") as f:
            cached = json.load(f)
            return cached["fonts"], cached["font_links"]

    url = f"https://www.googleapis.com/webfonts/v1/webfonts?key={API_KEY}"
    res = requests.get(url)

    if res.status_code != 200:
        print("Failed to fetch Google Fonts:")
        print("Status code:", res.status_code)
        print("Response text:", res.text)
        raise Exception("Google Fonts API error")

    try:
        data = res.json()
    except json.JSONDecodeError:
        print("Failed to parse JSON from Google Fonts API")
        print("Raw response:", res.text)
        raise

    fonts = [item["family"] for item in data["items"]]
    font_links = {item["family"]: item["files"].get("regular") for item in data["items"]}

    # Save to cache
    with open(CACHE_FILE, "w") as f:
        json.dump({"fonts": fonts, "font_links": font_links}, f)

    return fonts, font_links


def identify_font(image: Image.Image):
    text = pytesseract.image_to_string(image, config="--psm 6").strip()
    fonts, font_links = fetch_google_fonts()

    match, score, _ = process.extractOne(text, fonts)
    return {
        "ocr_text": text,
        "matched_font": match,
        "confidence": score,
        "font_url": font_links.get(match)
    }
