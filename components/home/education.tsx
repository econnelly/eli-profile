import React from "react";
import EducationData from "../../_data/education.json"

const generateEducationBlock = () => {
    return (
        <>
            {EducationData.map((item) => {
                return (
                    <div className="resume-block" key={item.school}>

                        <div className="resume-block__header">
                            <h4 className="h3">{item.school}</h4>
                            <p className="resume-block__header-meta">
                                <span>{item.degree}</span>
                                <span className="resume-block__header-date">
                                {item.year}
                            </span>
                            </p>
                        </div>

                        <p dangerouslySetInnerHTML={{__html: item.description}}/>

                    </div>
                )
            })}
        </>

    )
}
const Education = () => {
    return (
        <div className="row s-resume__section">
            <div className="column large-3 tab-12">
                <h3 className="section-header-allcaps">Education</h3>
            </div>
            <div className="column large-9 tab-12">
                {generateEducationBlock()}
            </div>
        </div>
    )
}

export default Education