import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import styles from './styles/Task.module.css';

import StarIcon from '@mui/icons-material/StarRounded';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';

import { useDispatch } from 'react-redux';
import { setRSidebarOpen } from '../../../store/reducers/SidebarSlice';

const Task = ({ taskData }) => {
    const dispatch = useDispatch();


    const taskStyle = {
        textDecoration: taskData.completed ? 'line-through' : 'none',
    };
    
    return (
        <div className={styles.task}
            onClick={() => dispatch(setRSidebarOpen())}>
            <div className={styles.task__info}>
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
                    checked={taskData.completed}
                />
                <span 
                    style={taskStyle}
                    className={styles.task_title}
                >
                    {taskData.taskName}
                </span>

                <span className={styles.group_title}>
                    {taskData.category}
                </span>
            </div>
            {
                taskData.favorite ? 
                <StarIcon sx={{
                    color: "#ffc107",
                    fontSize: 32,
                    borderRadius: "15px"
                }}
                />
                : <StarBorderIcon
                    sx={{
                        fontSize: 32,
                        color: 'var(--starColor)'
                }}
                />
            }
        </div>
    )
}

export default Task;