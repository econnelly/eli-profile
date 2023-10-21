import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../../components/home/container'
import PostBody from '../../../components/blog/post-body'
import Layout from '../../../components/blog/layout'
import {getPostBySlug, getAllPosts} from '@/lib/api'
import PostTitle from '../../../components/blog/post-title'
import Head from 'next/head'
import {SITE_OWNER} from '@/lib/constants'
import markdownToHtml from '../../../lib/markdownToHtml'
import PostData from '../../../types/post'
import SidebarContainer from "../../../components/blog/sidebar/sidebar-container";

type Props = {
    post: PostData
    morePosts: PostData[]
}

const Post = ({post, morePosts}: Props) => {
    const router = useRouter()
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404}/>
    }
    return (
        <Layout>
            {router.isFallback ? (
                <Container>
                    <PostTitle>Loading…</PostTitle>
                </Container>
            ) : (
                <>
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
                </>
            )}
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

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({
                                           params: { slug },
                                       }: {
    params: { slug: string }
}) {
    const { title } = getPostBySlug(slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
    ])
    return {
        title,
    }
}
