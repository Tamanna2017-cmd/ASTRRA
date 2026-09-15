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
    text: "Purposeful movement and interaction that give digital products character.",
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
    <section id="expertise" className="astrra-expertise" data-section="expertise">
      <div className="astrra-expertise__container">
        <div className="astrra-expertise__top" data-animate="heading">
          <div className="astrra-expertise__eyebrow">
            <span className="astrra-expertise__eyebrow-line" />
            <span>03 / EXPERTISE</span>
          </div>

          <p>
            The thinking, design and technology behind the work.
          </p>
        </div>

        <div className="astrra-expertise__hero">
          <h2 data-animate="heading">
            Built where
            <br />
            <em>ideas</em> meet
            <br />
            technology.
          </h2>
        </div>

        <div className="astrra-expertise__list" data-animate="list">
          {expertise.map((item) => (
            <article
              className="astrra-expertise__item"
              key={item.number}
              data-animate="expertise-item"
            >
              <span className="astrra-expertise__number">{item.number}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <span className="astrra-expertise__plus" aria-hidden="true">
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
