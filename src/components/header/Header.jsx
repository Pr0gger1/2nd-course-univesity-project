import React, {useContext} from "react";
import styles from "./Header.module.css";

import ImgButton from "../ui/button/ImgButton";

import MenuIcon from "@mui/icons-material/Menu";
import {StyledBadge} from "../pages/HomePage";

import themeIconLight from "../../assets/img/icons/theme_icon_light.svg";
import themeIconDark from "../../assets/img/icons/theme_icon_dark.svg";
import notificationIconLight from "../../assets/img/icons/bell_light.svg";
import notificationIconDark from "../../assets/img/icons/bell_dark.svg";
import settingsIconLight from "../../assets/img/icons/settings_light.svg";
import settingsIconDark from "../../assets/img/icons/settings_dark.svg";
import themeContext from "../../context/theme.context";

import { themes } from "../../context/theme.context";
import adaptiveUi from "../../context/adaptiveUi.context";

export const Header = () => {
    const {theme, setTheme} = useContext(themeContext);
    const {sidebars} = useContext(adaptiveUi);

    const changeThemeHandler = () => {
        const currentTheme = localStorage.getItem("theme");
        setTheme(
            currentTheme === "light" 
            ? themes.dark : themes.light
            );
    }

    const toggleMenuHandler = () => {
        sidebars.setIsLeftSidebarOpened(prev => !prev);
    }

    return (
        <header className={styles.header__app}>
                <div className={styles.hamburger_menu__btn}>
                    <MenuIcon
                        onClick={() => toggleMenuHandler()}
                        sx={{
                            fontSize: 30
                    }}/>
                </div>

                <div className={styles.settings__buttons}>
                    <ImgButton
                        onClick={() => changeThemeHandler()}
                        src={
                            theme === "light"
                            ? themeIconLight : themeIconDark
                        }
                        alt="theme button"
                    />

                    <StyledBadge badgeContent={2}>
                        <ImgButton
                            src={
                                theme === "light"
                                ? notificationIconLight : notificationIconDark
                        }
                            alt="notification button"
                        />
                    </StyledBadge>

                    <ImgButton
                        src={
                            theme === "light"
                            ? settingsIconLight : settingsIconDark
                        }
                        alt="settings icon"
                    />
                </div>
            </header>
    );
}