

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'font-awesome/css/font-awesome.css'
import {faFacebookSquare, faLinkedin, faInstagram, faBlogger, faTwitterSquare} from "@fortawesome/free-brands-svg-icons"
import React, {RefObject, useEffect, useRef, useState} from "react";
import About from "../../_data/about.json"
import {getSocials} from "@/lib/socials";
import Link from "next/link";

const ProfileHeader = () => {

    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.scrollY);
    const profileRef = useRef(null)

    // const parentRef = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="hero" className="s-hero target-section" ref={profileRef}>
            <div className="s-hero__bg" style={{transform: `translateY(${offsetY * 0.3}px)`}}/>
            <div className="row s-hero__content">
                <div className="column">
                    <div className="s-hero__content-about">
                        <h1>I&apos;m {About.name}.</h1>
                        <h3>
                            I&apos;m a {About.city} based <span>{About.occupation}</span>. {About.description}
                        </h3>

                        <div className="s-hero__content-social">
                            {getSocials().map((item) => {
                                return <Link href={item.url} key={item.name} target={"_blank"} rel={"noreferrer"}><FontAwesomeIcon
                                    icon={item.network} height={"0.875em"}/></Link>
                            })}
                        </div>

                    </div>

                </div>
            </div>

            <div className="s-hero__scroll">
                <Link href="#about" className="s-hero__scroll-link smoothscroll" onClick={e => {
                    e.preventDefault()
                    const element = document.getElementById("about");
                    if (element) {
                        element.scrollIntoView({behavior: 'smooth', block: 'start'});
                    }
                }}>
                <span className="scroll-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M18.707 12.707L17.293 11.293 13 15.586 13 6 11 6 11 15.586 6.707 11.293 5.293 12.707 12 19.414z"/></svg>
                </span>
                    <span className="scroll-text">Scroll Down</span>
                </Link>
            </div>

        </section>

    )
}

export default ProfileHeader