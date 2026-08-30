export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div>
          <div className="eyebrow">About DeCircle Solar</div>
          <h2
            style={{
              fontSize: "clamp(24px,2.8vw,32px)",
              color: "var(--navy)",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            A platform for developing, financing and transacting solar assets
          </h2>
          <div className="about-copy">
            <p>
              DeCircle Solar is a Dubai-headquartered renewable infrastructure
              platform connecting developers, investors and businesses across
              the UAE and India. We originate, structure, finance and help
              execute solar projects, increasingly with an AI layer built to
              move deals faster: intelligence, diligence and reporting running
              underneath every project we touch.
            </p>
            <p>
              Registered and operating from Dubai South Business Park, we&apos;re
              positioned to facilitate solar collaborations at scale across
              the region — with growing development activity in Maharashtra,
              Andhra Pradesh, Gujarat and Rajasthan.
            </p>
          </div>
          <div className="chip-row">
            <span className="chip">Solar Project Development</span>
            <span className="chip">Solar Project Finance</span>
            <span className="chip">Solar Asset Sales</span>
            <span className="chip">AI &amp; Automation (DAI)</span>
          </div>
        </div>
        <div className="about-cards">
          <div className="a-card">
            <div>
              <h4>Utility-Scale Solar Development</h4>
              <p>Land, connectivity and SPV structuring</p>
            </div>
            <span className="status active">Active Focus</span>
          </div>
          <div className="a-card">
            <div>
              <h4>Commercial &amp; Industrial Solar</h4>
              <p>C&amp;I and open-access opportunities</p>
            </div>
            <span className="status active">Active Focus</span>
          </div>
          <div className="a-card">
            <div>
              <h4>Solar Project Finance</h4>
              <p>Debt, equity and structured capital for bankable projects</p>
            </div>
            <span className="status active">Active Focus</span>
          </div>
          <div className="a-card">
            <div>
              <h4>AI-Driven Project Intelligence</h4>
              <p>Tender tracking, diligence and analytics</p>
            </div>
            <span className="status progress">Scaling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
