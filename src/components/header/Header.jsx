import React from "react";
import styles from "./Header.module.css";

import ImgButton from "../ui/button/ImgButton";

import MenuIcon from "@mui/icons-material/Menu";
import { StyledBadge } from "../ui/customComponents/CustomBadge";

import themeIconLight from "../../assets/img/icons/theme_icon_light.svg";
import themeIconDark from "../../assets/img/icons/theme_icon_dark.svg";
import notificationIconLight from "../../assets/img/icons/bell_light.svg";
import notificationIconDark from "../../assets/img/icons/bell_dark.svg";
import settingsIconLight from "../../assets/img/icons/settings_light.svg";
import settingsIconDark from "../../assets/img/icons/settings_dark.svg";

import { useDispatch, useSelector } from 'react-redux';
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";
import { setTheme, themes } from "../../store/reducers/ThemeSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.themeState.theme);

    return (
        <header className={styles.header__app}>
            <div className={styles.hamburger_menu__btn}>
                <MenuIcon
                    onClick={() => dispatch(setLSidebarOpen())}
                    sx={{
                        fontSize: 30
                }}/>
            </div>

            <div className={styles.settings__buttons}>
                <ImgButton
                    onClick={() => dispatch(setTheme())}
                    src={
                        currentTheme === themes.light
                        ? themeIconLight : themeIconDark
                    }
                    alt="theme button"
                />

                <StyledBadge badgeContent={2}>
                    <ImgButton
                        src={
                            currentTheme === themes.light
                            ? notificationIconLight : notificationIconDark
                    }
                        alt="notification button"
                    />
                </StyledBadge>

                <ImgButton
                    src={
                        currentTheme === themes.light
                        ? settingsIconLight : settingsIconDark
                    }
                    alt="settings icon"
                />
            </div>
        </header>
    );
}