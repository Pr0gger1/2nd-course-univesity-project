import React from 'react';

import MobileHeader from "../../header/MobileHeader";
import MobileContent from "../../content/MobileContent";

import homePageStyles from '../styles/HomePage.module.scss';
const MobileHomePage = () => {
    return (
        <main className={homePageStyles}>
            <MobileHeader/>
            <MobileContent/>
        </main>
    );
};

export default MobileHomePage;