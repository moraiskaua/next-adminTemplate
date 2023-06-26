import useAppData from "@/src/data/hook/useAppData";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ForceAuth from "../auth/ForceAuth";

interface LayoutProps {
    title: string;
    subTitle: string;
    children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    const { theme } = useAppData();

    return (
        <ForceAuth>
            <div className={`${theme} flex h-screen w-screen`}>
                <Sidebar />
                <div className={`
                flex flex-col w-full p-7
                bg-gray-300
                dark:bg-gray-800
            `}>
                    <Header title={props.title} subTitle={props.subTitle} />
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </ForceAuth>
    )
}

export default Layout;