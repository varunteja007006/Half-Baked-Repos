import * as React from "react";
import ContactMe from "./contact-me";
import Certifications from "./certifications";
import Academics from "./academics";
import Experience from "./experience";
import Intro from "./intro";
import Skills from "./skill";
import Projects from "./projects";

export default function Homepage() {
  return (
    <div className="p-2 space-y-20 md:py-3 md:px-10 lg:py-5 lg:px-24 max-w-[1500px] mx-auto">
      {/* sections */}
      <Intro />
      <br />
      <Skills />
      <Experience />
      <Academics />
      <Projects />
      <Certifications />
      <ContactMe />
    </div>
  );
}
