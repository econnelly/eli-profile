import Author from '../../types/author'
import React from "react";
import Image from 'next/image'
import exp from "constants";
import coverImage from "../home/cover-image";

export type BlogPreviewItem = {
    title: string
    date: Date
    author: Author
    slug: string
    coverImage: string
}

const BlogCard = ({
                      title,
                      date,
                      author,
                      slug,
                      coverImage
                  }: BlogPreviewItem) => {
    const postDate = new Date(date)
    return (

        <article className={"overflow-hidden rounded-lg shadow-lg"}>

            <a href={`/blog/${slug}`}>
                <Image alt={"Placeholder"} className={"block h-auto w-full object-cover"} src={coverImage}
                       layout={"responsive"} width={500} height={220}/>
            </a>

            <header className={"flex items-center justify-between leading-tight p-1 md:p-2"}>
                <h1 className={"text-lg"}>
                    <a className={"no-underline hover:underline text-black truncate"} href={`/blog/${slug}`}>
                        {title}
                    </a>
                </h1>

            </header>
            <section className={"p-1"}>
                <p className={"text-grey-darker text-sm"}>
                    {postDate.toLocaleDateString('en-US', {year: "numeric", month: "short", day: "numeric"})}
                </p>
            </section>

            <footer className={"flex items-center justify-between leading-none p-2 md:p-4"}>
                <a className={"flex items-center no-underline hover:underline text-black"} href={"#"}>
                    {/*<img alt="Placeholder" className="block rounded-full"*/}
                    {/*     src={author.picture}/>*/}
                    <p className={"ml-2 text-sm"}>
                        by: {author.name}
                    </p>
                </a>
                {/*<a className={"no-underline text-grey-darker hover:text-red-dark"} href={"#"}>*/}
                {/*    <span className={"hidden"}>Like</span>*/}
                {/*    <i className="fa fa-heart"/>*/}
                {/*</a>*/}
            </footer>

        </article>

    )
}

export default BlogCard
