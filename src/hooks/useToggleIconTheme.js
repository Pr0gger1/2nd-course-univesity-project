import { useMemo } from "react";
import { themes } from "../store/reducers/ThemeSlice";


const useToggleIconTheme = (lightIcon, darkIcon, theme) => {
    return useMemo(()=> {
         if (theme === themes.light) return darkIcon;
        else return lightIcon;
    }, [darkIcon, lightIcon, theme]);
}
export default useToggleIconTheme;