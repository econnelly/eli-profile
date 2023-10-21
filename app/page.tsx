// noinspection JSUnusedGlobalSymbols

import React from "react";
import Layout from "./layout";
import ProfileHeader from "../components/blog/profile-header";
import TopNav from "../components/home/top-nav";
import About from "../components/home/about";
import Resume from "../components/home/resume";
import {getAllPosts, getPostBySlug} from "@/lib/api";
import BlogPreview from "../components/blog/blog-preview";
import Post from "../types/post";
import {BlogPreviewItem} from "@/components/common/blog-card";
import {toDate} from 'date-fns'
import Portfolio from "../components/home/portfolio";

type Props = {
    posts: Post[]
}

const MainIndex = () => {
    const posts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ], 3)
    const blogPreviews: BlogPreviewItem[] = posts.map((item) => {
        const preview: BlogPreviewItem = {
            title: item.title,
            slug: item.slug,
            author: item.author,
            date: toDate(item.date),
            coverImage: item.coverImage
        }
        return preview
    })

    return (
        <Layout>
            <TopNav blog={posts.length > 0}/>
            <ProfileHeader/>
            <About/>
            <Resume/>
            <Portfolio />
            {blogPreviews.length > 0 ? <BlogPreview posts={blogPreviews}/> : null}
        </Layout>
    );
};

export default MainIndex;
export async function generateStaticParams() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}


// @ts-ignore
// export const getStaticProps = async () => {
//     const posts = getAllPosts([
//         'title',
//         'date',
//         'slug',
//         'author',
//         'coverImage',
//         'excerpt',
//     ], 3)
//
//     return {
//         props: {
//             posts: posts
//         }
//     }
// }
