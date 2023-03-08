import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setCurrentGroupTasks } from '../../../store/reducers/TaskGroupSlice';

import { baseGroupIds } from '../../../store/defaultData/baseGroups';

import CreateTaskButton from '../button/CreateTaskButton';
import Task from '../cards/Task';

import styles from './styles/TasksContainer.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../animations/Task/TaskAnimation.css';

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
        state => state.filterStates.searchFilter
    );
    
    const tasks = useSelector(
        state => state.taskGroupStates.tasks
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const [hasTasks, setHasTasks] = useState(!!currentGroupTasks.length);

    useEffect(() => {
        setHasTasks(currentGroupTasks.length > 0);
    }, [currentGroupTasks]);

    useEffect(() => {
        if (filter && filter.length) {
            const currentTasksFilter = tasks.filter(
                task => task.groupId === selectedGroup.id && 
                task.taskName.includes(filter)
            );

            dispatch(setCurrentGroupTasks({tasks: currentTasksFilter}));
        }

        else {
            const currentTasks = tasks.filter(
                task => task.groupId === selectedGroup.id
            );
            dispatch(setCurrentGroupTasks({tasks: currentTasks}));
        }

        console.log(tasks)
    }, [dispatch, filter, selectedGroup, tasks]);


    useEffect(() => {
        // если активная группа - все задачи,
        // помещаем в массив все существующие задачи
        if (selectedGroup.id === baseGroupIds.all) {
            dispatch(setCurrentGroupTasks({tasks}))
        }
    }, [dispatch, selectedGroup, tasks])


    return (
        <div className={styles.tasks__container}>
            {
                selectedGroup.id !== baseGroupIds.completed &&
                <CreateTaskButton/>
            }
            {
                !hasTasks && <NoTasksMessage/>
            }
            {
            <TransitionGroup style={{paddingLeft: '0.5rem'}}>
                {
                    hasTasks && (
                    currentGroupTasks.map((task, index) => 
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="item"
                            mountOnEnter
                        >
                            <Task
                                key={index}
                                taskData={task}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
            }
        </div>
    );
};

export default TasksContainer;