import { useState } from "react";
import { APP_BASE, createPaste } from "../api/pastes";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState(60);
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await createPaste({
        content,
        ttl_seconds: Number(ttl),
        max_views: maxViews ? Number(maxViews) : undefined,
      });

      setLink(`${APP_BASE}/p/${data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create Paste</h1>

      <textarea
        className="textarea"
        rows={10}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setLink(""); // reset old link on edit
        }}
        placeholder="Paste your text here..."
      />

      <div className="row">
        <div className="field">
          <label>TTL (seconds)</label>
          <input
            type="number"
            min={1}
            value={ttl}
            onChange={(e) => setTtl(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Max Views (optional)</label>
          <input
            type="number"
            min={1}
            value={maxViews}
            onChange={(e) =>
              setMaxViews(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
      </div>

      <button
        className="button"
        onClick={handleSubmit}
        disabled={!content.trim() || loading}
      >
        {loading ? "Generating..." : "Generate Link"}
      </button>

      {error && <p className="error">{error}</p>}

      {link && (
        <p className="link">
          Link:{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
      )}
    </div>
  );
}
