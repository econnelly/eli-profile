import React from "react";
import Career from "./career";
import Education from "./education";
import Skills from "./skills";

const Resume = () => {
    return (
        <section id="resume" className="s-resume target-section">
            <Career/>
            <Education/>
            <Skills />
        </section>
    );
}

export default Resume