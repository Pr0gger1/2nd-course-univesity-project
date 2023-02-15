import React, { useEffect, useState } from "react";
import themeContext from "../context/theme.context";
import { themes } from "../context/theme.context";

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);
    
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.getElementById("root").setAttribute("data-theme", theme);
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