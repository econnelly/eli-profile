import Container from '../../components/home/container'
import PostBody from '../../components/blog/post-body'
import Layout from '../../components/blog/layout'
import {getPostBySlug, getAllPosts} from '@/lib/api'
import PostTitle from '../../components/blog/post-title'
import Head from 'next/head'
import {SITE_OWNER} from '@/lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import Post from '../../types/post'
import SidebarContainer from "../../components/blog/sidebar/sidebar-container";

type Props = {
    post: Post
    morePosts: Post[]
}

const Post = ({post, morePosts}: Props) => {
    return (
        <Layout>
            <Head>
                <title>
                    {post.title} | {SITE_OWNER}
                </title>
                {post.ogImage ? <meta property="og:image" content={post.ogImage.url}/> : null}
            </Head>

            <Container>
                <PostBody post={post} morePosts={morePosts}/>
                <SidebarContainer posts={morePosts}/>
            </Container>
        </Layout>
    )
}

export default Post

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({params}: Params) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
    ])
    const content = await markdownToHtml(post.content || '')
    const morePosts = getAllPosts([], 3);

    return {
        props: {
            post: {
                ...post,
                content,
            },
            morePosts,
        },
    }
}

export async function getStaticPaths() {
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
