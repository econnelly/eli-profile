import React from "react";
import BlogCard, {BlogPreviewItem} from "../common/blog-card";
import Link from "next/link";
import {Router} from "next/router";

type Props = {
    posts: BlogPreviewItem[]
}

const BlogPreview = ({posts}: Props) => {
    return (
        <>
            <section id={"blog"} className={"s-blog target-section"}>
                <div className={"row s-blog__section"}>
                    <div className={"column large-3 tab-12"} key={"blog-preview"}>
                        <Link href={"/blog"}><h3 className={"section-header-allcaps"}>Blog</h3></Link>
                    </div>
                    <div className={"column large-9 tab-12"}>

                        <div className={"container my-12 mx-auto px-4 md:px-12"}>
                            <div className={"flex flex-wrap -mx-1 lg:-mx-4"}>

                                {posts ? posts.map((post) => {
                                    return (
                                        <div className={"my-2 mx-2 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"} key={post.slug}>
                                            <BlogCard title={post.title} author={post.author} slug={post.slug}
                                                      date={post.date} coverImage={post.coverImage} key={post.slug}/>
                                        </div>
                                    )
                                }) : "No Posts Found"}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPreview;
