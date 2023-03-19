import 'font-awesome/css/font-awesome.css'
import {faFacebookSquare, faLinkedin, faInstagram, faBlogger, faTwitterSquare, faGithub} from "@fortawesome/free-brands-svg-icons"
import Socials from "../_data/socials.json"
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type SocialLink = {
    network: IconProp,
    name: string,
    url: string
}

type SocialMap = {
    [key: string]: IconProp
}

export const getSocials = (): SocialLink[] => {
    const links: SocialMap = {}
    links["facebook"] = faFacebookSquare
    links["linkedin"] = faLinkedin
    links["instagram"] = faInstagram
    links["blogger"] = faBlogger
    links["twitter"] = faTwitterSquare
    links["github"] = faGithub

    return Socials.filter((item) => {
        return item.name && links[item.name]
    }).map((item) => {
        return {network: links[item.name], name: item.name, url: item.link}
    })
}