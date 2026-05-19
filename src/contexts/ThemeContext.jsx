import { useState, useEffect, createContext } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light'); // 'light' | 'dark'

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };