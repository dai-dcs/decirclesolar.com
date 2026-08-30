export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <span>DeCircle Solar</span>
            </div>
            <p>
              Whether you&apos;re an EPC firm, an investor, or an owner
              looking to transact — let&apos;s connect and build something
              powerful together.
            </p>
          </div>
          <div>
            <h5>Official Info</h5>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#pillars">Platform</a>
              </li>
              <li>
                <a href="#team">Team</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Platform</h5>
            <ul>
              <li>
                <a href="#pillars">Project Development</a>
              </li>
              <li>
                <a href="#pillars">Project Finance</a>
              </li>
              <li>
                <a href="#pillars">Asset Sales</a>
              </li>
              <li>
                <a href="#pillars">AI &amp; Automation</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Get in Touch</h5>
            <ul>
              <li>A3, Dubai South Business Park, Dubai, UAE</li>
              <li>
                <a href="mailto:care@decirclesolar.com">care@decirclesolar.com</a>
              </li>
              <li>
                <a href="tel:+919652291911">+91 96522 91911</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Copyright © {new Date().getFullYear()} DeCircle Solar DWC LLC.</span>
          <span>
            <a href="#">Privacy Policy</a> &nbsp;·&nbsp;{" "}
            <a href="#">Terms &amp; Conditions</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
