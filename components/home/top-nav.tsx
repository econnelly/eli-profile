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
            return document.getElementById(item.id);
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
        setSections(getSectionElements(links));
        setTimeout(() => {
            if (navRef && navRef.current) {
                const ctx = navRef.current

                // @ts-ignore
                setTriggerHeight(ctx.offsetHeight);
            } else {
                console.log("Navigation reference was invalid")
            }
        }, 300);
    }, [])

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

    const handleScroll = () => {
        if (sections.length === 0) {
            return;
        }

        const loc = (window.scrollY || 0)

        let newSection = currentNav;
        sections?.forEach(section => {
            if (section && section.offsetTop - 120 <= loc) {
                newSection = section.id
                return
            }
        })

        if (newSection !== currentNav) {
            setCurrentNav(newSection)
        }

        let tempHeaderClassBuilder: HeaderClass = headerClassBuilder
        if (loc > (sections[0]?.offsetTop + sections[0]?.offsetHeight - triggerHeight)) {
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

        if (loc > triggerHeight + 20) {
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

        if (loc > triggerHeight + 70) {
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
        const bottom = sections[sections.length - 1].offsetTop - window.innerHeight;
        if (loc >= bottom) {
            setCurrentNav(links[links.length - 1].id)
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
