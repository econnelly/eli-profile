import PostPreview from './post-preview'
import Post from '../../types/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
      <section className="bg-white w-full md:w-2/3 flex flex-col items-center px-3">


        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
    </section>
  )
}

export default MoreStories
