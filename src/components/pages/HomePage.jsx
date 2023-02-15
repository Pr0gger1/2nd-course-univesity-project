import React, { useContext } from "react";
import UserDataCard from "../ui/cards/UserDataCard";

import styles from './styles/home_page.module.css';

import MenuIcon from '@mui/icons-material/Menu';
import ImgButton from "../ui/button/ImgButton";
import SearchInput from "../ui/input/SearchInput";

import testAvatar from "../../assets/test/testAvatar.jpg";
import themeIconLightIcon from "../../assets/img/icons/light theme.svg";
import notificationIcon from "../../assets/img/icons/bell.svg";
import { Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const HomePage = () => {

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
                        src={themeIconLightIcon}
                        alt="theme button"
                    />

                    <Badge badgeContent={2}
                        color="primary">
                        <NotificationsIcon/>
                        {/* <ImgButton
                            src={notificationIcon}
                            alt="notification icon"
                        /> */}
                    </Badge>
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
                    <SearchInput/>
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