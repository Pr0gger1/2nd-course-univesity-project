import React, { useContext, useEffect } from "react";

import UserDataCard from "../ui/cards/UserDataCard";
import ImgButton from "../ui/button/ImgButton";
import SearchInput from "../ui/input/SearchInput";

import styles from './styles/home_page.module.css';

import { Badge } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import testAvatar from "../../assets/test/testAvatar.jpg";
import themeIconLight from "../../assets/img/icons/theme_icon_light.svg";
import notificationIconLight from "../../assets/img/icons/bell_light.svg";
import settingsIconLight from "../../assets/img/icons/settings_light.svg";

import themeIconDark from '../../assets/img/icons/theme_icon_dark.svg';
import notificationIconDark from '../../assets/img/icons/bell_dark.svg';
import settingsIconDark from '../../assets/img/icons/settings_dark.svg'

import { styled } from "@mui/material/styles";
import themeContext from "../../context/theme.context";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 11,
      top: 10,
      color: "#fff",
      backgroundColor: "red",
        height: "14px",
      padding: '0 2px',
    },
  }));


const HomePage = () => {
    const {theme, setTheme} = useContext(themeContext);
    // useEffect(() => {
    //     setTheme("dark");
    // }, [])
    return (
        <main className={styles.main__container}>
            <header className={styles.header__app}>
                <div className={styles.hamburger_menu__btn}>
                    <MenuIcon sx={{
                        fontSize: 40
                    }}/>
                </div>

                <div className={styles.settings__buttons}>
                    <ImgButton 
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

            <aside className={styles.sidebar__left}>
                <div className={styles.user_info__block}>
                    <UserDataCard
                        name="Alexey Bobrov"
                        email="alexeybobrov@gmail.com"
                        photo={testAvatar}
                    />
                </div>

                <div className={styles.search_input}>
                    <SearchInput placeholder="Поиск..."/>
                </div>
            </aside>

            <div className={styles.content}>

            </div>

            <div className={styles.sidebar__right}>

            </div>
        </main>
    )
}
export default HomePage;