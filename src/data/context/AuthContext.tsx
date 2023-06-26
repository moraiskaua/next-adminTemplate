import { createContext, useEffect, useState } from 'react';
import firebase from '../../firebase/config';
import User from '@/src/models/User';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface AuthContextProps {
    user?: User | null;
    loading?: boolean;
    signUp?: (email: string, passoword: string) => Promise<void>;
    login?: (email: string, password: string) => Promise<void>;
    googleLogin?: () => Promise<void>;
    signOut?: () => Promise<void>;
    children?: React.ReactNode
}

const AuthContext = createContext<AuthContextProps>({

});

const userDefault = async (firebaseUser: firebase.User): Promise<User> => {
    const token = await firebaseUser.getIdToken();
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
        token,
        provider: firebaseUser.providerData[0]?.providerId ?? '',
        imageUrl: firebaseUser.photoURL ?? '/images/avatar.svg'
    }
}

const cookieManagement = (logged: boolean) => {
    if (logged) {
        Cookies.set('admin-template-auth', 'true', {
            expires: 7
        });
    } else {
        Cookies.remove('admin-template-auth');
    }
}

export const AuthProvider = (props: AuthContextProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();


    const configuringSession = async (firebaseUser: firebase.User | null) => {
        if (firebaseUser?.email) {
            const user = await userDefault(firebaseUser);
            setUser(user);
            cookieManagement(true);
            setLoading(false);
            return user.email;
        } else {
            setUser(null);
            cookieManagement(false);
            setLoading(false);
            return false
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true);
            const res = await firebase.auth().createUserWithEmailAndPassword(email, password)

            await configuringSession(res.user);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const res = await firebase.auth().signInWithEmailAndPassword(email, password)

            await configuringSession(res.user);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }

    const googleLogin = async () => {
        try {
            setLoading(true);
            const res = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

            await configuringSession(res.user);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        try {
            setLoading(true);
            await firebase.auth().signOut()
            await configuringSession(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(configuringSession)
            return () => cancel();
        } else {
            setLoading(false);
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signUp,
            login,
            googleLogin,
            signOut
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;