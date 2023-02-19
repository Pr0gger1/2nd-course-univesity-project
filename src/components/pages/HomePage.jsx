import React from "react";

import styles from './styles/HomePage.module.css';

import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

import {LeftSidebar} from "../sidebars/LeftSidebar";
import {Header} from "../header/Header";
import Content from "../content/Content";
import RightSidebar from "../sidebars/RightSidebar";

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      minWidth: 5,
      right: 7,
      top: 7,
      color: '#fff',
      height: '10px',
      width: '10px',
      backgroundColor: 'var(--notificationBgColor)',
      fontSize: '0.5rem',
      padding: '0',
    },
  }));


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