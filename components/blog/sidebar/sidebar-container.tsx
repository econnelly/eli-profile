import SidebarAbout from "./sidebar-about";
import SidebarMorePosts from "./sidebar-more-posts";
import About from '../../../_data/about.json'
import Post from "../../../types/post";

type Props = {
    posts: Post[]
}

const SideBarContainer = ({posts}: Props) => {
    return (
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
            <SidebarAbout text={About.description} name={About.name} image={About.image}/>
            <SidebarMorePosts posts={posts}/>
        </aside>
)
}

export default SideBarContainer;