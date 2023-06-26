import Head from "next/head";
import Image from "next/image";
import load from '@/public/images/load.gif';
import useAuth from "@/src/data/hook/useAuth";
import { useRouter } from "next/router";

interface ForceAuthProps {
    children?: React.ReactNode;
}

const ForceAuth = ({ children }: ForceAuthProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    const renderContent = () => {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if (!document.cookie?.includes('admin-template-auth')) {
                                    window.location.href = '/login';
                                }
                            `
                        }}
                    />
                </Head>
                {children}
            </>
        )
    }

    const renderLoading = () => {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={load} alt='carregando...' />
            </div>
        )
    }

    if (!loading && user?.email) {
        return renderContent();
    } else if (loading) {
        return renderLoading();
    } else {
        router.push('/login');
        return null;
    }
}

export default ForceAuth;