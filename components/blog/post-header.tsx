import Avatar from '../home/avatar'
import DateFormatter from '../common/date-formatter'
import CoverImage from '../home/cover-image'
import PostTitle from './post-title'
import Author from '../../types/author'
import React from "react";

type Props = {
    title: string
    coverImage: string
    date: number
    author: Author
}

const PostHeader = ({title, coverImage, date, author}: Props) => {
    const dateString = new Date(date).toLocaleDateString()
    return (
        <>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} src={coverImage}/>
            </div>
            <div className={"px-4"}>
                <PostTitle>{title}</PostTitle>

                <div className={"text-lg pb-3 flex flex-row"}>By <div
                    className={"font-semibold hover:text-gray-800 px-1"}>{author.name}</div> on <div className={"px-1"}>
                    <DateFormatter date={new Date(date)}/></div></div>
            </div>
            {/*<div><a href="#" className={"font-semibold hover:text-gray-800"}>{author.name}</a></div>*/}
            {/*<div className={"text-s"}><DateFormatter date={new Date(date)}/></div>*/}
        </>
    )
}

export default PostHeader
