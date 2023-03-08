import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux';
import { setRSidebarOpen } from '../../../store/reducers/SidebarSlice';
import {setSelectedTask, updateCompleteTask, updateFavoriteTask, updateTaskData} from "../../../store/reducers/TaskGroupSlice";

import StarIcon from '@mui/icons-material/StarRounded';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Checkbox from '@mui/material/Checkbox';

import styles from './styles/Task.module.css';

const Task = ({ taskDataProps }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [IsTaskCompleted, setIsTaskCompleted] = useState(false);

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const taskStyle = {
        textDecoration: taskDataProps.completed ? 'line-through' : 'none',
    };

    const onTaskClick = () => {
        dispatch(setRSidebarOpen());
        dispatch(setSelectedTask({taskData: taskDataProps}));
        navigate(`/tasks/${selectedGroup.id}/${taskDataProps.taskId}`);
    }

    const onFavoriteToggle = event => {
        event.stopPropagation();

        const data = {
            ...taskDataProps, favorite: !taskDataProps.favorite
        }

        dispatch(updateTaskData({
            taskData: data
        }));
    }

    useEffect(() => {
        const data = {
            data: { ...taskDataProps, completed: IsTaskCompleted}
        }

        dispatch(updateTaskData({
            taskData: {...data}
        }))
    }, [dispatch, taskDataProps, taskDataProps.taskId, IsTaskCompleted]);

    
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
                    onClick={e => e.stopPropagation()}
                    checked={taskDataProps.completed}
                    onChange={e => setIsTaskCompleted(e.target.checked)}
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
                            // taskData.repeat ?
                            <span className={styles.task__repeat}>
                                <SyncRoundedIcon className={styles.task__icons}/>
                            </span>
                            // : null
                        }
                        {
                            // taskData.deadline ?
                            <span className={styles.task__deadline}>
                                <CalendarMonthOutlinedIcon className={styles.task__icons}/>
                            </span>
                            // : null
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