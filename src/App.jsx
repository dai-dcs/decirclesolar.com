import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Pillars from "./components/Pillars";
import Flywheel from "./components/Flywheel";
import LeadershipGlance from "./components/LeadershipGlance";
import Team from "./components/Team";
import Audience from "./components/Audience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

const PAGE_TITLES = {
  "/privacy-policy": "Privacy Policy",
  "/terms-and-conditions": "Terms & Conditions",
};

const HOME_TITLE =
  "DeCircle Solar | Solar Project Development, Finance & Asset Sales — UAE & India";

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash === "" || hash === "/" ? "/" : hash;
}

function useHashRoute() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Pillars />
      <Flywheel />
      <LeadershipGlance />
      <Team />
      <Audience />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  const route = useHashRoute();

  useEffect(() => {
    document.title = PAGE_TITLES[route] ? `${PAGE_TITLES[route]} · DeCircle Solar` : HOME_TITLE;
  }, [route]);

  if (route === "/privacy-policy") return <PrivacyPolicy />;
  if (route === "/terms-and-conditions") return <Terms />;
  return <Home />;
}