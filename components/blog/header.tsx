import Link from "next/link";

type Props = {
    name: string,
    desc: string
}
const Header = (props: Props) => {
    return (
        <header className="w-full container mx-auto">
            <div className="flex flex-col items-center py-12">
                <Link className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="/blog">
                    {props.name}
                </Link>
                <p className="text-lg text-gray-600">
                    {props.desc}
                </p>
            </div>
        </header>
    )
}

export default Header;