import useAuth from "@/src/data/hook/useAuth";
import { BellIcon, HomeIcon, SettingsIcon, SingOutIcon } from "../Icons";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";

interface SidebarProps {

}

const Sidebar = (props: SidebarProps) => {
    const {signOut} = useAuth();

    return (
        <aside className={`flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col justify-center items-center
                bg-gradient-to-tr from-indigo-500 to-purple-800
                w-20 h-20
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <ItemMenu url="/" text="Início" icon={HomeIcon} />
                <ItemMenu url="/settings" text="Ajustes" icon={SettingsIcon} />
                <ItemMenu url="/notifications" text="Novidades" icon={BellIcon} />
            </ul>
            <ul>
                <ItemMenu onClick={signOut}
                    text="Sair" icon={SingOutIcon}
                    className={`text-red-600 hover:bg-red-400 
                    hover:text-white dark:text-red-400 
                    dark:hover:text-white`}
                />
            </ul>
        </aside>
    )
}

export default Sidebar;