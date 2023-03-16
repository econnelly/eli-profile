import React from "react";
import CareerData from "../../_data/career.json"

const generateCareer = () => {
    return(
        <div className="column large-9 tab-12">
            {CareerData.map((item) => {
                return (
                    <div className="resume-block" key={item.company}>

                        <div className="resume-block__header">
                            <h4 className="h3">{item.company}</h4>
                            <p className="resume-block__header-meta">
                                <span>{item.role}</span>
                                <span className="resume-block__header-date">
                                {item.start} - {item.end}
                            </span>
                            </p>
                        </div>

                        <p>
                            {item.description}
                        </p>

                    </div>
                )
            })}

        </div>

    )
}

const Career = () => {
    return (
        <div className="row s-resume__section">
            <div className="column large-3 tab-12">
                <h3 className="section-header-allcaps">Career</h3>
            </div>
            {generateCareer()}
        </div>
    )
}

export default Career