
import styles from "./prosiglogo.module.css";

export default function ProsigLogo() {
  return (
    <a
      className={styles.logo}
      href="/"
      title="Back to all options"
    >
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M0 120V61.9A137 137 0 0 1 22 32.3V0H120A128 128 0 0 0 30 37V120Z" />
        <path d="M120 0V80H42A82 82 0 0 0 120 0Z" />
      </svg>

      Prosig
    </a>
  );
}
