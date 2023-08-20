import React, {useEffect, useState} from "react";
import Modal from 'react-modal'
import ProjectData from "../../_data/projects.json"
import ReactModal from "react-modal";

const Portfolio = () => {
    const projects = ProjectData.projects
    const initialProject: {title: string, image: string, url: string, category: string, description: string} = projects[0]
    const [selectedProject, setSelectedProject] = useState(initialProject)
    const [isOpen, setIsOpen] = useState(false)

    const openModal = (index: number) => {
        setIsOpen(true)
        setSelectedProject(projects[index])

        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        setIsOpen(false)

        document.body.style.overflow = 'unset';
    }

    const customStyles =
        {
            overlay: {
                zIndex: 10,
                backgroundColor: 'rgba(10, 10, 10, 0.75)',
            },
            content: {
                position: "absolute",
                top: "15%",
                bottom: "15%",
                left: "20%",
                right: "20%",
                padding: "1px"
            }
        };

    const reactModalDialog = (project: {title: string, image: string, url: string, category: string, description: string}, modal: string, isOpen: boolean) => {
        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                id={modal}
                style={customStyles}
                contentRef={(r) => {
                    contentRef = r
                }}
            >
                <div className={""}>
                    <div className={""} role="dialog">
                        <div className="">
                            <img className={"h-full object-cover"} src={`assets/images/portfolio/${project.image}`} alt=""/>

                            <div className="modal-popup__desc">
                                <h5 className={"pt-1 pb-2"}>{project.title}</h5>
                                <p className={"pb-2"}>{project.description}</p>
                                <ul className="modal-popup__cat">
                                    <li>{project.category}</li>
                                </ul>
                            </div>

                            <a href={project.url} target={"_blank"} className={"modal-popup__details m-3 p-2"}>Project
                                link</a>
                        </div>
                    </div>
                </div>

            </ReactModal>
        )
    }

    useEffect(() => {
        console.log(`Setting isOpen to ${isOpen}`)
    }, [isOpen])

    let contentRef: HTMLElement | null = null
    return (
        <section id="portfolio" className={"s-portfolio target-section"}>

            <div className="row s-portfolio__header">
                <div className="column large-12">
                    <h3>{ProjectData.description}</h3>
                </div>
            </div>

            <div
                className={"row block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list"}>
                {ProjectData.projects.map((project, i) => {
                        const model = String(i + 1).padStart(2, '0')
                        return (

                            <React.Fragment key={model}>
                                <div className={"column folio-item rounded"}>
                                    <a href={`#`} className={"folio-item__thumb aspect-square"} onClick={(e) => {
                                        e.preventDefault()
                                        console.log("Click detected")
                                        openModal(i)
                                    }}>
                                        <div className={"text-center"}>
                                            {project.title}
                                        </div>
                                        <img className={"h-full object-cover"} src={`assets/images/portfolio/${project.image}`} alt=""/>
                                    </a>
                                </div>

                            </React.Fragment>
                        )
                    }
                )}

                {reactModalDialog(selectedProject, "project-modal", isOpen)}
            </div>

        </section>
    )
}

export default Portfolio;