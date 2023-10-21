import Author from './author'

type PostData = {
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

export default PostData
