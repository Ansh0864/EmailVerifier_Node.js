import styles from "./ResultPage.module.css"; // Points directly to your existing file

export default function ResultCard({ data }) {
  if (!data) return null;

  const isInvalid = data.result === "invalid";
  const statusColor = isInvalid ? "#ef4444" : data.result === "valid" ? "#22c55e" : "#eab308";

  return (
    <div style={{ background: "#1e293b", border: `1px solid ${statusColor}`, borderRadius: "0.75rem", padding: "1.5rem" }}>
      <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem" }}>
        Result for: <span style={{ color: "#38bdf8" }}>{data.email}</span>
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <p style={{ color: "#94a3b8", margin: "0 0 0.25rem 0" }}>Status</p>
          <span style={{ color: statusColor, fontWeight: "bold", textTransform: "uppercase" }}>{data.result}</span>
        </div>
        <div>
          <p style={{ color: "#94a3b8", margin: "0 0 0.25rem 0" }}>Reason Details</p>
          <span>{data.subresult || "N/A"}</span>
        </div>
        {data.domain && (
          <div>
            <p style={{ color: "#94a3b8", margin: "0 0 0.25rem 0" }}>Evaluated Domain</p>
            <span>{data.domain}</span>
          </div>
        )}
        {data.didYouMean && (
          <div style={{ gridColumn: "span 2", background: "rgba(234, 179, 8, 0.1)", padding: "0.5rem", borderRadius: "0.25rem" }}>
            <span style={{ color: "#eab308" }}>💡 Did you mean: <strong>{data.didYouMean}</strong>?</span>
          </div>
        )}
      </div>
    </div>
  );
}