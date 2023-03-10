import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';

import Button from '../ui/button/Button';
// import InputField from '../ui/input/InputField';
import CloseIcon from '@mui/icons-material/Close';
// import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';

import DatePicker from 'react-widgets/DatePicker';
import styles from './styles/RightSidebar.module.css';
import "react-widgets/styles.css";

// import reminderIcon from '../../assets/img/icons/reminder_icon.svg';
import CheckboxInput from '../ui/input/CheckboxInput';
import { updateTaskData } from '../../store/reducers/TaskGroupSlice';


const RightSidebar = () => {
    const dispatch = useDispatch();
    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );
    
    const selectedTask = useSelector(
        state => state.taskGroupStates.selectedTask
    );

    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.base.concat(state.taskGroupStates.allTaskGroups.custom)
    );

    const [taskNameValue, setTaskNameValue] = useState(selectedTask.taskName);
    const [isTaskCompleted, setIsTaskCompleted] = useState(selectedTask.completed);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    const onTaskCategoryClick = () => {
        
    }

    const onTaskCheckboxClick = () => {
        const completed = !isTaskCompleted;
        dispatch(updateTaskData({
            taskData: {...selectedTask, completed}
        }))
    }


    useEffect(() => {
        setTaskNameValue(selectedTask.taskName)
    }, [selectedTask]);

    // useEffect(() => {

    // }, [])

    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_close__btn}>
                <CloseIcon onClick={() => dispatch(setRSidebarOpen())}/>
            </div>

            <section className={styles.add_task__section}>
                <CheckboxInput
                    placeholder='Ваша задача'
                    inputValue={taskNameValue}
                    checkboxChecked={isTaskCompleted}
                    onCheckboxClick={onTaskCheckboxClick}
                    onChangeInput={e => setTaskNameValue(e.target.value)}
                />

                <div className={styles.add_subtask__btn}>
                    <Button>
                        <AddIcon 
                            className={styles.add_subtask__icon}
                            sx = {{
                                fontSize: 32,
                                color: 'var(--addSubtaskIconColor)'
                            }}
                        />
                        <span>Добавить подзадачу</span>
                    </Button>
                </div>

            </section>

            <section className={styles.task_category__section}>
                <select className={styles.choose_group} name="" id="">
                    {
                        taskGroups.map((group, index) => 
                            <option selected={selectedTask.category === group.id}
                                value={group.id}
                                key={index}
                                onClick={onTaskCategoryClick}
                            >
                                {group.title}
                            </option>    
                        )
                    }
                </select>
            </section>
                        
            
            <div className={styles.date_and_repeat}>
                {/* <DatePicker
                    placeholderText="idi nahui"
                    showIcon
                    dateFormat='dd/MM/yyyy'
                    selected={new Date()}
                    customInput={<CustomInputCalendar/>}
                /> */}
                <DatePicker 
                defaultValue={new Date()}

                />


                <select className={styles.repeat}
                    defaultValue={'default'}>
                    <option disabled
                        value='default'
                    >
                        Повтор
                        </option>
                </select>
            </div>

            {/* <InputField 
                className={styles.reminder}
                placeholder="Напоминание"
            /> */}
            
            {/* <InputFieldWithIcon inputIcon={reminderIcon}/> */}

            <textarea 
                className={styles.notes}
                placeholder="Ваши заметки"
                onInput={e => textAreaAdjust(e)}
            >

            </textarea>
        </aside>
    );
};

export default RightSidebar;