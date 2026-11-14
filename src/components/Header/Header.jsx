import styles from "./header.module.css";
import ButtonCall from "../../features/ButtonCallTrigger/ButtonCall";
import ProsigLogo from "../Logo/ProsigLogo";
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
        <ProsigLogo/>

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