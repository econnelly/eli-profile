import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import Post from "../types/post";
import MdPostItem from "../types/md-post-item";

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data, content} = matter(fileContents)

    const postDate: Date = data['date']

    const items: MdPostItem = {
        title: data['title'],
        slug: realSlug,
        excerpt: data['excerpt'],
        published: data['published'],
        coverImage: data['coverImage'],
        date: Math.floor((data['date']).getTime()),
        author: data['author'],
        ogImage: data['ogImage']
    }

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'content') {
            items[field] = content
        }
    })

    return items
}

export function getAllPosts(fields: string[] = [], size: number = 0) {
    const slugs = getPostSlugs()
    return slugs
        .filter((_, index) => {
            return size == 0 || size > index
        })
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
        .map(item => mdItemToPost(item))
        .filter(post => post.published)
}

const mdItemToPost = (item: MdPostItem): Post => {
    const p: Post = {
        title: item['title'],
        date: item['date'],
        slug: item['slug'],
        author: item['author'],
        coverImage: item['coverImage'],
        excerpt: item['excerpt'],
        published: item['published']
    }
    return p;
}
