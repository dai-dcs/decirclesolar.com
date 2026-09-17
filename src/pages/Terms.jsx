import LegalPage from "./LegalPage";
import termsMarkdown from "../content/terms-and-conditions.md?raw";

export default function Terms() {
  return <LegalPage eyebrow="Legal" markdown={termsMarkdown} />;
}