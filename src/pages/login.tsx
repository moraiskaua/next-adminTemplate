import { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { WarningIcon } from "../components/Icons";
import useAuth from "../data/hook/useAuth";

interface LoginProps {

}

const Login = (props: LoginProps) => {
    const { signUp, login, googleLogin } = useAuth();

    const [error, setError] = useState(null);
    const [mode, setMode] = useState<'login' | 'signUp'>('login');
    const [photoUrl, setPhotoUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showError = (msg: any, time = 4500) => {
        setError(msg)
        setTimeout(() => setError(null), time)
    }

    useEffect(() => {
        async function getRandomImage() {
          try {
            const response = await fetch('/api/randomImage');
            const data = await response.json();
            setPhotoUrl(data.imageUrl);
          } catch (error) {
            console.error(error);
          }
        }
    
        getRandomImage();
      }, []);

    const handleSubmit = async () => {
        try {
            if (mode === 'login') {
                if (login)
                    await login(email, password);
            } else {
                if (signUp)
                    await signUp(email, password);
            }
        } catch (e) {
            showError((e as Error)?.message ?? 'algo deu errado!');
        }
    }

    return (
        <div className={`flex justify-center items-center h-screen`}>
            <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
                <img
                    src={photoUrl}
                    alt=""
                    className={`h-screen w-full object-cover`}
                />
            </div>
            <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>
                    {mode === 'login' ? 'Fazer Login' : 'Fazer Cadastro'}
                </h1>

                {error &&
                    <div className={`
                        bg-red-400 text-white py-1.5 px-5 my-2
                        border border-red-700 rounded-md flex items-center
                    `}>
                        {WarningIcon()}
                        <span className="ml-3 text-md">{error}</span>
                    </div>
                }

                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                />
                <AuthInput
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    required
                />

                <button onClick={handleSubmit} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {mode === 'login' ? 'Entrar' : 'Criar conta'}
                </button>

                <hr className={`my-6 border-gray-300 w-full`} />

                <button onClick={googleLogin} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Entrar com Google
                </button>

                {mode === 'login' ? (
                    <p className={`mt-8`}>
                        Novo por aqui?
                        <a onClick={() => setMode('signUp')} className={`
                            text-blue-500 hover:text-blue-700
                            font-semibold cursor-pointer
                        `}> Criar conta</a>
                    </p>
                ) : (
                    <p className={`mt-8`}>
                        Já possui uma conta?
                        <a onClick={() => setMode('login')} className={`
                            text-blue-500 hover:text-blue-700
                            font-semibold cursor-pointer
                        `}> Fazer login</a>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login;