import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../store/reducers/ThemeSlice";

const useToggleIconTheme = (lightIcon, darkIcon) => {
    const currentTheme = useSelector(
        state => state.themeState.theme
    );

    return useMemo(()=> {
         if (currentTheme === themes.light) return lightIcon;
        else return darkIcon;
    }, [darkIcon, lightIcon, currentTheme]);
}
export default useToggleIconTheme;