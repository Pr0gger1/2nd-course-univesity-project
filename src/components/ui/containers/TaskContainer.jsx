import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTask } from '../../../hooks/useTask';
import { useNotification } from "../../../hooks/useNotification";
import { setCurrentGroupTasks } from '../../../store/reducers/TaskSlice';

import { baseGroupIds } from '../../../store/defaultData/baseGroups';

import CreateTaskButton from '../button/CreateTaskButton';
import Task from '../cards/Task';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import '../animations/Task/TaskAnimation.css';
import styles from './styles/TaskContainer.module.scss';

const NoTasksMessage = () => {
    return (
        <div className={styles.no_tasks__message}>
            В этой группе нет задач. Вперед к приключениям :)
        </div>
    );
}


const TaskContainer = () => {
    const dispatch = useDispatch();

    const tasks = useSelector(
        state => state.taskStates.tasks
    );
    const currentGroupTasks = useSelector(
        state => state.taskStates.currentGroupTasks
    );
    const taskFilter = useSelector(
        state => state.filterStates.taskFilter
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const fetchStatus = useSelector(
        state => state.taskStates.status
    );

    useNotification();

    // Конечный массив с отсортированными задачами
    const sortedTasks = useTask(currentGroupTasks, taskFilter);
    const completedTasks = sortedTasks.filter(task => task.completed);

    useEffect(() => {
        if (tasks) {
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
        }

    }, [dispatch, selectedGroup, taskFilter.type, tasks]);

    return (
        <div className={styles.tasks__container}>
            {
                selectedGroup.id !== baseGroupIds.completed &&
                <CreateTaskButton/>
            }
            {
                fetchStatus === 'loading' ?
                    <CircularProgress sx={{margin: '0 auto'}}/>
                :
                <>
                {
                    !sortedTasks.length &&
                    <NoTasksMessage/>
                }
                
                <TransitionGroup 
                    style={{
                        paddingLeft: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    {
                        sortedTasks && sortedTasks.length > 0 && (
                        sortedTasks.filter(task => !task.completed).map((task, index) =>
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

                {
                    completedTasks.length !== 0 &&
                    <Accordion sx={{
                            backgroundColor: 'var(--bgColorFirst)',
                            color: 'var(--fontColor)',
                        }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{color: 'var(--fontColor)'}}/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>
                                Завершенные
                            </Typography>
                        </AccordionSummary>
                        {
                            completedTasks.map((task) =>
                                <AccordionDetails key={task.id}>
                                    <Task
                                        key={task.id}
                                        taskDataProps={task}
                                    />
                                </AccordionDetails>
                                )
                        }
                    </Accordion>
                }
                </>
            }
        </div>
    );
};

export default TaskContainer;