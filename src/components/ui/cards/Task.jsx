import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../../store/reducers/SidebarSlice';
import { setSelectedTask, updateTaskData } from "../../../store/reducers/TaskGroupSlice";

import StarIcon from '@mui/icons-material/StarRounded';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Checkbox from '@mui/material/Checkbox';

import styles from './styles/Task.module.css';

const Task = ({ taskDataProps }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [isTaskCompleted, setIsTaskCompleted] = useState(taskDataProps.completed);
    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const selectedTask = useSelector(
        state => state.taskGroupStates.selectedTask
    );

    const taskStyle = {
        textDecoration: isTaskCompleted ? 'line-through' : 'none',
    };

    const onTaskClick = () => {
        if (selectedTask.taskId !== taskDataProps.taskId) {
            /* эта ветка нужна, чтобы при нажатии на другую задачу сайдбар
            не закрывался, а изменял данные внутри
            */

            // Изменяем состояние выбранной задачи, если нажмем на другую задачу
            dispatch(setSelectedTask({taskData: taskDataProps}));

            // если сайдбар был закрыт, то открываем его
            if (!isRSidebarOpened) dispatch(setRSidebarOpen());

            navigate(`/tasks/${selectedGroup.id}/${taskDataProps.taskId}`);
        }
        else {
            dispatch(setRSidebarOpen());
            dispatch(setSelectedTask({taskData: taskDataProps}));
            navigate(`/tasks/${selectedGroup.id}/${taskDataProps.taskId}`);
        }

    }

    const onFavoriteToggle = event => {
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
            onClick={() => onTaskClick()}>

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
                    onClick={e => onTaskCheckboxClick(e)}
                    checked={isTaskCompleted}
                />

                <div className={styles.task__info}>
                    <span 
                        style={taskStyle}
                        className={styles.task_title}
                    >
                        {taskDataProps.taskName}
                    </span>
                    
                    <div className={styles.task__tags}>
                        <span className={styles.group_title}>
                            {taskDataProps.category}
                        </span>
                        {
                            // taskData.repeat &&
                            <span className={styles.task__repeat}>
                                <SyncRoundedIcon className={styles.task__icons}/>
                            </span>
                        }
                        {
                            // taskData.deadline &&
                            <span className={styles.task__deadline}>
                                <CalendarMonthOutlinedIcon className={styles.task__icons}/>
                            </span>
                        }
                    </div>
                </div>
            </div>
            {
                taskDataProps.favorite ? 
                <StarIcon sx={{
                    color: "#ffc107",
                    fontSize: 32,
                    borderRadius: "15px"
                    }}
                    onClick={e => onFavoriteToggle(e)}
                />
                
                : <StarBorderIcon
                    sx={{
                        fontSize: 32,
                        color: 'var(--starColor)'
                    }}
                    onClick={e => onFavoriteToggle(e)}
                />
            }
        </div>
    )
}

export default Task;