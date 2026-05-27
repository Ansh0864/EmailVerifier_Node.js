import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResultCard from "../components/ResultCard";
import HistoryList from "../components/HistoryList";
import styles from "./ResultPage.module.css";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Fallback state handler if a user navigates directly to /result URL manually
  if (!state?.data) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.empty}>
          <p>No verification result available to display.</p>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            ← Verify an Email
          </button>
        </div>
      </div>
    );
  }

  const { data, history = [] } = state;
  const otherHistory = history.filter((h) => h.email !== data.email);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            ← Back
          </button>
          <span className={styles.topLabel}>Verification Analysis</span>
        </div>

        <ResultCard data={data} />

        <div className={styles.actions}>
          <button
            className={styles.reverifyBtn}
            onClick={() => navigate("/", { state: { prefill: data.email } })}
          >
            Verify Another Email
          </button>
        </div>

        {otherHistory.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <HistoryList
              items={otherHistory}
              onSelect={(item) =>
                navigate("/result", { state: { data: item, history } })
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}