import React, { useEffect, useState } from "react";
import themeContext from "../context/theme.context";

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-theme", theme);
    }, [theme]);
    
    return (
        <themeContext.Provider value={{
            theme,
            setTheme
        }}>
            { children }
        </themeContext.Provider>
    )
}

export default ThemeProvider;