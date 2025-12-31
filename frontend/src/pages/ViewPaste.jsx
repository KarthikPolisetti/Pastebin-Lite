import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPaste } from "../api/pastes";

export default function ViewPaste() {
  const { pasteId } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPaste() {
      try {
        const data = await fetchPaste(pasteId);
        if (mounted) setContent(data.content);
      } catch {
        if (mounted) setError("Paste expired or not found");
      }
    }

    loadPaste();
    return () => {
      mounted = false;
    };
  }, [pasteId]);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1 className="title">Paste</h1>
      <pre className="paste-content">{content}</pre>
    </div>
  );
}
