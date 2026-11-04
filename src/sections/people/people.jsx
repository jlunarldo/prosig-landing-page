import { useEffect, useRef, useState } from "react";
import SectionGeneric from "../../components/SectionGeneric/SectionGeneric";
import "./people.css";

const portrait = (gender, n) =>
  `https://randomuser.me/api/portraits/${gender}/${n}.jpg`;

const people = [
  { name: "Ryan Neading", role: "CEO", color: "var(--p1)", image: portrait("men", 11) },
  { name: "Nico Martinez", role: "CTO", color: "var(--p1)", image: portrait("men", 22) },
  { name: "Wesley Goldwater", role: "Director of Engineering", color: "var(--p2)", image: portrait("men", 33) },
  { name: "Fernando Torija", role: "Director of Engineering", color: "var(--p3)", image: portrait("men", 44) },
  { name: "Jennie Halcomb", role: "Sr. Agile Coach", color: "var(--p3)", image: portrait("women", 11) },
  { name: "Taylor Kroll", role: "Engineering Manager", color: "var(--p3)", image: portrait("men", 55) },
  { name: "Federico Virkel", role: "Principal PM", color: "var(--p2)", image: portrait("men", 66) },
  { name: "Ana Quevedo", role: "HR & TA Manager", color: "var(--p4)", image: portrait("women", 22) },
  { name: "Mariana Peterossi", role: "Lead Product Designer", color: "var(--p2)", image: portrait("women", 33) },
  { name: "Santiago Lescano", role: "Engineering Manager", color: "var(--p3)", image: portrait("men", 77) },
  { name: "Thiago Antunes", role: "Engineering Manager", color: "var(--p3)", image: portrait("men", 88) },
  { name: "Ezequiel Aranda", role: "QA Manager", color: "var(--p2)", image: portrait("men", 9) },
];

const QUARTER = "M0 0H100A100 100 0 0 0 0 100Z";

function People() {
  const [visible, setVisible] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionGeneric
      id="people"
      eyebrow="The people"
      title="Small team. Senior people."
      highlight="Senior"
    >
      <div
        ref={gridRef}
        className={`people ${visible ? "in" : ""}`.trim()}
      >
        {people.map(({ name, role, color, image }, i) => (
          <article className="person" key={name} style={{ "--i": i }}>
            <div className="person__photo">
              {/*<img src={image} alt={`Portrait of ${name}`} loading="lazy" />*/}
            </div>

            <span className="person__corner" aria-hidden="true">
              <svg viewBox="0 0 100 100" style={{ fill: color }}>
                <path d={QUARTER} />
              </svg>
            </span>

            <h3 className="person__name">{name}</h3>
            <span className="person__role">{role}</span>
          </article>
        ))}
      </div>
    </SectionGeneric>
  );
}

export default People;