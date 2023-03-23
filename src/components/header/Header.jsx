import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from 'react-redux';
import useToggleIconTheme from "../../hooks/useToggleIconTheme";

import { setTheme } from "../../store/reducers/ThemeSlice";

import TaskGroupMenuContainer from "../ui/contextMenu/task_page/TaskGroupMenuContainer";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";
import NotificationWindow from "./components/notifications/NotificationWindow";
import SettingsWindow from "./components/settings/SettingsWindow";
import ImgButton from "../ui/button/ImgButton";

import { StyledBadge } from "../ui/customComponents/CustomBadge";

import themeIconLight from "../../assets/img/icons/theme_icon_light.svg";
import themeIconDark from "../../assets/img/icons/theme_icon_dark.svg";
import notificationIconLight from "../../assets/img/icons/bell_light.svg";
import notificationIconDark from "../../assets/img/icons/bell_dark.svg";
import settingsIconLight from "../../assets/img/icons/settings_light.svg";
import settingsIconDark from "../../assets/img/icons/settings_dark.svg";

import styles from "./styles/Header.module.scss";

const Header = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(
        state => state.themeState.theme
    );

    const themeIcon = useToggleIconTheme(themeIconLight, themeIconDark, currentTheme);
    const notificationIcon = useToggleIconTheme(notificationIconLight, notificationIconDark, currentTheme);
    const settingsIcon = useToggleIconTheme(settingsIconLight, settingsIconDark, currentTheme);

    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;
    
    const [settingsAnchor, setSettingsAnchor] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const settingsHandleClick = (event) => {
        setSettingsAnchor(event.currentTarget);
    }

    return (
        <header className={styles.header__app}>
            {
                isMobile ?
                    <TaskGroupMenuContainer />
                    :
                    <HamburgerMenu/>
            }

            <div className={styles.settings__buttons}>
                <ImgButton
                    onClick={() => dispatch(setTheme())}
                    src={themeIcon}
                    alt="theme button"
                />

                <StyledBadge badgeContent={2}>
                    <ImgButton
                        src={notificationIcon}
                        alt="notification button"
                        onClick={handleClick}
                    />

                    <NotificationWindow
                        setAnchor={setAnchorEl}
                        anchor={anchorEl}
                    />
                </StyledBadge>

                <ImgButton
                    src={settingsIcon}
                    alt="settings icon"
                    onClick={settingsHandleClick}
                />
                <SettingsWindow
                    anchor={settingsAnchor}
                    setAnchor={setSettingsAnchor}
                />
            </div>
        </header>
    );
}

export default Header;