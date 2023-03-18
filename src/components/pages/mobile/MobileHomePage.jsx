import React from 'react';
import Header from "../../header/Header";
import TaskGroupsContainer from "../../ui/containers/TaskGroupsContainer";

import styles from '../styles/HomePage.module.scss';

const MobileHomePage = () => {
    return (
         <main className={styles.main__container}>
             <Header/>
             
             <div className={styles.content__wrapper_mobile}>
                <TaskGroupsContainer/>
             </div>
        </main>
    );
};

export default MobileHomePage;