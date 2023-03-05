import React, { useEffect, useState } from 'react';
import CreateTaskButton from '../button/CreateTaskButton';
import styles from './styles/TasksContainer.module.css';
import Task from '../cards/Task';
import {useSelector} from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TasksContainer = () => {
    const [currentGroupTasks, setCurrentGroupTasks] = useState([]);
    const tasks = useSelector(
        state => state.taskGroupStates.tasks
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    
    let groupTasks = tasks.length ?
    tasks.filter(task => task.id === selectedGroup.id)
    : null;

    // useEffect(() => {
    //     console.log(selectedGroup);
    // }, [selectedGroup])

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    
    useEffect(() => {
        setCurrentGroupTasks(tasks.length ?
            tasks.filter(task => task.id === selectedGroup.id)
        : null);

    }, [selectedGroup, tasks]);


    // const tasks = [
    //     {
    //         id: 1,
    //         taskName: 'Task 1',
    //         completed: false,
    //         category: 'Group 1',
    //         subTasks: [],
    //         notes: '',
    //         deadline: null,
    //         repeat: null,
    //         reminder: null,
    //         favorite: true
    //     },
    //     {
    //         id: 2,
    //         taskName: 'Task 2',
    //         completed: false,
    //         category: 'Group 1',
    //         subTasks: [],
    //         notes: '',
    //         deadline: null,
    //         repeat: null,
    //         reminder: null,
    //         favorite: false
    //     },
    //     {
    //         id: 3,
    //         taskName: 'Task 3',
    //         completed: true,
    //         category: 'Group 1',
    //         subTasks: [],
    //         notes: '',
    //         deadline: null,
    //         repeat: null,
    //         reminder: null ,
    //         favorite: false
    //     }
    // ];

    return (
        <div className={styles.tasks__container}>
            <CreateTaskButton/>
            {/* <TransitionGroup> */}
                {
                    groupTasks ?
                    groupTasks.map((task, index) =>
                        <Task
                            key={index}
                            taskData={task}
                        />
                    )
                        : null
                }
            {/* </TransitionGroup> */}

        </div>
    );
};

export default TasksContainer;