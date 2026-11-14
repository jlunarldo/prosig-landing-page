
import styles from "./footer.module.css";
import ProsigLogo from "../../components/Logo/ProsigLogo";
export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.wrap}>
        <p className={styles.namenote}>
          <b>Prosig</b> comes from consigliere: the trusted advisor who sits
          at the family table. Someone at your table.
        </p>

        <div className={styles.row}>
          
              <ProsigLogo/>
          <nav aria-label="Footer">
            <a href="mailto:info@prosigliere.com">
              info@prosigliere.com
            </a>
          
            <a
              href="https://www.linkedin.com/company/prosigliere/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>

            <a
              href="https://www.prosigliere.com/join-us"
              target="_blank"
              rel="noopener"
            >
              Careers
            </a>
          </nav>

          <small>© 2026 Prosig Inc. · Austin, TX</small>
        </div>
      </div>
    </footer>
  );
}
