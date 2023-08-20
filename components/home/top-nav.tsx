import React, {RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";

type NavLink = {
    id: string;
    link: string;
    text: string;
    current: boolean;
    offset: number;
};

// This structure assumes that they're in the same order as on the page
const links: NavLink[] = [
    {
        id: "hero",
        link: "#hero",
        text: "Home",
        current: true,
        offset: 0
    },
    {
        id: "about",
        link: "#about",
        text: "About",
        current: false,
        offset: 0
    },
    {
        id: "resume",
        link: "#resume",
        text: "Resume",
        current: false,
        offset: 0
    },
    {
        id: "portfolio",
        link: "#portfolio",
        text: "Portfolio",
        current: false,
        offset: 0
    }
];

type HeaderClass = {
    sticky: string
    offset: string
    scrolling: string
}

const getSectionElements = (navItems: NavLink[]): HTMLElement[] => {
    if (!navItems) {
        return new Array<HTMLElement>(0);
    }

    // @ts-ignore
    return navItems
        .filter((item) => {
            return item.link.startsWith('#') && document.getElementById(item.id) != null;
        })
        .map((item) => {
            const e = document.getElementById(item.id)
            if (e == null) throw new DOMException(`Element with id ${item.id} doesn't exist`, "SectionException")
            e.addEventListener("blur", () => {

            })
            return e;
        })
}

type Props = {
    blog: boolean
}

const TopNav = ({blog}: Props) => {
    const [scrolled, setScrolled] = useState(false);
    const [triggerHeight, setTriggerHeight] = useState(0)
    const [_, setNavBarBackground] = useState("bg-transparent");
    const [headerClass, setHeaderClass] = useState("s-header")
    const [menuClicked, setMenuClicked] = useState(false)
    const [currentNav, setCurrentNav] = useState(links[0].id)
    const [size, setSize] = useState({
        x: 0,
        y: 0
    });
    const [sections, setSections] = useState(Array<HTMLElement>(0))

    const defaultHeaderClass: HeaderClass = {offset: "", scrolling: "", sticky: ""}
    const [headerClassBuilder, setHeaderClassBuilder] = useState(defaultHeaderClass)

    const navRef = useRef(null)

    useEffect(() => {
        const blogLink: NavLink = {
            id: "blog",
            link: "#blog",
            text: "Blog",
            current: false,
            offset: 0
        }

        const blogIndex = links.findIndex((item) => item.id === blogLink.id)
        if (blog && blogIndex < 0) links.push(blogLink)
        const s = getSectionElements(links)
        console.log(s)
        setSections(s);
    }, [])

    useEffect(() => {
        if (sections.length > 0) {
            setTriggerHeight(sections[0].getBoundingClientRect().bottom);
        }
    },[sections])

    const buildHeaderClass = () => {
        return `s-header ${headerClassBuilder.sticky} ${headerClassBuilder.offset} ${headerClassBuilder.scrolling}`.trim()
    }

    useEffect(() => {
        if (scrolled) {
            setNavBarBackground("bg-black bg-opacity-50 drop-shadow");
        } else {
            setNavBarBackground("bg-transparent");
        }
    }, [scrolled]);

    useEffect(() => {
        window.removeEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, [triggerHeight, scrolled, headerClass, headerClassBuilder]);

    useEffect(() => {
        const sectionBorder = window.innerHeight * 0.4
        const observer = new IntersectionObserver((entries) => {

            entries.reverse().every((entry) => {
                const id = entry.target.getAttribute('id');
                const rect = entry.target.getBoundingClientRect()

                if((window.scrollY || 0) == 0) {
                    setCurrentNav(links[0].id)
                    return false
                } else if (entry.isIntersecting && id != null && rect.top < sectionBorder) {
                    setCurrentNav(id)
                    return false
                }

                return true
            });
        });

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    });

    const handleScroll = () => {
        if (sections.length === 0) {
            return;
        }

        const clientRects = sections.map(section => {
            return section.getBoundingClientRect();
        })

        const loc = (window.scrollY || 0)

        let newSection = currentNav;
        sections?.forEach((section, i) => {
            let rect = clientRects[i];
            // console.log({"loc": loc, index: i, "top": rect.top})
            // if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            //     newSection = section.id
            //     return
            // }
        })

        if (newSection !== currentNav) {
            console.log(`Setting current nav to ${newSection}`)
            // setCurrentNav(newSection)
        }

        let tempHeaderClassBuilder: HeaderClass = headerClassBuilder
        // console.log({"loc": loc, "bottom": clientRects[0]?.bottom})
        if (clientRects[0]?.bottom <= 5) {
            tempHeaderClassBuilder = {
                ...tempHeaderClassBuilder,
                sticky: "sticky"
            }
        } else {
            tempHeaderClassBuilder = {
                ...tempHeaderClassBuilder,
                sticky: ""
            }
        }

        if (clientRects[0]?.bottom <= 20) {
            tempHeaderClassBuilder = {
                ...tempHeaderClassBuilder,
                offset: "offset"
            }
        } else {
            tempHeaderClassBuilder = {
                ...tempHeaderClassBuilder,
                offset: ""
            }
        }

        if (clientRects[0]?.bottom <= 70) {
            tempHeaderClassBuilder = {
                ...tempHeaderClassBuilder,
                scrolling: "scrolling"
            }
        } else {
            tempHeaderClassBuilder = {
                ...tempHeaderClassBuilder,
                scrolling: ""
            }
        }

        if (loc === 0) {
            setScrolled(false);
            // @ts-ignore
            document?.activeElement?.blur();
            setCurrentNav(links[0].id)
        } else if (!scrolled) {
            setScrolled(true);
        }

        setHeaderClassBuilder(tempHeaderClassBuilder)
        setHeaderClass(buildHeaderClass())
    };

    const updateSize = () => {
        setSize({
            x: window.innerWidth,
            y: window.innerHeight
        });

        setSections(getSectionElements(links))
    }
    useEffect(() => {
        window.removeEventListener("resize", updateSize);
        window.addEventListener("resize", updateSize, {passive: true});
        return () => window.removeEventListener("resize", updateSize);

    }, []);

    return (
        <header className={headerClass} ref={navRef}>
            <div className={`row s-header__nav-wrap`}>
                <nav className="s-header__nav">
                    <ul>
                        {links.map((item) => {
                            const current = item.id === currentNav ? "current" : ""
                            return <li
                                className={current}
                                key={item.id}
                                id={`${item.id}_nav`}>
                                <a href={item.link} onClick={e => {
                                    if (item.link.startsWith("#")) {
                                        if (item.link.startsWith("#")) {

                                            e.preventDefault()

                                            if (size.x <= 800) {
                                                setMenuClicked(false);
                                                document.body.classList.remove("menu-is-open");
                                            }

                                            const element = document.getElementById(item.id);
                                            if (element) {
                                                element.scrollIntoView({behavior: 'smooth', block: 'start'});
                                                setCurrentNav(item.id);
                                            }
                                        }
                                    }
                                }}>{item.text}</a></li>
                        })}
                    </ul>
                </nav>
            </div>

            <a className={`s-header__menu-toggle ${menuClicked ? "is-clicked" : ""}`} href={"#"} title={"Menu"}
               onClick={(e) => {
                   e.preventDefault()
                   setMenuClicked(!menuClicked)
                   document.body.classList.toggle("menu-is-open");
               }}>
                <span className="s-header__menu-icon"/>
            </a>
        </header>
    );
};

export default TopNav;
