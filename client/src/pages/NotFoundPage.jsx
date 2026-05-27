import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.msg}>The page you are looking for does not exist.</p>
        <button className={styles.homeBtn} onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    </div>
  );
}