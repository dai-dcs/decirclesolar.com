export default function Pillars() {
  return (
    <section className="section bg-grey" id="pillars">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">The Platform</div>
          <h2>
            Development. Capital. Transactions.
            <br />
            One connected platform.
          </h2>
          <p>
            We&apos;ve deliberately kept our focus tight — project development,
            project finance and asset sales — with an intelligence layer
            running underneath all three, rather than sitting on top as an
            afterthought.
          </p>
        </div>

        <div className="platform-flow">
          <div className="pillar">
            <span className="tag">SPD</span>
            <h3>Solar Project Development</h3>
            <p>
              We identify, aggregate and structure solar projects from
              opportunity through SPV-ready status.
            </p>
            <ul>
              <li>Land identification &amp; connectivity feasibility</li>
              <li>SPV structuring &amp; project documentation</li>
              <li>Utility-scale, C&amp;I and open-access projects</li>
            </ul>
            <div className="flow">Originate → Structure → Develop</div>
            <p style={{ fontSize: "13.4px", color: "var(--ink-50)", marginTop: "2px" }}>
              For developers, landowners &amp; investors initiating projects
              in the UAE or India.
            </p>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="pillar">
            <span className="tag">SPF</span>
            <h3>Solar Project Finance</h3>
            <p>
              We connect bankable projects with debt, equity and
              institutional capital, with financial modelling and
              underwriting managed end-to-end.
            </p>
            <ul>
              <li>Financial modelling, IRR &amp; DSCR analysis</li>
              <li>Debt from banks, NBFCs &amp; institutional lenders</li>
              <li>Equity from HNIs, family offices &amp; investors</li>
            </ul>
            <div className="flow">Projects → Capital → Financial Close</div>
            <p style={{ fontSize: "13.4px", color: "var(--ink-50)", marginTop: "2px" }}>
              For developers &amp; investors needing debt, equity or
              financial-closure support.
            </p>
          </div>
          <div className="flow-arrow flow-execute" aria-hidden="true">
            <span>Execute</span>→
          </div>
          <div className="pillar">
            <span className="tag">SAS</span>
            <h3>Solar Asset Sales</h3>
            <p>
              We run acquisition, divestment and monetization of operating
              and development-stage renewable assets.
            </p>
            <ul>
              <li>Buyer &amp; investor identification</li>
              <li>Asset valuation &amp; transaction support</li>
              <li>Institutional investor &amp; IPP engagement for exits</li>
            </ul>
            <div className="flow">Assets → Investors → Transactions</div>
            <p style={{ fontSize: "13.4px", color: "var(--ink-50)", marginTop: "2px" }}>
              For asset owners &amp; investors looking to acquire, divest or
              monetize solar assets.
            </p>
          </div>
        </div>

        <div className="dai-band">
          <div className="dai-band-inner">
            <span className="dai-tag">DAI</span>
            <div>
              <h4>An intelligence layer embedded across the platform</h4>
              <p>
                Diligence, underwriting support, project intelligence and
                reporting are embedded across development, finance and asset
                sales — built into how DCS operates, not offered as a
                separate product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
