import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import Footer from "../components/Footer";

const INTERNAL_LINKS = {
  "/privacy-policy": "#/privacy-policy",
  "/terms-and-conditions": "#/terms-and-conditions",
};

function LegalLink({ node: _node, href, children, ...props }) {
  return (
    <a href={href ? INTERNAL_LINKS[href] || href : href} {...props}>
      {children}
    </a>
  );
}

export default function LegalPage({ eyebrow = "Legal", markdown }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="legal">
        <div className="wrap legal-panel">
          <span className="eyebrow">{eyebrow}</span>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: LegalLink }}>
            {markdown}
          </ReactMarkdown>
        </div>
        <div className="wrap">
          <a
            href="#/"
            className="btn btn-ghost back-home"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span aria-hidden="true">←</span> Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}