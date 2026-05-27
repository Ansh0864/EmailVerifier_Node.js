import styles from "./Howitworks.module.css"; // Match existing lowercase filename

export default function HowItWorks() {
  return (
    <div style={{ marginTop: "4rem", borderTop: "1px solid #334155", paddingTop: "2rem" }}>
      <h3 style={{ textAlign: "center", color: "#94a3b8", marginBottom: "1.5rem" }}>Verification Checks Performed</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", color: "#94a3b8", fontSize: "0.875rem" }}>
        <div>
          <strong style={{ color: "#fff" }}>1. Syntax Verification</strong>
          <p>Checks regex, length bounds, double dots, and conforming formatting specifications.</p>
        </div>
        <div>
          <strong style={{ color: "#fff" }}>2. MX Record Lookup</strong>
          <p>Queries DNS servers directly to identify target mail servers capable of accepting inbound mail.</p>
        </div>
      </div>
    </div>
  );
}