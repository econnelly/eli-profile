import React from "react";
import Footer from "../components/common/footer";
import Meta from "../components/home/meta";
import {CMS_NAME} from "@/lib/constants";
import Head from "next/head";
import styles from './Layout.module.css'

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
