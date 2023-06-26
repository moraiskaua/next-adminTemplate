import useAuth from "@/src/data/hook/useAuth";
import Link from "next/link";

interface ProfileAvatarProps {
    className?: string;
}

const ProfileAvatar = (props: ProfileAvatarProps) => {
    const { user } = useAuth();

    return (
        <Link href='/profile' className={``}>
            <img src={user?.imageUrl} alt="Avatar do usuário"
                className={`${props.className} ${user?.imageUrl ? '' : 'p-1'}
                h-10 w-10 rounded-full cursor-pointer border border-black bg-gray-400`}
            />
        </Link>
    )
}

export default ProfileAvatar;