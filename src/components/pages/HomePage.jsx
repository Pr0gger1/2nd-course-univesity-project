import React from "react";

import styles from './styles/HomePage.module.css';

import { LeftSidebar } from "../sidebars/LeftSidebar";
import { Header } from "../header/Header";
import Content from "../content/Content";
import RightSidebar from "../sidebars/RightSidebar";

const HomePage = () => {
    return (
        <main className={styles.main__container}>
            <Header/>
            <div className={styles.content__wrapper}>
                <LeftSidebar/>
                <Content/>
                <RightSidebar/>
            </div>
        </main>
    )
}
export default HomePage;