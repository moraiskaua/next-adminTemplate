
interface ContentProps {
    children?: React.ReactNode;
}

const Content = (props: ContentProps) => {
    return (
        <div className={`
            flex flex-column mt-7
            dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}

export default Content;