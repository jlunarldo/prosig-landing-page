import { useEffect, useRef, useState } from "react";
import SectionGeneric from "../../components/SectionGeneric/SectionGeneric";
import "./questions.css";

const questions = [
  {
    question: "What does it cost?",
    answer:
      "Fixed monthly packages, not open-ended hourly billing. [Typical ranges per model, for example a senior engineer from $X per month and a fractional CTO from $X per month.]",
  },
  {
    question: "How many hours do we share?",
    answer:
      "Our engineers work your hours. Latin America is 0 to 3 hours from US time zones, so you get [6 to 8] shared working hours a day.",
  },
  {
    question: "How good is their English?",
    answer:
      "Everyone is interviewed in English and works directly with your team in standups, Slack and calls. [Confirm the English level we require.]",
  },
  {
    question: "How do you vet people?",
    answer:
      "[Technical interviews, a live exercise, references and a culture interview. Confirm the actual steps.] We only place senior people.",
  },
  {
    question: "Who owns the code?",
    answer: "You do. [Confirm the IP assignment terms in our contracts.]",
  },
  {
    question: "What if someone isn’t the right fit?",
    answer: "Tell us and we replace them [at no cost, within X days. Confirm.]",
  },
  {
    question: "Do we need a long-term contract?",
    answer:
      "No. No long-term contracts or hidden fees. Scale up or down as you need.",
  },
  {
    question: "How fast can you start?",
    answer:
      "[Typical time to start.] Many engineers are pushing code in their first week.",
  },
];

export default function Questions() {
  const [visible, setVisible] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionGeneric
      id="questions"
      eyebrow="Questions"
      title="Questions we often hear."
      highlight="hear."
      backgroundColor="var(--warm)"
    >
      <div
        ref={listRef}
        className={`questions__list ${visible ? "in" : ""}`.trim()}
      >
        {questions.map((item, i) => (
          <details
            className="questions__item"
            key={item.question}
            style={{ "--i": i }}
          >
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionGeneric>
  );
}