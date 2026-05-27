export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #334155", padding: "2rem", textAlign: "center", color: "#94a3b8", marginTop: "auto" }}>
      <p>© {new Date().getFullYear()} ValidatorPro Inc. All rights reserved.</p>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem", fontSize: "0.875rem" }}>
        <span style={{cursor: "pointer"}}>Privacy Policy</span> | 
        <span style={{cursor: "pointer"}}>Terms of Service</span> | 
        <span style={{cursor: "pointer"}}>Contact Us</span>
      </div>
    </footer>
  );
}