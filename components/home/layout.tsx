import React from "react";
import Footer from "../common/footer";
import Meta from "./meta";
import {CMS_NAME} from "@/lib/constants";
import Head from "next/head";

type Props = {
    children: React.ReactNode;
};

const Layout = (({children}: Props) => {
    return (
        <>
            <Head>
                <title>{CMS_NAME}</title>
            </Head>
            <Meta path={"/"} desc={CMS_NAME}/>
            <section className="relative bg-gray-100">
                <main>{children}</main>
            </section>
            <Footer/>
        </>
    );
});

export default Layout;
