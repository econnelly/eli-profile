import React from "react";
import Image from 'next/image'

type Size = "small" | "regular" | "large"
type Props = {
    name: string
    picture: string
    size?: Size
    hideName?: boolean
    children?: React.ReactNode
}

const getSizeClass = (size: Size) => {
    switch (size) {
        case "large":
            return "w-16 h-16"
        case "small":
            return "w-7 h-7"
        case "regular":
        default:
            return "w-12 h-12"
    }
}

const Avatar = ({name, picture, size = "regular", hideName = false, children = null}: Props) => {

    return (
        <div className={"flex items-center"}>
            <Image src={picture} className={`${getSizeClass(size)} rounded-full mr-4`} alt={name} width={100} height={100}/>
            {hideName ? null : <div className={"text-xl font-bold"}>{name}</div>}
            {children}
        </div>
    )
}

export default Avatar
