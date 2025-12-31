export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

export const APP_BASE =
  import.meta.env.VITE_APP_URL || window.location.origin;

export async function fetchPaste(id) {
  const res = await fetch(`${API_BASE}/api/pastes/${id}`);

  if (!res.ok) {
    throw new Error("Paste not found");
  }

  return res.json();
}

export async function createPaste(payload) {
  const res = await fetch(`${API_BASE}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create paste");
  }

  return res.json();
}
