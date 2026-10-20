const expertise = [
  {
    number: "01",
    title: "Digital Strategy",
    text: "Direction that connects business goals with meaningful digital experiences.",
  },
  {
    number: "02",
    title: "Brand Experience",
    text: "Digital touchpoints that turn identity into a consistent experience.",
  },
  {
    number: "03",
    title: "UI/UX",
    text: "Interfaces and journeys designed around clarity, usability and intent.",
  },
  {
    number: "04",
    title: "Web Development",
    text: "Responsive, scalable and performance-minded digital foundations.",
  },
  {
    number: "05",
    title: "Motion & Interaction",
    text: "Purposeful movement that gives digital products character.",
  },
  {
    number: "06",
    title: "Digital Products",
    text: "End-to-end thinking for products built to solve real problems.",
  },
  {
    number: "07",
    title: "Mobile Experiences",
    text: "Mobile-first experiences designed for natural everyday interaction.",
  },
  {
    number: "08",
    title: "Performance & SEO",
    text: "Fast, discoverable experiences built for people and search engines.",
  },
];

const Expertise = () => {
  return (
    <section id="expertise" className="expertise section">
      <div className="container">
        <div className="expertise__top">
          <p className="eyebrow eyebrow--gold" data-reveal>
            03 / EXPERTISE
          </p>
          <p data-reveal>
            The thinking, design and technology behind the work.
          </p>
        </div>

        <h2 className="expertise__heading">
          <span data-line data-reveal>
            <span data-line-inner>Built where</span>
          </span>
          <span data-line data-reveal>
            <span data-line-inner>
              <em>ideas</em> meet
            </span>
          </span>
          <span data-line data-reveal>
            <span data-line-inner>technology.</span>
          </span>
        </h2>

        <div className="expertise__list" data-reveal-stagger>
          {expertise.map((item) => (
            <article className="expertise__item" key={item.number}>
              <span className="num">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="expertise__plus" aria-hidden="true">
                +
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
