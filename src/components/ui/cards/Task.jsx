import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRSidebarOpen } from '../../../store/reducers/SidebarSlice';

import StarIcon from '@mui/icons-material/StarRounded';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Checkbox from '@mui/material/Checkbox';

import styles from './styles/Task.module.css';

const Task = ({ taskData }) => {
    const dispatch = useDispatch();
    const [taskIsCompleted, setTaskIsCompleted] = useState(false);

    const taskStyle = {
        textDecoration: taskData.completed ? 'line-through' : 'none',
    };

    const onCheckboxChange = (event) => {
        // event.stopPropagation();
        console.log(event.target.checked)
        setTaskIsCompleted(event.target.checked);
    }
    
    return (
        <div className={styles.task}
            onClick={() => dispatch(setRSidebarOpen())}>

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
                    checked={taskIsCompleted}
                    onChange={e => onCheckboxChange(e)}
                />
                <div className={styles.task__info}>
                    <span 
                        style={taskStyle}
                        className={styles.task_title}
                    >
                        {taskData.taskName}
                    </span>
                    
                    <div className={styles.task__tags}>
                        <span className={styles.group_title}>
                            {taskData.category}
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
                taskData.favorite ? 
                <StarIcon sx={{
                    color: "#ffc107",
                    fontSize: 32,
                    borderRadius: "15px"
                    }}
                    onClick={e => e.stopPropagation()}
                />
                : <StarBorderIcon
                    sx={{
                        fontSize: 32,
                        color: 'var(--starColor)'
                    }}
                    onClick={e => e.stopPropagation()}
                />
            }
        </div>
    )
}

export default Task;