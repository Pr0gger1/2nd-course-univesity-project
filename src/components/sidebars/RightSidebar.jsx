import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';
import { updateTaskData } from '../../store/reducers/TaskSlice';

import CloseIcon from '@mui/icons-material/Close';
import InputField from '../ui/input/InputField';
import TaskNameSection from "../ui/TaskInfo/TaskNameSection";
import SubTaskContainer from "../ui/containers/SubTaskContainer";
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

    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    // const taskGroups = useSelector(
    //     state => state.taskGroupStates.allTaskGroups.base.concat(
    //         state.taskGroupStates.allTaskGroups.custom
    //     )
    // );
    const [taskData, setTaskData] = useState({
        id: selectedTask.id,
        groupId: selectedTask.groupId,
        taskName: selectedTask.taskName,
        favorite: selectedTask.favorite,
        createdAt: selectedTask.createdAt,
        completed: selectedTask.completed,
        subTasks: selectedTask.subTasks,
        category: selectedTask.category,
        deadline: selectedTask.deadline,
        repeatTask: selectedTask.repeat,
        remindTask: selectedTask.reminder,
        taskNotes: selectedTask.notes
    });

    // const [showButton, setShowButton] = useState(true);
    // const [showInput, setShowInput] = useState(false);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    // const onTaskCategoryClick = () => {
    //
    // }

    // const onTaskCheckboxChange = () => {
    //     const completed = !taskData.completed;
    //     setTaskData({...taskData, completed});
    //
    //     dispatch(updateTaskData({
    //         taskData: {...selectedTask, completed}
    //     }));
    // }

    useEffect(() => {
        dispatch(updateTaskData({taskData}))
    }, [dispatch, taskData]);

    useEffect(() => {
        if (!isRSidebarOpened)
            navigate(`/tasks/${selectedTaskGroup.id}`)
    }, [isRSidebarOpened, navigate, selectedTaskGroup.id]);


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

                {
                    taskData.subTasks &&
                    taskData.subTasks.length !== 0 &&
                    <SubTaskContainer taskId={selectedTask.id}/>
                }
                <TaskNameSection
                    taskData={taskData}
                    setTaskData={setTaskData}
                />

                <TaskCategorySection/>
                
                <div className={styles.date_and_repeat}>
                    <InputField className={styles.deadline}
                        type="date"
                    />

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