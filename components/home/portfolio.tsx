import React, {useState} from "react";
import Modal from 'react-modal'
import ProjectData from "../../_data/projects.json"
import ReactModal from "react-modal";

const Portfolio = () => {
    const openArray = new Array(ProjectData.projects.length).fill(false);
    const [isOpen, setIsOpen] = useState(openArray)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const openModal = (index: number, onDialogOpen: () => any) => {
        const o = ProjectData.projects.map((p, i) => {
            return i === index;
        })

        setIsOpen(o)

        document.body.style.overflow = 'hidden';

        onDialogOpen()
    }

    const closeModal = () => {
        const o = new Array(ProjectData.projects.length).fill(false);
        setIsOpen(o)

        document.body.style.overflow = 'unset';
    }

    // ReactModal.setAppElement("#portfolio")

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
                                <div className={"column folio-item"}>
                                    <a href={`#modal-${model}`} className={"folio-item__thumb aspect-square"} onClick={(e) => {
                                        e.preventDefault()
                                        openModal(i, () => {
                                            e.currentTarget.blur()
                                        })
                                    }}>
                                        <img src={`assets/images/portfolio/${project.image}`} alt=""/>
                                    </a>
                                </div>

                                <ReactModal
                                    isOpen={isOpen[i]}
                                    onRequestClose={closeModal}
                                    className={'modal-popup border-2 border-gray-700 rounded-lg w-full justify-center hover:bg-sky-700'}
                                    id={`model-${model}`}
                                    style={customStyles}
                                    contentRef={(r) => {
                                        contentRef = r
                                    }}

                                >
                                    {/*{tailwindDialog()}*/}

                                    <img src={`assets/images/portfolio/${project.image}`} alt=""/>

                                    <div className="modal-popup__desc justify-center">
                                        <h5>{project.title}</h5>
                                        <p>Odio soluta enim quos sit asperiores rerum rerum repudiandae cum. Vel
                                            voluptatem alias qui assumenda iure et expedita voluptatem. Ratione
                                            officiis quae.</p>
                                        <ul className="modal-popup__cat">
                                            <li>Branding</li>
                                            <li>Product Design</li>
                                        </ul>
                                    </div>

                                    <a href={project.url} target={"_blank"} className="modal-popup__details">Project
                                        link</a>

                                </ReactModal>
                            </React.Fragment>
                        )
                    }
                )}
            </div>

            {/*{ProjectData.projects.map((project, i) => {*/}
            {/*    const model = String(i + 1).padStart(2, '0')*/}
            {/*    return (*/}
            {/*        <div id={`model-${model}`} hidden>*/}
            {/*            <div className={"modal-popup"}>*/}
            {/*                <img src={`assets/images/portfolio/${project.image}`} alt=""/>*/}

            {/*                <div className={"modal-popup__desc"}>{project.title}</div>*/}
            {/*            </div>*/}

            {/*            <a href={project.url} className="modal-popup__details">Project link</a>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}

            {/*<div id="modal-01" hidden>*/}
            {/*    <div className="modal-popup">*/}
            {/*        <img src="images/portfolio/gallery/g-droplet.jpg" alt=""/>*/}

            {/*        <div className="modal-popup__desc">*/}
            {/*            <h5>Droplet</h5>*/}
            {/*            <p>Odio soluta enim quos sit asperiores rerum rerum repudiandae cum. Vel voluptatem alias qui*/}
            {/*                assumenda iure et expedita voluptatem. Ratione officiis quae.</p>*/}
            {/*            <ul className="modal-popup__cat">*/}
            {/*                <li>Branding</li>*/}
            {/*                <li>Product Design</li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}

            {/*        <a href="https://www.behance.net/" className="modal-popup__details">Project link</a>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </section>
    )
}

const tailwindDialog = () => {
    return (
        <>

            <div
                className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-y-auto"
                id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-modal="true"
                role="dialog">
                <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800"
                                id="exampleModalScrollableLabel">
                                Modal title
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body relative p-4">
                            <p>This is a vertically centered modal.</p>
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button"
                                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Portfolio;