import React, {useRef} from "react";
import Career from "./career";
import Education from "./education";
import Skills from "./skills";

const Resume = () => {
    const resumeRef = useRef(null)
    return (
        <section id="resume" className="s-resume target-section" ref={resumeRef}>
            <Career/>
            <Education/>
            <Skills />
        </section>
    );
}

export default Resume