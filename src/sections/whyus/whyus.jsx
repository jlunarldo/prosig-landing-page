
import SectionGeneric from "../../components/SectionGeneric/SectionGeneric";

import "./whyUs.css";

const benefits = [
  {
    icon: "✳",
    title: "Senior expertise",
    description: "Experienced technical leaders who can guide your team and make the right decisions.",
  },
  {
    icon: "◷",
    title: "Your time zone",
    description: "Work directly with people who can collaborate with your team in real time.",
  },
  {
    icon: "↗",
    title: "Built to last",
    description: "Get the right people and build a team that grows with your business.",
  },
];

function WhyUs() {
  return (
    <SectionGeneric
      id="why-us"
      eyebrow="WHY NOT JUST HIRE?"
      title="The speed of a freelancer, the seniority of a great hire."
      highlight="a great hire."
      description="We combine technical leadership, senior engineering and a practical approach to building great products."
      theme="white"
    >

      <div className="why-us__grid">

        {benefits.map((benefit) => (
          <article className="why-us__card" key={benefit.title}>

            <span className="why-us__icon">
              {benefit.icon}
            </span>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>

          </article>
        ))}

      </div>

    </SectionGeneric>
  );
}

export default WhyUs;
