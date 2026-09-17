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
            <h5>Quick Links</h5>
            <ul>
              {/* <li>
                <a href="mailto:care@decirclesolar.com">care@decirclesolar.com</a>
              </li>
              <li>
                <a href="tel:+99638 91911">+91 99638 91911</a>
              </li>
              <li>
                UAE&nbsp;·&nbsp;india
              </li> */}
              <li>
                <span>
                  <a href="#/privacy-policy">Privacy Policy</a> 
                  {/* &nbsp;·&nbsp;{" "} */}
                </span>
              </li>
              <li>
                  <a href="#/terms-and-conditions">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Copyright © {new Date().getFullYear()} DeCircle Solar DWC LLC.</span>

        </div>
      </div>
    </footer>
  );
}
