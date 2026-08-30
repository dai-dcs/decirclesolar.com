const rows = [
  {
    label: "Global Institutions",
    value:
      "Stanford · ESCP Paris · IIM Bangalore · IIM Shillong · SPJIMR · IIT Delhi · VIT Vellore",
  },
  {
    label: "Renewable Experience",
    value: "2 GW+ delivered across leadership's combined careers",
  },
  { label: "Leadership Experience", value: "150+ years combined" },
  {
    label: "Capital Markets",
    value: "Fundraising, debt structuring & institutional finance",
  },
  {
    label: "Infrastructure",
    value: "EPC, project development & utility-scale execution",
  },
  {
    label: "AI & Automation",
    value: "AI-first execution platform powered by technology",
  },
  {
    label: "Global Exposure",
    value: "India · UAE · USA · Europe · Singapore · Thailand · China",
  },
  { label: "Entrepreneurship", value: "Founders & operators — not just advisors" },
];

export default function LeadershipGlance() {
  return (
    <section className="section glance-wrap">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Leadership at a Glance</div>
          <h2>A multidisciplinary team, built for infrastructure</h2>
          <p>
            Entrepreneurial execution, institutional finance, AI and
            utility-scale renewable delivery — brought together on one team.
          </p>
        </div>
        <div>
          {rows.map((r) => (
            <div className="glance-row" key={r.label}>
              <b>{r.label}</b>
              <span>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
