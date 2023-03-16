import markdownStyles from '../../styles/markdown-styles.module.css'
import Post from "../../types/post";
import PostHeader from "./post-header";

type Props = {
    post: Post
    morePosts: Post[]
}

const PostBody = ({post, morePosts}: Props) => {
    return (

                <section className={"bg-white w-full md:w-2/3 flex flex-col items-center px-3"}>

                    <article className={"flex flex-col shadow my-4"}>

                        <PostHeader
                            title={post.title}
                            coverImage={post.coverImage}
                            date={post.date}
                            author={post.author}
                        />
                        <div
                            className={`${markdownStyles['markdown']} px-4`}
                            dangerouslySetInnerHTML={{__html: post.content ? post.content : ""}}
                        />
                    </article>

                </section>
    )
}

export default PostBody
