import React from "react";
import Head from "next/head";
import {SITE_OWNER_FN} from "@/lib/constants";
import Meta from "../home/meta";
import Container from "./container";
import Header from "./header";
import Footer from "../common/footer";

type Props = {
    children: React.ReactNode;
};

const Layout = (({children}: Props) => {
    const desc = `${SITE_OWNER_FN}'s Blog`
    return (
        <>
            <Head>
                <title>{desc}</title>
            </Head>
            <Meta path={"/blog"} desc={desc}/>
            <div className="bg-neutral-50 font-family-karla">
                <Header name={desc} desc={""}/>
                {children}
                <Footer/>
            </div>
        </>
    )
});

export default Layout;