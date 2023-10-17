import CoverImage from '../home/cover-image'
import Author from '../../types/author'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  title: string
  coverImage: string
  date: number
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
    const dateStr = new Date(date).toLocaleDateString()
  return (
      <article className="flex flex-col shadow my-4">

          <CoverImage slug={slug} title={title} src={coverImage} />

          <div className="bg-white justify-start p-6">
              {/*<a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Technology</a>*/}
              <div className={"text-3xl font-bold hover:text-gray-700 pb-4"}>{title}</div>
              <div className={"text-lg pb-3 flex flex-row"}>By <div className={"font-semibold hover:text-gray-800 px-1"}>{author.name}</div> on {dateStr}</div>
              <div className={"pb-6"}>{excerpt}</div>
              <Link href={`/blog/${slug}`} className={"text-s rounded w-full md:w-1/4 flex flex-row items-center bg-slate-500 uppercase text-white hover:text-black px-4"}>Continue Reading
                  <FontAwesomeIcon icon={faArrowRight} height={"0.8em"} className={"px-2"}/></Link>
          </div>
      </article>
  )
}

export default PostPreview










