import Avatar from './avatar'
import DateFormatter from '../common/date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../../types/author'

type Props = {
    title: string
    coverImage: string
    date: number
    excerpt: string
    author: Author
    slug: string
}

const HeroPost = ({
                      title,
                      coverImage,
                      date,
                      excerpt,
                      author,
                      slug,
                  }: Props) => {

    const dateStr = new Date(date).toLocaleDateString()
    return (
        <section>
            <div className="mb-8 md:mb-16">
                <CoverImage title={title} src={coverImage} slug={slug}/>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                        <Link className={"hover:underline"} passHref as={`/blog/${slug}`} href="/blog/[slug]">
                            {title}
                        </Link>
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        <DateFormatter dateString={dateStr}/>
                    </div>
                </div>
                <div>
                    <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
                    <Avatar name={author.name} picture={author.picture}/>
                </div>
            </div>
        </section>
    )
}

export default HeroPost
