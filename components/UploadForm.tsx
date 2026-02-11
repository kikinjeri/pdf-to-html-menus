"use client";

import { useState } from "react";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Conversion failed");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-wrapper">
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          name="file"
          accept="application/pdf"
          className="file-input"
        />

        <button type="submit" disabled={loading} className="upload-button">
          {loading ? "Converting..." : "Upload PDF"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="result-box">
          <h2>Conversion Result</h2>

          <h3>HTML Output</h3>
          <pre className="code-block">{result.html}</pre>

          <h3>CSS Output</h3>
          <pre className="code-block">{result.css}</pre>

          <h3>Schema (JSON‑LD)</h3>
          <pre className="code-block">
            {JSON.stringify(result.schema, null, 2)}
          </pre>

          <h3>Parsed Menu</h3>
          <pre className="code-block">
            {JSON.stringify(result.parsedMenu, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
