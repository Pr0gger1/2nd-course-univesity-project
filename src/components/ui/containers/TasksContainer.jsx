import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setCurrentGroupTasks } from '../../../store/reducers/TaskSlice';

import { baseGroupIds } from '../../../store/defaultData/baseGroups';

import CreateTaskButton from '../button/CreateTaskButton';
import Task from '../cards/Task';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './styles/TasksContainer.module.scss';
import '../animations/Task/TaskAnimation.css';
import {useTask} from "../../../hooks/useTask";

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
        state => state.tasksStates.currentGroupTasks
    );
    const tasks = useSelector(
        state => state.tasksStates.tasks
    );
    const taskFilter = useSelector(
        state => state.filterStates.taskFilter
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const sortedTasks = useTask(currentGroupTasks, taskFilter);

    
    // useEffect(() => {
    //     console.log(currentGroupTasks.createdAt)
    // }, [currentGroupTasks])

    useEffect(() => {
        let currentTasks = [...tasks].filter(
            task => task.groupId === selectedGroup.id
        );

        if (selectedGroup.id === baseGroupIds.all)
            currentTasks = tasks;

        if (selectedGroup.id === baseGroupIds.plan)
            currentTasks = tasks.filter(task => task.deadline);

        if (selectedGroup.id === baseGroupIds.favorite)
            currentTasks = tasks.filter(task => task.favorite);

        if (selectedGroup.id === baseGroupIds.completed)
            currentTasks = tasks.filter(task => task.completed);

        dispatch(setCurrentGroupTasks({tasks: currentTasks}));

    }, [dispatch, selectedGroup, taskFilter.type, tasks]);


    return (
        <div className={styles.tasks__container}>
            {
                selectedGroup.id !== baseGroupIds.completed &&
                <CreateTaskButton/>
            }
            {
                !currentGroupTasks.length && <NoTasksMessage/>
            }

            <TransitionGroup style={{paddingLeft: '0.5rem'}}>
                {
                    sortedTasks && sortedTasks.length > 0 && (
                    sortedTasks.map((task, index) =>
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="item"
                            mountOnEnter
                        >
                            <Task
                                key={task.id}
                                taskDataProps={task}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </div>
    );
};

export default TasksContainer;