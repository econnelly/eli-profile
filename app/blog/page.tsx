import Container from '../../components/blog/container'
import MoreStories from '../../components/blog/more-stories'
import HeroPost from '../../components/home/hero-post'
import Layout from './layout'
import {getAllPosts} from '@/lib/api'
import Head from 'next/head'
import {SITE_OWNER_FN} from '@/lib/constants'
import Post from '../../types/post'
import SidebarContainer from "../../components/blog/sidebar/sidebar-container";

type Props = {
    allPosts: Post[]
}

const Index = () => {
    const allPosts =  getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ])
    const heroPost = allPosts[0]
    const morePosts = allPosts

    return (
        <Layout>
            <Head>
                <title>{SITE_OWNER_FN}&apos;s Blog</title>
            </Head>
            <Container>
                {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
                <SidebarContainer posts={allPosts}/>
            </Container>
        </Layout>
    )
}

export default Index

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

// export const getStaticProps = async () => {
//     const allPosts = getAllPosts([
//         'title',
//         'date',
//         'slug',
//         'author',
//         'coverImage',
//         'excerpt',
//     ])
//
//     return {
//         props: {allPosts},
//     }
// }
