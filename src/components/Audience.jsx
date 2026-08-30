const items = [
  "Project Developers",
  "Investors & Family Offices",
  "Asset Owners",
  "EPC & Technology Partners",
];

export default function Audience() {
  return (
    <section className="section bg-grey">
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: "24px" }}>
          <div className="eyebrow">Who We Work With</div>
          <h2>Built for the people moving renewable assets forward</h2>
        </div>
        <div className="audience-row">
          {items.map((item) => (
            <div className="audience-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
