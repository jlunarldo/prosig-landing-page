import { useEffect, useState } from "react";
import styles from "./herofirst.module.css";
import ButtonCall from "../../../../features/ButtonCallTrigger/ButtonCall";

const CLIENTS = [
  "Camp Gladiator",
  "Restore Hyper Wellness",
  "On Tour Tickets",
  "Betenbough",
  "Freespoke",
];

export default function HeroFirst() {
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setDraw(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <>
      <h1 className={styles.display}>
        The senior tech team{" "}
        <em
          className={`${styles.u} ${styles.draw} ${
            draw ? styles.on : ""
          }`}
        >
          you’re missing.
        </em>
      </h1>

      <p className={styles.deck}>
        Fractional CTOs, senior engineers in your time zone, and hires who stay.
      </p>

      <div className={styles.ctas}>
        <ButtonCall
          className={styles.btn}
          text="Book a free 30-min call"
        />
      </div>

      <p className={styles.trust}>
        <span>Trusted by</span> {CLIENTS.join(" · ")}
      </p>
    </>
  );
}