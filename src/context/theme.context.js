import { createContext } from "react";


export const themes = {
    dark: "dark",
    light: "light"
}
const themeContext = createContext({
    theme: themes.light,
    setTheme: () => {}
})

export default themeContext;