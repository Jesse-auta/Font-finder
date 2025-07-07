import React, { useRef, useState } from "react";
import axios from "axios";

export default function FontIdentifier() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setResult(null);
      setFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/identify-font", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      setResult({ error: "Font matching failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎯 Font Finder</h1>
      <p style={styles.subtitle}>Identify fonts from screenshots or photos</p>

      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {/* Upload Buttons */}
      <div style={styles.buttonGroup}>
        <button onClick={() => fileInputRef.current.click()} style={styles.button}>
          🗂 Upload from Files
        </button>
        <button onClick={() => cameraInputRef.current.click()} style={styles.button}>
          📷 Use Camera
        </button>
      </div>
      {fileName && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.95rem", color: "#666" }}>
          📎 Selected: <strong>{fileName}</strong>
        </p>
      )}


      {/* Upload & Match */}
      <button
        onClick={handleUpload}
        disabled={!image || loading}
        style={{
          ...styles.uploadButton,
          backgroundColor: !image || loading ? "#ccc" : "#4f46e5",
          cursor: !image || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Identifying..." : "Upload & Match"}
      </button>

      {/* Result */}
      {result && (
        <div style={styles.resultBox}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <p><strong>📖 OCR Text:</strong> {result.ocr_text}</p>
              <p><strong>🔤 Matched Font:</strong> {result.matched_font}</p>
              <p><strong>🎯 Confidence:</strong> {result.confidence.toFixed(1)}%</p>

              {/* Load and use the font */}
              <link
                href={`https://fonts.googleapis.com/css2?family=${result.matched_font.replace(/ /g, "+")}&display=swap`}
                rel="stylesheet"
              />
              <div style={{
                fontFamily: result.matched_font,
                fontSize: "1.8rem",
                background: "#f9f9f9",
                borderRadius: "8px",
                padding: "1rem",
                marginTop: "1rem"
              }}>
                The quick brown fox jumps over the lazy dog
              </div>

              {/* Download link */}
              <a
                href={result.font_url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                ⬇️ Download Font
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "2rem",
    background: "#ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    fontFamily: "'Inter', sans-serif",
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "2rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap"
  },
  button: {
    padding: "0.75rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    background: "#f3f4f6",
    cursor: "pointer",
    transition: "0.2s",
  },
  uploadButton: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    transition: "background 0.3s",
  },
  resultBox: {
    marginTop: "2rem",
    textAlign: "left",
    background: "#f5f5f5",
    padding: "1.5rem",
    borderRadius: "10px",
  },
  link: {
    display: "inline-block",
    marginTop: "1rem",
    color: "#4f46e5",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
