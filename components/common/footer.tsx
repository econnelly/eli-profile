import Container from '../home/container'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBlogger,
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faTwitterSquare
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import {getSocials} from "../../lib/socials";

const Footer = () => {
  return (
      <footer className={"s-footer"} id={"page_footer"}>
        <div className="row">
          <div className="column large-4 medium-6 w-1000-stack s-footer__social-block">
            <ul className="s-footer__social">
              {getSocials().map((item) => {
                return <li key={item.name}><a href={item.url} target={"_blank"} rel={"noreferrer"}><FontAwesomeIcon icon={item.network} height={"0.875em"}/></a></li>
              })}
            </ul>
          </div>

          <div className="column large-7 medium-6 w-1000-stack ss-copyright">
            <span>Implementation of <a href="https://www.styleshout.com/" target={"_blank"}>Ceevee</a> in React by Eli Connelly</span>
          </div>
        </div>

        <div className="ss-go-top">
          <a className="smoothscroll" title="Back to Top" href="#top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6 4h12v2H6zm5 10v6h2v-6h5l-6-6-6 6z"/>
            </svg>
          </a>
        </div>

      </footer>
  )
}

export default Footer
