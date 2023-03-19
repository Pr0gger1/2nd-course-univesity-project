import React from 'react';
import { useSelector } from 'react-redux';

import styles from './styles/TaskGroups.module.scss';

const TaskGroup = ({ taskGroupData, onClick }) => {
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    // let groupAdaptiveStyle = isLSidebarOpened ? {} : {justifyContent: "center", alignItems: 'center'}


    //let groupStyle = `${styles.group}${taskGroupData.isActive ? ` ${styles['active']}`: ''}${!isLSidebarOpened ? ` ${styles['closed']}` : ''}`;
    let groupStyle = `${styles.group}${taskGroupData.isActive ? ` ${styles['active']}`: ''}${!isLSidebarOpened ? ` ${styles['closed']}` : ''}`;
    return (
        <div 
            className={groupStyle}
            //style={groupAdaptiveStyle}
            onClick={onClick}
        >
            <div className={styles.icon_title}>
                <img src={taskGroupData.icon} alt={`${taskGroupData.title}_icon`} className={styles.group__icon}/>
                <p>{ taskGroupData.title }</p>
            {
                taskGroupData.counter !== 0 &&
                <div className={styles.counter}>
                    {taskGroupData.counter}
                </div>
            }
            </div>
        </div>
    );
};

export default TaskGroup;