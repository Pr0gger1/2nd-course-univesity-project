import React from 'react';
import styles from './styles/BaseGroup.module.css';

const BaseGroup = ({title, icon, counter, activeClass, onClick}) => {
    return (
        <div 
            className={
                `${styles.group}${activeClass ? ' ' + styles["active"] : ''}`
            }
            onClick={onClick}
        >
            <div className={styles.icon_title}>
                <img src={icon} alt='' className={styles.group_icon}/>
                <div className={styles.group_title}>{title}</div>
            </div>

            {
            counter !== 0 &&
            <div className={styles.counter}>{counter}</div>
            }
        </div>
    );
};

export default BaseGroup;