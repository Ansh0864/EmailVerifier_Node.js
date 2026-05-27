import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.icon}>✉️</span>
          <span className={styles.title}>Validator<span className={styles.accent}>Pro</span></span>
        </Link>
        
        <div className={styles.links}>
          <Link to="/" className={location.pathname === '/' ? styles.active : styles.link}>Home</Link>
          <Link to="/features" className={location.pathname === '/features' ? styles.active : styles.link}>Features</Link>
          <Link to="/pricing" className={location.pathname === '/pricing' ? styles.active : styles.link}>Pricing</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? styles.active : styles.link}>Contact</Link>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.ctaBtn}>Verify Now</Link>
        </div>
      </div>
    </nav>
  );
}