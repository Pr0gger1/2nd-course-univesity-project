import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';
import { updateTaskData } from '../../store/reducers/TaskSlice';

import Button from '../ui/button/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CheckboxInputField from '../ui/input/CheckboxInputField';
import { CSSTransition } from 'react-transition-group';
import '../ui/animations/Button/createListBtnAnimation.css'

import styles from './styles/RightSidebar.module.scss';
import InputField from '../ui/input/InputField';

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
    const [taskData, setTaskData] = useState({
        taskName: selectedTask.taskName,
        completed: selectedTask.completed,
        subTasks: selectedTask.subTasks,
        category: selectedTask.category,
        deadline: selectedTask.deadline,
        repeatTask: selectedTask.repeat,
        remindTask: selectedTask.reminder,
        taskNotes: selectedTask.notes
    });

    const [showButton, setShowButton] = useState(true);
    const [showInput, setShowInput] = useState(false);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    const onTaskCategoryClick = () => {
        
    }

    const onTaskCheckboxChange = () => {
        const completed = !taskData.completed;
        setTaskData({...taskData, completed});

        dispatch(updateTaskData({
            taskData: {...selectedTask, completed}
        }));
    }


    // useEffect(() => {
    //     setTaskData({
    //         ...taskData, taskName: selectedTask.taskName,
    //         completed: selectedTask.completed
    //     })

    //     // console.log(selectedTask)
    // }, [selectedTask, taskData]);

    // useEffect(() => {
    //     setIsTaskCompleted(!isTaskCompleted)
    //     dispatch(setSelectedTask({taskData: tasks.find(task => task.taskId === selectedTask.taskId)}))
    // }, [tasks])


    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_container}>
                <div className={styles.sidebar_close__btn}>
                    <CloseIcon 
                        onClick={() => dispatch(setRSidebarOpen())}
                    />
                </div>

                <section className={styles.add_task__section}>
                    <CheckboxInputField
                        placeholder='Ваша задача'
                        inputValue={taskData.taskName}
                        checkboxChecked={taskData.completed}
                        onChangeCheckbox={onTaskCheckboxChange}
                        onChangeInput={e => setTaskData({...taskData, taskName: e.target.value})}
                        value={taskData.taskName || ''}
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
                            <CheckboxInputField/>
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

                        <option>
                            Каждый день
                        </option>
                            
                        <option>
                            Каждую неделю
                        </option>

                        <option>
                            Каждый месяц
                        </option>
                    </select>
                </div>

                {/* <InputField 
                    className={styles.reminder}
                    placeholder="Напоминание"
                /> */}
                
                {/* <InputFieldWithIcon inputIcon={reminderIcon}/> */}

                <select className={styles.reminder}>
                    <option>
                        Через час
                    </option>

                    <option>
                        Через пять часов
                    </option>

                    <option>
                        Завтра
                    </option>

                    <option>
                        Через неделю
                    </option>
                </select>


                <textarea 
                    className={styles.notes}
                    placeholder="Ваши заметки"
                    onInput={e => textAreaAdjust(e)}
                >

                </textarea>
            </div>
        </aside>
    );
};

export default RightSidebar;