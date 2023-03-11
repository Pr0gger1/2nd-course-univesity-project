import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';
import {setSelectedTask, updateTaskData} from '../../store/reducers/TaskSlice';

import Button from '../ui/button/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CheckboxInput from '../ui/input/CheckboxInput';
import { CSSTransition } from 'react-transition-group';
import '../ui/animations/Button/createListBtnAnimation.css'

// import DatePicker from 'react-widgets/DatePicker';
import styles from './styles/RightSidebar.module.css';
import InputField from '../ui/input/InputField';
import InputFieldWithIcon from '../ui/input/InputFieldWithIcon';
// import "react-widgets/styles.css";


import reminderIcon from '../../assets/img/icons/reminder_icon.svg';
import task from "../ui/cards/Task";


const RightSidebar = () => {
    const dispatch = useDispatch();
    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );
    
    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );

    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.base.concat(
            state.taskGroupStates.allTaskGroups.custom
        )
    );

    const [taskNameValue, setTaskNameValue] = useState(selectedTask.taskName);

    const [isTaskCompleted, setIsTaskCompleted] = useState(selectedTask.completed);

    const tasks = useSelector(
        state => state.tasksStates.tasks
    )

    const [showButton, setShowButton] = useState(true);
    const [showInput, setShowInput] = useState(false);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    const onTaskCategoryClick = () => {
        
    }

    const onTaskCheckboxChange = event => {
        const completed = !isTaskCompleted;
        setIsTaskCompleted(prev => !prev);

        dispatch(updateTaskData({
            taskData: {...selectedTask, completed}
        }));
    }


    useEffect(() => {
        setTaskNameValue(selectedTask.taskName)
        setIsTaskCompleted(selectedTask.completed)

        console.log(selectedTask)
    }, [selectedTask]);

    // useEffect(() => {
    //     setIsTaskCompleted(!isTaskCompleted)
    //     dispatch(setSelectedTask({taskData: tasks.find(task => task.taskId === selectedTask.taskId)}))
    // }, [tasks])


    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_close__btn}>
                <CloseIcon 
                    onClick={() => dispatch(setRSidebarOpen())}
                />
            </div>

            <section className={styles.add_task__section}>
                <CheckboxInput
                    placeholder='Ваша задача'
                    inputValue={taskNameValue}
                    checkboxChecked={isTaskCompleted}
                    onChangeCheckbox={onTaskCheckboxChange}
                    onChangeInput={e => setTaskNameValue(e.target.value)}
                    value={taskNameValue || ''}
                />

                <div className={styles.add_subtask__btn}>
                    {showButton && (
                        <Button onClick={() => setShowInput(true)}>
                            <AddIcon 
                                className={styles.add_subtask__icon}
                                sx = {{
                                    fontSize: 32,
                                    color: 'var(--addSubtaskIconColor)'
                                }}
                            />
                            <span>Добавить подзадачу</span>
                        </Button>
                    )}
                    <CSSTransition
                        in={showInput}
                        timeout={300}
                        classNames="input"
                        unmountOnExit
                        onEnter={() => setShowButton(false)}
                        onExited={() => setShowButton(true)}
                    >
                        <CheckboxInput/>
                    </CSSTransition>
                </div>

            </section>

            <section className={styles.task_category__section}>
                <select className={styles.choose_group} name="" id="">
                    {
                        taskGroups.map((group, index) => 
                            <option
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
                <InputField className={styles.deadline}
                    type="date"
                />
                {/* <DatePicker
                    placeholderText=""
                    showIcon
                    dateFormat='dd/MM/yyyy'
                    selected={new Date()}
                    customInput={<CustomInputCalendar/>}
                /> */}
                {/* <DatePicker 
                defaultValue={new Date()}

                /> */}

                


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
            
            <InputFieldWithIcon inputIcon={reminderIcon}/>

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