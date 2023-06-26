import Link from "next/link";

interface ItemMenuProps {
    url?: string;
    text: string;
    className?: string;
    icon: any;
    onClick?: (e: any) => void;
}

const ItemMenu = (props: ItemMenuProps) => {
    return (
        <li onClick={props.onClick} className={`hover:bg-gray-100 dark:hover:bg-gray-800`}>
            <Link href={props.url ?? ''} className={`
                            flex flex-col justify-center 
                            items-center h-20 w-20 text-gray-600
                            dark:text-gray-200
                            ${props.className}
                        `}>
                {props.icon}
                <span className={`text-xs font-light`}>
                    {props.text}</span>
            </Link>
        </li>
    )
}

export default ItemMenu;