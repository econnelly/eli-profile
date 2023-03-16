import Avatar from "../../home/avatar";
import React from "react";
import Link from 'next/link'

type Props = {
    text: string
    name: string
    image: string
}
const SideBarAbout = ({text, name, image}: Props) => {
    return (
        <div className="w-full bg-white shadow flex flex-col p-6">
            <p className="text-xl font-semibold pb-5">About Me</p>
            <Avatar name={name} picture={image} size={"small"} hideName={true}>
                <p className={"text-xl font-bold pl-2 w-full"}>{name}</p>
            </Avatar>
            <p className="pb-2">{text}</p>
    <Link href="/"
       className={"w-full md:w-1/3 bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"}>
        Get to know me
    </Link>
</div>
)
}

export default SideBarAbout;