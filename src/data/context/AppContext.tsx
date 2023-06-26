import React, { createContext, useEffect, useState } from "react";

export interface AppContextProps {
    theme: string;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextProps>({
    theme: '',
    toggleTheme: () => { },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>('');

    const toggleTheme = () => {
        const newTheme = theme === '' ? 'dark' : '';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme || '');
    }, []);

    return (
        <AppContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
