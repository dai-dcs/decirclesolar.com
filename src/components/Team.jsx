import { useState } from "react";
import { teamMembers } from "../data/team";

export default function Team() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section bg-grey" id="team">
      <div className="wrap">
        <div className="team-intro">
          <div>
            <div className="eyebrow">Leadership</div>
            <h2
              style={{
                fontSize: "clamp(24px,2.8vw,32px)",
                color: "var(--navy)",
                lineHeight: 1.2,
              }}
            >
              A glimpse of the team behind DeCircle Solar
            </h2>
            <p
              style={{
                color: "var(--ink-70)",
                marginTop: "14px",
                fontSize: "16.1px",
              }}
            >
              Entrepreneurs. Investors. Engineers. AI leaders. Industry
              veterans. A leadership team spanning project development,
              finance, execution and AI — click a card for their full track
              record.
            </p>
          </div>
        </div>

        <div className="team-grid" id="teamGrid">
          {teamMembers.map((m, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                className={`member${isOpen ? " open" : ""}`}
                data-i={i}
                key={m.name}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : i);
                  }
                }}
              >
                <div className="m-top">
                  <div className="m-avatar">{m.initials}</div>
                  <div>
                    <div className="m-name">{m.name}</div>
                    <div className="m-domain">{m.domain}</div>
                  </div>
                </div>
                <p className="m-quote">&quot;{m.quote}&quot;</p>
                <div className="m-tags">
                  {m.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="m-detail">
                  <p>{m.detail}</p>
                  <div className="m-metrics">
                    {m.metrics.map((met) => (
                      <div key={met.label}>
                        <b>{met.value}</b>
                        <span>{met.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="m-toggle">
                  {isOpen ? "Hide profile ↑" : "View profile ↓"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
