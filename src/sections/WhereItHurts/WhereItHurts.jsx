import { useEffect, useRef, useState } from "react";
import SectionGeneric from "../../components/SectionGeneric/SectionGeneric";
import Button from "../../components/Button/Button";

import "./whereithurts.css";

const problems = [
  "Every big technical decision lands on my desk",
  "Our tech costs grow faster than the business",
  "We’re not sure what to build next.",
  "The product is growing and the system won’t keep up",
  "Releases keep slipping",
  "Good engineers are hard to find and keep",
];

const SLOTS = [
  { key: "lead", left: "0%", top: "0%", color: "var(--p1)", rotate: "180deg" },
  { key: "build", left: "50%", top: "0%", color: "var(--p2)", rotate: "270deg" },
  { key: "scale", left: "0%", top: "50%", color: "var(--p3)", rotate: "90deg" },
  { key: "hire", left: "50%", top: "50%", color: "var(--p4)", rotate: "0deg" },
];

const QUARTER = "M0 0H100A100 100 0 0 0 0 100Z";

export default function WhereItHurts() {
  const [visible, setVisible] = useState(false);
  const chipsRef = useRef(null);

  useEffect(() => {
    const el = chipsRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionGeneric
      id="compose"
      eyebrow="Where it hurts"
      title="What's getting in the way?"
      highlight="in the way?"
      backgroundColor="var(--warm)"
      titleMaxWidth="15ch"
    >
      <p className="deck">
        Pick everything that sounds familiar. You don’t need to know the
        solution. That’s our job.
      </p>

      <div className="composer">
        <div
          ref={chipsRef}
          className={`chipCard ${visible ? "in" : ""}`.trim()}
        >
          {problems.map((problem, i) => (
            <button
              className="chip"
              key={problem}
              type="button"
              style={{ "--i": i }}
            >
              {problem}
            </button>
          ))}
        </div>

        <aside className="result" aria-live="polite">
          <div className="result-head">
            <div
              className="stage"
              role="img"
              aria-label="The shape of your team"
            >
              {SLOTS.map(({ key, left, top, color, rotate }) => (
                <div className="slot" key={key} style={{ left, top }}>
                  <svg
                    className="ghost"
                    viewBox="0 0 100 100"
                    style={{ "--c": "none", "--r": rotate }}
                    aria-hidden="true"
                  >
                    <path d={QUARTER} />
                  </svg>
                  <svg
                    className="pc"
                    viewBox="0 0 100 100"
                    style={{ "--c": color, "--r": rotate }}
                    aria-hidden="true"
                  >
                    <path d={QUARTER} />
                  </svg>
                </div>
              ))}
            </div>

            <p className="shape-cap">
              Pick what sounds familiar.
              <br />
              <em>We’ll suggest the rest.</em>
            </p>
          </div>

          <ul className="team in">
            <li className="empty" style={{ "--i": 0 }}>
              Not sure what you need? That’s normal. It’s what the first call
              is for.
            </li>
          </ul>

          <p className="meet"></p>

          <Button className="btn">Talk it through with us</Button>
        </aside>
      </div>
    </SectionGeneric>
  );
}