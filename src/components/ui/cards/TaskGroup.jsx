import React from 'react';
import { useSelector } from 'react-redux';

import styles from './styles/TaskGroups.module.scss';

const TaskGroup = ({ title, icon, counter, isActive, onClick }) => {
    const sidebarState = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    const groupAdaptiveStyle = sidebarState
                ? {} : {justifyContent: "center", alignItems: 'center'}

    let groupStyle = `${styles.group}${isActive ? ` ${styles['active']}`: ''}${!sidebarState ? ` ${styles['closed']}` : ''}`;

    return (
        <div 
            className={groupStyle}
            style={groupAdaptiveStyle}
            onClick={onClick}
        >
            <div className={styles.icon_title}>
                <img src={icon} alt={`${title}_icon`} className={styles.group__icon}/>
                <p>{ title }</p>
            {
                counter !== 0 &&
                <div className={styles.counter}>
                    {counter}
                </div>
            }
            </div>
        </div>
    );
};

export default TaskGroup;