import useAppData from "@/src/data/hook/useAppData";
import ButtonToggleTheme from "./ButtonToggleTheme";
import Title from "./Title";
import ProfileAvatar from "./ProfileAvatar";

interface HeaderProps {
    title: string;
    subTitle: string;
}

const Header = (props: HeaderProps) => {
    const { theme, toggleTheme } = useAppData();
    return (
        <div className={`flex`}>
            <Title title={props.title} subTitle={props.subTitle} />
            <div className={`flex flex-grow justify-end items-center`}>
                <ButtonToggleTheme theme={theme} toggleTheme={toggleTheme} />
                <ProfileAvatar className="ml-3" />
            </div>
        </div>
    )
}

export default Header;