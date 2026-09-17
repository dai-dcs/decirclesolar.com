import LegalPage from "./LegalPage";
import privacyMarkdown from "../content/privacy-policy.md?raw";

export default function PrivacyPolicy() {
  return <LegalPage eyebrow="Legal" markdown={privacyMarkdown} />;
}