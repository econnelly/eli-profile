import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    title: string
    src: string
    slug?: string
}

const CoverImage = ({title, src, slug}: Props) => {
    const image = (
        <Image
            src={src}
            alt={`Cover Image for ${title}`}
            className={cn('shadow-sm', {
                    'hover:shadow-lg transition-shadow duration-200 aspect-video': slug,
                },
                'object-cover')}
            layout={"responsive"}
            width={600}
            height={200}
        />
    )
    return (
        <div className="hover:opacity-75">
            {slug ? (
                <Link passHref as={`/blog/${slug}`} href="/blog/[slug]">
                    {image}
                </Link>
            ) : (
                image
            )}
        </div>
    )
}

export default CoverImage
