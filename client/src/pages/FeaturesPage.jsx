export default function FeaturesPage() {
  const features = [
    { icon: "⚡", title: "Real-time SMTP Checks", desc: "We ping the receiving mail server dynamically to check if the exact mailbox exists without sending an email." },
    { icon: "🛡️", title: "Domain & DNS Validation", desc: "Automatically verifies MX records and domain health to ensure the email host is active and receiving." },
    { icon: "✨", title: "Typo Correction Engine", desc: "Built-in Levenshtein distance algorithms detect misspelled domains (like 'gamil.com') and suggest fixes." },
    { icon: "🗑️", title: "Disposable Email Detection", desc: "Filters out temporary and burner email addresses to keep your lead lists clean and highly valuable." }
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "4rem auto", padding: "0 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Under the Hood</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          ValidatorPro uses a multi-layered approach to guarantee 99.9% accuracy in email verification.
        </p>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{f.icon}</div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{f.title}</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}