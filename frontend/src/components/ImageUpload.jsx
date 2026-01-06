import React, { useState } from "react";

export default function FontIdentifier() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {
      const res = await fetch("https://font-finder-s6kd.onrender.com/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
        console.error("Error:", err);
        setResult({ error: "Failed to identify font" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🕵️ Font Identifier</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={loading} style={{ marginLeft: "1rem" }}>
        {loading ? "Identifying..." : "Upload"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <p><strong>OCR Text:</strong> {result.ocr_text}</p>
              <p><strong>Matched Font:</strong> {result.matched_font}</p>
              <p><strong>Confidence:</strong> {result.confidence.toFixed(1)}%</p>

              {result.font_url && (
                <>
                  <link
                    href={`https://fonts.googleapis.com/css2?family=${result.matched_font.replace(/ /g, "+")}&display=swap`}
                    rel="stylesheet"
                  />
                  <p><strong>Preview:</strong></p>
                  <p style={{ fontFamily: result.matched_font, fontSize: "1.5rem" }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <a href={result.font_url} target="_blank" rel="noopener noreferrer">
                    🔗 View/Download Font
                  </a>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
