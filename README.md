
# 🕵️‍♀️ Font Finder — Identify Fonts from Images

Font Finder is a full-stack web app that helps designers and developers identify fonts from images or screenshots using OCR and the Google Fonts library.

> Upload a font image, extract text, and get matched font suggestions from Google Fonts — complete with live previews and download links.

---

## ✨ Features

- 📸 Upload image or capture via camera (mobile-friendly)
- 🧠 Extracts text using Tesseract OCR
- 🔍 Matches font name using fuzzy logic (RapidFuzz)
- 🔡 Live font preview in matched font style
- 📥 One-click download of Google Fonts
- 🔁 Top 3 closest font matches
- 🗂 Caches fonts locally for speed
- 🌍 Built with React (frontend) + Flask (backend)

---

## 🛠 Tech Stack

| Frontend    | Backend       | Others                     |
|-------------|----------------|-----------------------------|
| React       | Flask (Python) | Tesseract OCR (via pytesseract) |
| Axios       | PIL (Pillow)   | Google Fonts API           |
| JavaScript  | RapidFuzz      | dotenv, CORS, JSON caching |

---

## 📦 Getting Started

### 🔧 Backend Setup

1. Clone the repo:

```bash
git clone https://github.com/yourusername/font-finder.git
cd font-finder/backend
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
venv\Scripts\activate   # Windows
# OR
source venv/bin/activate  # Mac/Linux
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file:

```env
GOOGLE_API_KEY=your_google_fonts_api_key_here
```

5. Run the server:

```bash
python app.py
```

---

### 🌐 Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 📷 Usage

1. Open the app in your browser
2. Upload a screenshot of any font text
3. View extracted text, matched font(s), and live previews
4. Download the closest font from Google Fonts

---

## 🧪 Example Result

```json
{
  "ocr_text": "Montserrat",
  "matches": [
    {
      "font": "Montserrat",
      "confidence": 98.7,
      "font_url": "https://fonts.gstatic.com/..."
    },
    ...
  ]
}
```

---

## 🛡 Security

- API key is safely stored in `.env` (never hardcoded)
- `.env` is excluded via `.gitignore`
- `fonts_cache.json` improves performance but is also ignored

---

## 📄 License

MIT License © 2025 [Jesse Auta]
