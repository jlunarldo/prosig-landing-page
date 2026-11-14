
import styles from "./band.module.css";

const results = [
  {
    id: 1,
    value: "$300K",
    description: "saved for a mid-large non-profit",
  },
  {
    id: 2,
    value: "~$1M",
    description: "in a ticketing platform’s first year",
  },
  {
    id: 3,
    value: "[X]",
    description: "[result for a team extension client]",
  },
];

export default function Band() {
  return (
    <section className={styles.band}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>
          What we’ve built together
        </p>

        <blockquote className={styles.pull}>
          “Prosig’s Fractional C-Suite helped us align priorities,
          optimize resources for delivery, and{" "}
          <em>launch our platform.</em>”
        </blockquote>

        <cite className={styles.cite}>
          Lamar Romero, Hire Dragons
        </cite>

        <div className={styles.nums} id="nums" data-stagger>
          {results.map((result, index) => (
            <div
              key={result.id}
              style={{ "--i": index }}
            >
              <b>{result.value}</b>
              <span>{result.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
