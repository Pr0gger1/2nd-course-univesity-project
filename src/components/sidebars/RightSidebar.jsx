import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';
import {setSelectedTask, updateTaskData} from '../../store/reducers/TaskSlice';

import CloseIcon from '@mui/icons-material/Close';
import InputField from '../ui/input/InputField';
import TaskNameSection from "../ui/TaskInfo/TaskNameSection";
import TaskCategorySection from "../ui/TaskInfo/TaskCategorySection";

import '../ui/animations/Button/createListBtnAnimation.css'

import styles from './styles/RightSidebar.module.scss';

const RightSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );
    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );
    const customGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.custom
    );
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const [taskData, setTaskData] = useState({
        id: selectedTask.id,
        groupId: selectedTask.groupId,
        taskName: selectedTask.taskName,
        completed: selectedTask.completed,
        favorite: selectedTask.favorite,
        createdAt: selectedTask.createdAt,
        subTasks: selectedTask.subTasks,
        category: selectedTask.category,
        deadline: selectedTask.deadline,
        repeat: selectedTask.repeat,
        reminder: selectedTask.reminder,
        notes: selectedTask.notes
    });

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    useEffect(() => {
        dispatch(updateTaskData({taskData}));
        dispatch(setSelectedTask({taskData}));
    }, [dispatch, taskData]);

    useEffect(() => {
        setTaskData(selectedTask)
    }, [selectedTask]);

    useEffect(() => {
        if (!isRSidebarOpened) {
            navigate(`/tasks/${selectedTaskGroup.id}`)
            dispatch(setSelectedTask({taskData: {}}))
        }
    }, [dispatch, isRSidebarOpened, navigate, selectedTaskGroup.id]);

    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_container}>
                <div className={styles.sidebar_close__btn}>
                    <CloseIcon 
                        onClick={() => dispatch(setRSidebarOpen())}
                    />
                </div>

                <TaskNameSection
                    taskData={
                    Object.values(taskData).every(val => val === undefined)
                        ? {...selectedTask} : {...taskData}
                }
                    setTaskData={setTaskData}
                />

                {
                    customGroups.length !== 0 &&
                    <TaskCategorySection
                        taskData={
                        Object.values(taskData).every(val => val === undefined)
                            ? {...selectedTask} : {...taskData}
                    }
                        setTaskData={setTaskData}
                    />
                }

                <div className={styles.date_and_repeat}>
                    <InputField className={styles.deadline}
                        type="date"
                    />

                    <select className={styles.repeat}
                        defaultValue='default'>
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