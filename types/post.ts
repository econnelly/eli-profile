import Author from './author'

type Post = {
  slug: string
  title: string
  date: number
  coverImage: string
  author: Author
  excerpt: string
  published: boolean
  ogImage?: {
    url: string
  }
  content?: string
}

export default Post
