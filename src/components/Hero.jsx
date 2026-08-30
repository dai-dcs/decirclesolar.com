export default function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-sky"></div>
          <div className="hero-glow"></div>
          <div className="hero-ground">
            <div className="hero-grid"></div>
          </div>
          <svg
            className="hero-towers"
            viewBox="0 0 220 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="rgba(255,255,255,.5)" strokeWidth="1.4" fill="none">
              <path d="M40 160 L55 60 L70 160"></path>
              <path d="M45 90 L65 90 M42 115 L68 115 M48 70 L62 70"></path>
              <path d="M140 160 L152 40 L164 160"></path>
              <path d="M144 75 L160 75 M141 105 L163 105 M147 55 L157 55"></path>
              <path d="M55 60 L152 40" strokeDasharray="3 4"></path>
            </g>
          </svg>
          <div className="hero-overlay"></div>
          <div className="hero-vignette"></div>
        </div>
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="dot"></span> Renewable Infrastructure Platform ·
              UAE &amp; India
            </div>
            <h1 className="hero-h">
              Building the next generation of <em>solar energy assets</em>
            </h1>
            <p className="hero-sub">
              DeCircle Solar develops, finances and transacts solar projects
              across the UAE–India corridor — pairing on-the-ground execution
              with an AI layer that speeds up diligence, underwriting and deal
              flow.
            </p>
            <div className="hero-cta">
              <a href="#pillars" className="btn btn-primary">
                Explore the Platform
              </a>
              <a href="#contact" className="btn btn-ghost">
                Talk to DCS
              </a>
            </div>
            <div className="hero-stats">
              <div className="hstat">
                <b>2 GW+</b>
                <span>Delivered across leadership&apos;s combined careers</span>
              </div>
              <div className="hstat">
                <b>$5 Bn+</b>
                <span>Transactions across leadership experience</span>
              </div>
              <div className="hstat">
                <b>150+ Years</b>
                <span>Combined leadership experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="wrap">
          <div className="marquee">
            <span>Solar Project Development</span>
            <span>Solar Project Finance</span>
            <span>Solar Asset Sales</span>
            <span>AI &amp; Automation</span>
            <span>Solar Project Development</span>
            <span>Solar Project Finance</span>
            <span>Solar Asset Sales</span>
            <span>AI &amp; Automation</span>
          </div>
        </div>
      </div>
    </>
  );
}
