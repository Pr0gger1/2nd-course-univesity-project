import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import CreateTaskButton from '../button/CreateTaskButton';
import Task from '../cards/Task';

import styles from './styles/TasksContainer.module.css';

const TasksContainer = () => {
    const [currentGroupTasks, setCurrentGroupTasks] = useState([]);

    const tasks = useSelector(
        state => state.taskGroupStates.tasks
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    
    useEffect(() => {
        const currentTasks = tasks.filter(
            task => task.groupId === selectedGroup.id
        );

        setCurrentGroupTasks(currentTasks);
    }, [selectedGroup, tasks]);


    return (
        <div className={styles.tasks__container}>
            <CreateTaskButton/>
                {
                    currentGroupTasks ?
                    currentGroupTasks.map((task, index) =>
                        <Task
                            key={index}
                            taskData={task}
                        />
                    )
                        : null
                }
        </div>
    );
};

export default TasksContainer;