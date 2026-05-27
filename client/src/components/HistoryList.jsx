import styles from "./Historylist.module.css"; // Match existing lowercase filename

export default function HistoryList({ items, onSelect }) {
  return (
    <div style={{ margin: "2rem 0" }}>
      <h3 style={{ fontSize: "1rem", color: "#94a3b8", marginBottom: "0.75rem" }}>Recent Verifications</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item)}
            style={{
              background: "#1e293b",
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #334155"
            }}
          >
            <span style={{ color: "#f8fafc" }}>{item.email}</span>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: item.result === "valid" ? "#22c55e" : item.result === "invalid" ? "#ef4444" : "#eab308"
            }}>
              {item.result.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}