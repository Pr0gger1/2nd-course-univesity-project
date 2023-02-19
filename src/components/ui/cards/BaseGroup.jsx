import React, {useContext} from 'react';
import styles from './styles/BaseGroup.module.css';
import UIStates from "../../../context/UIStates.context";

const BaseGroup = ({title, icon, counter, activeClass, onClick}) => {
    const {sidebars} = useContext(UIStates);

    const title_style = sidebars.isLeftSidebarOpened
                        ? {} : {
        display: "none"
    };

    const group_style = sidebars.isLeftSidebarOpened
                ? {} : {justifyContent: "center", alignItems: 'center'}


    return (
        <div 
            className={
                `${styles.group}${activeClass ? ' ' + styles["active"] : ''}`
            }
            style={group_style}
            onClick={onClick}
        >
            <div className={styles.icon_title}>
                <img src={icon} alt='' className={styles.group__icon}/>
                <div className={styles.group__title}
                 style={title_style}
                >
                    {title}
                </div>
            {
                counter !== 0 &&
                <div className={styles.counter}>{counter}</div>
            }
            </div>


        </div>
    );
};

export default BaseGroup;