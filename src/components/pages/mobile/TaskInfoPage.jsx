import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskData } from "../../../store/reducers/TaskSlice";

import Header from '../../header/Header';
import IconButton from '../../ui/button/IconButton';

import WestRoundedIcon from '@mui/icons-material/WestRounded';
import styles from './styles/TaskInfoPage.module.scss';

import TaskNameSection from "../../ui/TaskInfo/TaskNameSection";
import {TaskDatesSection} from "../../ui/TaskInfo/TaskDatesSection";
import {TaskNotesSection} from "../../ui/TaskInfo/TaskNotesSection";

const TaskInfoPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );

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



    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );


    // Если выбранная задача удалена и выполнен переход
    // на страницу, перенаправляем в текущую группу задач
    useEffect(() => {
        if (!Object.keys(selectedTask).length)
            navigate(`/tasks/${selectedGroup.id}`);
    }, [navigate, selectedGroup, selectedTask]);


    // при обновлении локального состояния, также обновляем глобальный
    useEffect(() => {
        dispatch(updateTaskData({taskData}));
        console.log(taskData)
    }, [dispatch, taskData]);

    return (
        <main className={styles.main__container}>
            <Header/>

            <div className={styles.content}>
                <IconButton
                onClick={() => navigate(`/tasks/${selectedGroup.id}`)}
                >
                    <WestRoundedIcon/>
                </IconButton>

                <TaskNameSection
                    taskData={taskData}
                    setTaskData={setTaskData}
                />
                <TaskDatesSection/>
                <TaskNotesSection/>
            </div>
        </main>
    );
};

export default TaskInfoPage;