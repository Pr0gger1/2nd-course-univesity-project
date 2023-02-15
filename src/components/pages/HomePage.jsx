import React, { useContext } from "react";
import UserDataCard from "../ui/cards/UserDataCard";

import styles from './styles/home_page.module.css';

import testAvatar from "../../assets/test/testAvatar.jpg";

const HomePage = () => {

    return (
        <main className={styles.main__container}>
            <header className={styles.header__app}>
                <div className={styles.hamburger_menu__btn}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.settings__buttons}>

                </div>
            </header>

            <div className={styles.sidebar__left}>
                <div className={styles.user_info__block}>
                    <UserDataCard
                        name="Alexey Bobrov"
                        email="alexeybobrov@gmail.com"
                        photo={testAvatar}
                    />
                </div>
            </div>

            <div className={styles.content}>

            </div>

            <div className={styles.sidebar__right}>

            </div>
        </main>
    )
}
export default HomePage;