const steps = [
  {
    num: "01",
    title: "Originate",
    text: "Identify land, tenders, projects and opportunities across the UAE–India corridor.",
  },
  {
    num: "02",
    title: "Structure",
    text: "Feasibility, SPV formation, commercial structure and documentation.",
  },
  {
    num: "03",
    title: "Finance",
    text: "Debt, equity and institutional capital brought in against a bankable structure.",
  },
  {
    num: "04",
    title: "Execute",
    text: "EPC coordination, procurement and project delivery through to commissioning.",
  },
  {
    num: "05",
    title: "Transact",
    text: "Asset sale, acquisition, refinancing or monetization when the timing is right.",
  },
  {
    num: "06",
    title: "Recycle Capital",
    text: "Proceeds return into the next generation of projects, closing the loop.",
  },
];

export default function Flywheel() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">How We Operate</div>
          <h2>From opportunity to asset</h2>
          <p>
            DeCircle Solar doesn&apos;t simply connect parties — we move
            transactions forward, stage by stage, until capital returns for
            the next generation of projects.
          </p>
        </div>
        <div className="wheel-grid">
          {steps.map((s) => (
            <div className="wheel-step" key={s.num}>
              <div className="wheel-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="wheel-footnote">
          The intelligence layer runs underneath all six stages — screening,
          diligence and reporting throughout.
        </div>
      </div>
    </section>
  );
}
