// Vite leverages import.meta.env instead of process.env 
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function verifyEmail(email) {
  const res = await fetch(`${BASE_URL}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Server returned error status: ${res.status}`);
  }

  return res.json();
}