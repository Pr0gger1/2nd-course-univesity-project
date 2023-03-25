import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles/TaskGroup.module.scss';
import {baseGroupIds} from "../../../store/defaultData/baseGroups";

const TaskGroup = ({ taskGroupData, onClick }) => {
    const [tasksCount, setTasksCount] = useState(0);

    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    const tasks = useSelector(
    state => state.taskStates.tasks
    );

    useEffect(() => {
        if (tasks)  {
            // console.log(tasks);
            let count = tasks.filter(
                task => task.groupId === taskGroupData.id
            ).length;

            if (taskGroupData.id === baseGroupIds.all)
                count = tasks.length;

            else if (taskGroupData.id === baseGroupIds.favorite)
                count = tasks.filter(task => task.favorite).length;

            setTasksCount(count);
        }
    }, [taskGroupData.id, tasks]);

    let groupStyle = `${styles.group}${taskGroupData.isActive ? ` ${styles['active']}`: ''}${!isLSidebarOpened ? ` ${styles['closed']}` : ''}`;

    return (
        <div 
            className={groupStyle}
            onClick={onClick}
        >
            <div className={styles.icon_title}>
                <img src={taskGroupData.icon}
                     alt={`${taskGroupData.title}_icon`}
                     className={styles.group__icon}
                />
                <p>{ taskGroupData.title }</p>
            {
                tasksCount !== 0 &&
                <div className={styles.counter}>
                    {tasksCount}
                </div>
            }
            </div>
        </div>
    );
};

export default TaskGroup;