import { useEffect, useRef, useState } from "react";
import SectionGeneric from "../../components/SectionGeneric/SectionGeneric";

import styles from "./whyus.module.css";
const COLS = [
  { key: "us", label: "Prosig", short: "Prosig" },
  { key: "inhouse", label: "In-house", short: "In-house" },
  { key: "agency", label: "Offshore agency", short: "Agency" },
  { key: "freelance", label: "Freelancers", short: "Freelance" },
];

const ROWS = [
  ["Time to start", ["good", "Days"], ["weak", "2–4 months"], ["mid", "Weeks"], ["good", "Days"]],
  ["Seniority", ["good", "Senior only"], ["mid", "Depends"], ["weak", "Often junior"], ["mid", "Varies"]],
  ["Your hours", ["good", "Yes"], ["good", "Yes"], ["weak", "8–12h apart"], ["mid", "Varies"]],
  ["If it’s not a fit", ["good", "We replace"], ["weak", "Severance"], ["mid", "Escalations"], ["weak", "Start over"]],
  ["Commitment", ["good", "Monthly"], ["weak", "Full-time"], ["weak", "Long contracts"], ["good", "Per project"]],
];

const LABEL = { good: "Strong", mid: "It depends", weak: "Weak" };

const strongCount = (colIndex) =>
  ROWS.filter((row) => row[colIndex + 1][0] === "good").length;
function WhyUs() {
  const [visible, setVisible] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <SectionGeneric
      id="why-us"
      eyebrow="Why not just hire?"
      title="The speed of a freelancer, the seniority of a great hire."
      highlight="a great hire."
      titleMaxWidth="18ch"
      backgroundColor="var(--page)"
    >
      <div
        ref={tableRef}
        data-stagger=""
        className={`${styles.cmx} ${visible ? styles.in : ""}`.trim()}
        role="table"
        aria-label="Prosig compared with the alternatives"
      >
        <div className={`${styles.row} ${styles.head}`} role="row" style={{ "--i": 0 }}>
          <span className={styles.crit} role="columnheader">
            <span className={styles.sr}>Criteria</span>
          </span>
          {COLS.map((col) => (
            <span
              key={col.key}
              role="columnheader"
              className={col.key === "us" ? styles.us : ""}
            >
              <span className={styles.lg}>{col.label}</span>
              <span className={styles.sh} aria-hidden="true">{col.short}</span>
            </span>
          ))}
        </div>

        {ROWS.map(([criterion, ...cells], r) => (
          <div className={styles.row} role="row" key={criterion} style={{ "--i": r + 1 }}>
            <span className={styles.crit} role="rowheader">
              {criterion}
              <small aria-hidden="true">{cells[0][1]}</small>
            </span>
            {cells.map(([mark, text], c) => (
              <span
                key={c}
                role="cell"
                className={`${styles.cell} ${styles[mark]} ${c === 0 ? styles.us : ""}`.trim()}
              >
                <i aria-hidden="true" />
                <span className={styles.v}>{text}</span>
                <span className={styles.sr}> ({LABEL[mark]})</span>
              </span>
            ))}
          </div>
        ))}

        <div
          className={`${styles.row} ${styles.score}`}
          role="row"
          style={{ "--i": ROWS.length + 1 }}
        >
          <span className={styles.crit} role="rowheader">Strong on</span>
          {COLS.map((col, c) => (
            <span
              key={col.key}
              role="cell"
              className={`${styles.cell} ${c === 0 ? styles.us : ""}`.trim()}
            >
              <b>{strongCount(c)}</b>/{ROWS.length}
            </span>
          ))}
        </div>
      </div>

      <p className={styles.key}>
        <span><i className={styles.good} />Strong</span>
        <span><i className={styles.mid} />It depends</span>
        <span><i className={styles.weak} />Weak</span>
      </p>
    </SectionGeneric>
  );
}

export default WhyUs;
