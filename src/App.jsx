import FixedBackground from "./components/FixedBackground";
import React, { useState } from "react";

import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import RevealManager from "./components/RevealManager";
import StatsCounter from "./components/StatsCounter";
import LogoMarquee from "./components/LogoMarquee";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Expertise from "./sections/Expertise";
import Process from "./sections/Process";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="app">
      <FixedBackground />
      <Preloader onDone={() => setIntroDone(true)} />
      <SmoothScroll>
        <Cursor />
        <RevealManager />
        <Navbar ready={introDone} />

        <main>
          <Hero start={introDone} />
          <LogoMarquee title="RECENT HIRES & DIGITAL PARTNERS FROM" />
          <About />
          <StatsCounter />
          <Services />
          <Expertise />
          <Process />
          <Projects />
          <Testimonials />
          <CTA />
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  );
}

export default App;