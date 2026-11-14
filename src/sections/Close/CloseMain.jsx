import styles from "./closemain.module.css";
import ButtonCall from "../../features/ButtonCallTrigger/ButtonCall";
export default function CloseMain() {
  return (
    <section className={`${styles.sec} ${styles.close}`} id="end">
      <div className={styles.seatshape} id="seatshape" aria-hidden="true">
        <svg
          className={styles.pc}
          viewBox="0 0 100 100"
          style={{
            "--c": "var(--p1)",
            "--r": "180deg",
            left: 0,
            top: 0,
          }}
          
          aria-hidden="true"
        >
          <path d="M0 0H100A100 100 0 0 0 0 100Z"></path>
        </svg>

        <svg
          className={styles.pc}
          viewBox="0 0 100 100"
          style={{
            "--c": "var(--p2)",
            "--r": "270deg",
            right: 0,
            top: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0 0H100A100 100 0 0 0 0 100Z"></path>
        </svg>

        <svg
          className={styles.pc}
          viewBox="0 0 100 100"
          style={{
            "--c": "var(--p3)",
            "--r": "90deg",
            left: 0,
            bottom: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0 0H100A100 100 0 0 0 0 100Z"></path>
        </svg>

        <svg
          className={styles.gh}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <path d="M0 0H100A100 100 0 0 0 0 100Z"></path>
        </svg>

        <svg
          className={`${styles.pc} ${styles.you}`}
          viewBox="0 0 100 100"
          style={{
            "--c": "var(--p4)",
            "--r": "0deg",
            right: 0,
            bottom: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0 0H100A100 100 0 0 0 0 100Z"></path>
        </svg>
      </div>

      <h2 className={styles.title}>
        There’s a seat <em>for you.</em>
      </h2>

      <p className={styles.deck}>
        A free 30-minute call with one of our leaders. A clear plan in days.
        Many teams are pushing code in week one.
      </p>
      <ButtonCall className={ styles.btn} text="Book a free 30-min call"
      >
        
      </ButtonCall >
    </section>
  );
}