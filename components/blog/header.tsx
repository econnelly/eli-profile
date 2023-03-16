type Props = {
    name: string,
    desc: string
}
const Header = (props: Props) => {
    return (
        <header className="w-full container mx-auto">
            <div className="flex flex-col items-center py-12">
                <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
                    {props.name}
                </a>
                <p className="text-lg text-gray-600">
                    {props.desc}
                </p>
            </div>
        </header>
    )
}

export default Header;