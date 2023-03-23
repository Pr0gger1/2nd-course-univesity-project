import { useMemo } from "react";
import { themes } from "../store/reducers/ThemeSlice";

const useToggleIconTheme = (lightIcon, darkIcon, theme) => {
    return useMemo(()=> {
         if (theme === themes.light) return lightIcon;
        else return darkIcon;
    }, [darkIcon, lightIcon, theme]);
}
export default useToggleIconTheme;