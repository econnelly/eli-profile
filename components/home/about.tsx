import React from "react";
import about from "../../_data/about.json"
import ProfileImage from "../../public/assets/images/profile.jpg"
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    slugs: string[]
}

const About = () => {
    return (
        <section id={"about"} className={"s-about target-section"}>
            <div className={"row"}>
                <div className={"column large-3 tab-12"}>
                    <Image alt="Profile Image" src={ProfileImage} className={"s-about__pic"} width={100} height={100}/>
                </div>
                <div className={"column large-9 tab-12 s-about__content"}>
                    <h3>About Me</h3>
                    <p>
                        {about.bio}
                    </p>

                    <hr/>

                    <div className={"row s-about__content-bottom"}>
                        <div className={"column w-1000-stack"}>
                            <h3>Contact Details</h3>

                            <p>
                                {about.name} <br/>
                                {about.city}, {about.state} <br/>
                                <a href={`mailto:${about.email}`}>{about.email}</a>
                            </p>

                        </div>
                        <div className={"column w-1000-stack"}>
                            <Link href={"#0"}>
                                {/*<a className={"btn btn--download"}>*/}
                                    <svg className={"inline-block"} xmlns="http://www.w3.org/2000/svg" width="24"
                                         height="24" viewBox="0 0 24 24">
                                        <path d="M12 16L16 11 13 11 13 4 11 4 11 11 8 11z"/>
                                        <path d="M20,18H4v-7H2v7c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-7h-2V18z"/>
                                    </svg>
                                    Download Resume
                                {/*</a>*/}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
