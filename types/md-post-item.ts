import Author from "./author";

type MdPostItem = {
    // [key: string]: any
    title: string
    slug: string
    excerpt: string
    coverImage: string
    date: number
    author: Author
    published: boolean
    ogImage: string
    content?: string
}

export default MdPostItem;