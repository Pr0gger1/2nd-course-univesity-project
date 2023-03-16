import React from 'react';

import BaseGroupContainer from "../../ui/containers/BaseGroupContainer";
import CustomGroupContainer from "../../ui/containers/CustomGroupContainer";
import CreateListButton from "../../ui/button/CreateListButton";

import styles from '../styles/HomePage.module.scss';
import Header from "../../header/Header";

const MobileHomePage = () => {
    return (
         <main className={styles.main__container}>
             <Header/>
             <div className={styles.content__wrapper_mobile}>
               <BaseGroupContainer
                    customStyles={{
                        gap: '1rem'
                    }}
               />

                <CustomGroupContainer/>
                <div className={styles.list_btn__container}>
                    <CreateListButton/>
                </div>
             </div>
        </main>
    );
};
export default MobileHomePage;