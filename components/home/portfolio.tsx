import React, {useEffect, useState} from "react";
import ProjectData from "../../_data/projects.json"
import Image from "next/image";
import Link from "next/link";

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

    const ProjectModal = (project: {title: string, image: string, url: string, category: string, description: string}) => {
        return (
            <>
                <div
                    className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none project-modal bg-black bg-opacity-75 ease-linear transition-all duration-500"}
                    onClick={(e) => {
                        e.preventDefault()
                        closeModal()
                    }}
                >
                    <div className={"relative w-auto my-6 mx-auto max-w-6xl"} onClick={(e) => {e.preventDefault()}}>
                        {/*content*/}
                        <div className={"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"}>
                            {/*header*/}
                            <div className={"flex items-start justify-between p-0 rounded-t"}>
                                <Image src={`assets/images/portfolio/${project.image}`} alt="" className={"center w-full"} width={400} height={200}/>
                            </div>
                            <div className={"flex items-start justify-between p-5 rounded-t"}>
                                <h3 className={"text-3xl font-semibold"}>
                                    {project.title}
                                </h3>
                            </div>
                            {/*body*/}
                            <div className={"relative p-6 flex-auto"}>
                                <p className={"my-4 text-blueGray-500 text-lg leading-relaxed"}>
                                    {project.description}
                                </p>
                            </div>
                            {/*footer*/}
                            <div className={"flex items-center justify-end px-6 py-2 rounded-b w-full"}>
                                <Link href={"#"} className={"align-left background-transparent font-bold uppercase px-6 py-2 text-base outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"} onClick={(e) => {
                                    e.preventDefault()
                                    closeModal()
                                }}>
                                    Close
                                </Link>
                                <Link href={project.url} target={"_blank"} className={"background-transparent font-bold uppercase px-6 py-2 text-base outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"} >
                                    Project Link
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"opacity-25 fixed inset-0 z-40 bg-black"}></div>
            </>
        )
    }

    useEffect(() => {
        const close = (e:KeyboardEvent) => {
            if(e.key === 'Escape'){
                closeModal()
            }

            console.log({key: e.key, open: isOpen})
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[])

    useEffect(() => {
        console.log(`Setting isOpen to ${isOpen}`)
    }, [isOpen])

    return (
        <section id="portfolio" className={"s-portfolio target-section"}>

            <div className={"row s-portfolio__header"}>
                <div className={"column large-12"}>
                    <h3>{ProjectData.description}</h3>
                </div>
            </div>

            <div
                className={"row block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list"}>
                {ProjectData.projects.map((project, i) => {
                        const model = String(i + 1).padStart(2, '0')
                        return (

                            <React.Fragment key={model}>
                                <div className={"column folio-item"} onMouseOver={(e) => {
                                    console.log("Hover")
                                }} onMouseLeave={(e) => {
                                    console.log("No Hover")
                                }}>
                                    <Link href={`#`} className={"folio-item__thumb aspect-square"} onClick={(e) => {
                                        e.preventDefault()
                                        openModal(i)
                                    }}>

                                        <div className={"text-center s-portfolio-background"}>
                                            {project.title}
                                        </div>
                                        <Image className={"h-full object-cover hover:scale-95 transition"} src={`assets/images/portfolio/${project.image}`} width={300} height={150} alt=""/>
                                    </Link>
                                </div>

                            </React.Fragment>
                        )
                    }
                )}

                {isOpen ? ProjectModal(selectedProject) : null}
            </div>

        </section>
    )
}

export default Portfolio;