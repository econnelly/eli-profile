import React from "react";
import SkillsData from "../../_data/skills.json"

type Props = {
    description: string
    skills: [
        skill: Skill
    ]

}

type Skill = {
    name: string
    level: number
}

const generateSkillsBlock = () => {
    return (
        <ul className="skill-bars-fat">
            {SkillsData.types.map((skill) => {
                return (
                    <li key={skill.name}>
                        <div className={`progress`} style={{width: `${skill.level}%`}}/>
                        <strong>{skill.name}</strong>
                    </li>
                )
            })}
        </ul>
    )
}

const Skills = () => {
    return (
        <div className="row s-resume__section">
            <div className="column large-3 tab-12">
                <h3 className="section-header-allcaps">Skills</h3>
            </div>
            <div className="column large-9 tab-12">
                <div className="resume-block">

                    <p dangerouslySetInnerHTML={{__html: SkillsData.description}}/>
                    {generateSkillsBlock()}

                </div>

            </div>
        </div>
    )
}

export default Skills