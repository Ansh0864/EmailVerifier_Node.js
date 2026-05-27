import { useState, useEffect } from "react";
import styles from "./Emailinput.module.css"; // Match existing lowercase filename

export default function EmailInput({ onSubmit, loading, error, defaultValue }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (defaultValue) setEmail(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) onSubmit(email.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Enter email address to verify..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "0.375rem",
            border: "1px solid #475569",
            background: "#0f172a",
            color: "#fff",
            fontSize: "1rem"
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            background: loading ? "#475569" : "#2563eb",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600"
          }}
        >
          {loading ? "Checking..." : "Verify"}
        </button>
      </div>
      {error && <p style={{ color: "#ef4444", margin: 0, fontSize: "0.875rem" }}>⚠️ {error}</p>}
    </form>
  );
}