import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import HistoryList from "../components/HistoryList";
import { verifyEmail } from "../utils/api";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prefillValue, setPrefillValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.prefill) setPrefillValue(location.state.prefill);
  }, [location.state]);

  const handleSubmit = async (email) => {
    setLoading(true); setError(null);
    try {
      const data = await verifyEmail(email);
      const updatedHistory = [data, ...history].slice(0, 5);
      setHistory(updatedHistory);
      navigate("/result", { state: { data, history: updatedHistory } });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.heroGlow}></div>
      
      <header className={styles.hero}>
        <div className={styles.badge}>✨ V2.0 IS LIVE — NOW 3X FASTER</div>
        <h1 className={styles.heading}>
          Verify Email Addresses with <br />
          <span className={styles.headingAccent}>Military Precision</span>
        </h1>
        <p className={styles.sub}>
          Clean your mailing lists, prevent hard bounces, and protect your domain reputation using our real-time SMTP and DNS validation engine.
        </p>
      </header>

      <section className={styles.inputSection}>
        <EmailInput onSubmit={handleSubmit} loading={loading} error={error} value={prefillValue} />
      </section>

      {history.length > 0 && (
        <section className={styles.historySection}>
          <HistoryList items={history} onSelect={(item) => navigate("/result", { state: { data: item, history } })} />
        </section>
      )}
    </main>
  );
}