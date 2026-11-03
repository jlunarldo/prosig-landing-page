import styles from "./header.module.css";
import ButtonCall from "../../features/ButtonCallTrigger/ButtonCall";

const navbarLinks = [
  { id: 1, title: "Where it hurts", href: "#wih" },
  { id: 2, title: "Why us", href: "#why-us" },
  { id: 3, title: "People", href: "#people" },
  { id: 4, title: "Questions", href: "#questions" },
];

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <a href="/" className={styles.logo} title="Back to all options">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <path d="M0 120V61.9A137 137 0 0 1 22 32.3V0H120A128 128 0 0 0 30 37V120Z" />
            <path d="M120 0V80H42A82 82 0 0 0 120 0Z" />
          </svg>
          Prosig
        </a>

        <nav className={styles.nav} aria-label="Main">
          {navbarLinks.map(({ id, title, href }) => (
            <a key={id} href={href}>
              {title}
            </a>
          ))}
        </nav>

        <ButtonCall className={styles.btn} />
      </div>
    </header>
  );
};

export default HeaderComponent;