import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from 'react-redux';
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";
import { setTheme, themes } from "../../store/reducers/ThemeSlice";

import TaskGroupMenuContainer from "../ui/contextMenu/task_page/TaskGroupMenuContainer";
import ImgButton from "../ui/button/ImgButton";

import Popover from '@mui/material/Popover';
import MenuIcon from "@mui/icons-material/Menu";
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

    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className={styles.header__app}>
            {
                isMobile ?
                    <TaskGroupMenuContainer />
                    :
                    <div className={styles.hamburger_menu__btn}>
                        <MenuIcon
                            onClick={() => dispatch(setLSidebarOpen())}
                            sx={{
                                fontSize: 30
                            }}
                        />
                    </div>
            }

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
                        onClick={handleClick}
                    />
                    <Popover
                        sx={{
                            "& .MuiPaper-root": {
                                backgroundColor: "var(--bgColor)",
                                color: "var(--fontColor)",
                                borderRadius: "8px",
                                padding: "1rem",
                                width: "12rem",
                            },
                            "& .MuiTypography-root": {
                                fontSize: "18px",
                            },
                        }}
                        PaperProps={{
                            style: {
                                // backgroundColor: "var(--bgColorFirst)",
                                backdropFilter: "blur(5px)"
                            }
                        }}
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div className={styles.notification_container}>
                            Уведомление 1
                            Уведомление 2
                            Уведомление 3
                        </div>
                    </Popover>
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

export default Header;