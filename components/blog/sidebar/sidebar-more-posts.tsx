import Post from "../../../types/post";
import BlogCard from "../../common/blog-card";
import { parseISO, format } from 'date-fns'
import React from "react";

type Props = {
    posts: Post[]
}

const SideBarMorePosts = ({posts}: Props) => {
    return (
        <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5">Blog Posts</p>
            <div className="grid grid-cols-3 gap-3">

                {posts ? posts.map((post) => {
                    return <BlogCard title={post.title} author={post.author} slug={post.slug}
                                     date={new Date(post.date)} coverImage={post.coverImage} key={post.slug}/>
                }) : "No Posts Found"}

            </div>
            {/*<a href="#"*/}
            {/*   className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">*/}
            {/*    <i className="fab fa-instagram mr-2" /> Follow @dgrzyb*/}
            {/*</a>*/}
        </div>
    )
}

export default SideBarMorePosts;