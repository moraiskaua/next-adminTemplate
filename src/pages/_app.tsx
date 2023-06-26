import { AppProvider } from '../data/context/AppContext';
import { AuthProvider } from '../data/context/AuthContext';
import '../styles/globals.css';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {


  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  );
};

export default MyApp;
