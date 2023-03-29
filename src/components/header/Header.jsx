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
import IconButton from "../ui/button/IconButton";
import { StyledBadge } from "../ui/customComponents/CustomBadge";

import themeIconLight from "../../assets/img/icons/theme_icon_light.svg";
import themeIconDark from "../../assets/img/icons/theme_icon_dark.svg";
import notificationIconDark from "../../assets/img/icons/bell_dark.svg";
import notificationIconLight from "../../assets/img/icons/bell_light.svg";
import settingsIconDark from "../../assets/img/icons/settings_dark.svg";
import settingsIconLight from "../../assets/img/icons/settings_light.svg";

import styles from "./styles/Header.module.scss";


const Header = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(
        state => state.notificationState.notifications
    );

    // иконки кнопок
    const themeIcon = useToggleIconTheme(themeIconLight, themeIconDark);
    const notificationIcon = useToggleIconTheme(notificationIconDark, notificationIconLight);
    const settingsIcon = useToggleIconTheme(settingsIconDark, settingsIconLight);

    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;


    const [settingsAnchor, setSettingsAnchor] = useState(null);
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const onNotificationClick = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const onSettingsClick = (event) => {
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
                <IconButton
                    onClick={() => dispatch(setTheme())}
                    imgIcon={themeIcon}
                />

                <StyledBadge badgeContent={notifications.length}>
                    <IconButton
                        imgIcon={notificationIcon}
                        onClick={onNotificationClick}
                    />

                    <NotificationWindow
                        setAnchor={setNotificationAnchor}
                        anchor={notificationAnchor}
                    />
                </StyledBadge>

                <IconButton
                    imgIcon={settingsIcon}
                    onClick={onSettingsClick}
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