import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../../store/reducers/SidebarSlice';
import { setSelectedTask, updateTaskData } from "../../../store/reducers/TaskSlice";

import StarButton from "../button/StarButton";

import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Checkbox from '@mui/material/Checkbox';

import { themes } from "../../../store/reducers/ThemeSlice";
import styles from './styles/Task.module.scss';

const Task = ({ taskDataProps }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentTheme = useSelector(state => state.themeState.theme);

    const [isTaskCompleted, setIsTaskCompleted] = useState(taskDataProps.completed);

    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );

    useEffect(() => {
        console.log(taskDataProps)
    }, [taskDataProps])

    const taskStyle = {
        textDecoration: taskDataProps.completed ? 'line-through' : 'none',
    };

    const onTaskClick = () => {
        if (selectedTask.id !== taskDataProps.id) {
            /* эта ветка нужна, чтобы при нажатии на другую задачу сайдбар
            не закрывался, а изменял данные внутри
            */

            // Изменяем состояние выбранной задачи, если нажмем на другую задачу
            dispatch(setSelectedTask({taskData: taskDataProps}));

            // если сайдбар был закрыт, то открываем его
            if (!isRSidebarOpened) dispatch(setRSidebarOpen());
        }
        else {
            dispatch(setRSidebarOpen());
            dispatch(setSelectedTask({taskData: taskDataProps}));
        }
        navigate(`/tasks/${selectedGroup.id}/${taskDataProps.id}`);

    }

    const favoriteToggleHandler = event => {
        event.stopPropagation();

        const favorite = !taskDataProps.favorite;
        dispatch(updateTaskData({
            taskData: {...taskDataProps, favorite}
        }));

    }

    const onTaskCheckboxClick = event => {
        event.stopPropagation();

        const completed = !isTaskCompleted;
        dispatch(updateTaskData({
            taskData: {...taskDataProps, completed}
        }));

        setIsTaskCompleted(completed);
    }

    return (
        <div className={styles.task}
            onClick={onTaskClick}
             style={isTaskCompleted && currentTheme === themes.light ? {backgroundColor: '#dcfce3'} : {}}
        >

            <div className={styles.task__checkbox_info}>
                <Checkbox 
                    sx={{
                        color: "var(--checkboxColor)",
                        '& .MuiSvgIcon-root': {
                            fontSize: 30,
                            borderRadius: "15px"
                        },
                        '&.Mui-checked': {
                            color: '#68d96d',
                        }
                    }}
                    onClick={onTaskCheckboxClick}
                    checked={taskDataProps.completed || isTaskCompleted}
                />

                <div className={styles.task__info}>
                    <span 
                        style={taskStyle}
                        className={styles.task__title}
                    >
                        {taskDataProps.taskName}
                    </span>
                    
                    <div className={styles.task__tags}>
                        <span className={styles.group_title}>
                            {taskDataProps.category}
                        </span>
                        {
                            taskDataProps.repeat &&
                            <span className={styles.task__repeat}>
                                <SyncRoundedIcon className={styles.task__icons}/>
                            </span>
                        }
                        {
                            taskDataProps.deadline &&
                            <span className={styles.task__deadline}>
                                <CalendarMonthOutlinedIcon className={styles.task__icons}/>
                            </span>
                        }
                    </div>
                </div>
            </div>

            <StarButton
                onClick={favoriteToggleHandler}
                isFavorite={taskDataProps.favorite}
            />
        </div>
    )
}

export default Task;