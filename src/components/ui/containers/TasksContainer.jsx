import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setCurrentGroupTasks } from '../../../store/reducers/TaskGroupSlice';

import CreateTaskButton from '../button/CreateTaskButton';
import Task from '../cards/Task';

import styles from './styles/TasksContainer.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/TaskAnimation.css';

const NoTasksMessage = () => {
    return (
        <div className={styles.no_tasks__message}>
            В этой группе нет задач. Вперед к приключениям :)
        </div>
    )
}

const TasksContainer = () => {
    const dispatch = useDispatch();

    const currentGroupTasks = useSelector(
        state => state.taskGroupStates.currentGroupTasks
    );
    const filter = useSelector(
        state => state.taskGroupStates.taskFilter
    );
    
    const tasks = useSelector(
        state => state.taskGroupStates.tasks
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    useEffect(() => {
        if (filter.length) {
            console.log(filter);
            const currentTasksFilter = tasks.filter(
                task => task.groupId === selectedGroup.id && 
                task.taskName.includes(filter)
            );
            console.log(currentTasksFilter)
            return () => dispatch(setCurrentGroupTasks({tasks: currentTasksFilter}));
        }
        else {
            const currentTasks = tasks.filter(
                task => task.groupId === selectedGroup.id
            );
    
            dispatch(setCurrentGroupTasks({tasks: currentTasks}));
        }
    }, [dispatch, filter, selectedGroup, tasks]);

    // if (!currentGroupTasks.length)
    //     return (
    //         <div className={styles.tasks__container}>
    //             <CreateTaskButton/>
    //             <div className={styles.no_tasks__message}>
    //                 В этой группе нет задач. Вперед к приключениям :)
    //             </div>
    //         </div>
    //     );


    return (
        <div className={styles.tasks__container}>
            <CreateTaskButton/>
                {
            <TransitionGroup style={{paddingLeft: '0.5rem'}}>
                {
                    currentGroupTasks.length ?
                    currentGroupTasks.map((task, index) => 
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="item"
                            appear={isMounted}
                        >
                            <Task
                                key={index}
                                taskData={task}
                            />
                        </CSSTransition>
                    )
                        :
                        <NoTasksMessage/>

                }
            </TransitionGroup>
                }
        </div>
    );
};

export default TasksContainer;