import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFilteredTasks } from '../../../hooks/useFilteredTasks';
import useGroupTasks from "../../../hooks/useGroupTasks";
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
import * as selectors from "../../../store";

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

    const tasks = useSelector(selectors.tasksSelector);
    const filter = useSelector(selectors.filterSelector);

    const currentGroupTasks = useSelector(selectors.currentGroupTasksSelector);
    const selectedTaskGroup = useSelector(selectors.selectedTaskGroupSelector);

    // функция, которая фильтрует массив задач в соответствии с выбранной группой
    const setCurrentTasks = useGroupTasks(tasks, selectedTaskGroup);

    // Конечный массив с отсортированными задачами
    const sortedTasks = useFilteredTasks(currentGroupTasks, filter.taskFilter);
    const completedTasks = sortedTasks.filter(task => task.completed);

    const taskLoading = useSelector(
        state => state.taskStates.loading
    );

    useNotification();
    useEffect(() => {
        dispatch(setCurrentGroupTasks({tasks: setCurrentTasks()}));
    }, [dispatch, selectedTaskGroup, setCurrentTasks, tasks]);

    return (
        <div className={styles.tasks__container}>
            {
                selectedTaskGroup.id !== baseGroupIds.completed &&
                <CreateTaskButton/>
            }
            {
                taskLoading ?
                    <CircularProgress sx={{margin: '0 auto'}}/>
                :
                <>
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
                </>
            }
        </div>
    );
};

export default TaskContainer;