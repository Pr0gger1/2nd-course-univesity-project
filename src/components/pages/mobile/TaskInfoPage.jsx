import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskData } from "../../../store/reducers/TaskSlice";

import TaskNameSection from "../../ui/TaskInfo/TaskNameSection";
import TaskDatesSection from "../../ui/TaskInfo/TaskDatesSection";
import TaskNotesSection from "../../ui/TaskInfo/TaskNotesSection";
import TaskCategorySection from "../../ui/TaskInfo/TaskCategorySection";
import BackButton from "../../ui/button/BackButton";
import Header from '../../header/Header';

import styles from './styles/TaskInfoPage.module.scss';


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

    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );


    // при обновлении локального состояния, также обновляем глобальный
    useEffect(() => {
        dispatch(updateTaskData({taskData}));
    }, [dispatch, taskData]);

    useEffect(() => {
        if (!Object.keys(selectedTask).length)
            navigate(`/tasks/${selectedTaskGroup.id}`);
    }, [navigate, selectedTaskGroup, selectedTask]);


    useEffect(() => {
        console.log(taskData);
    }, [taskData])

    return (
        <main className={styles.main__container}>
            <Header/>

            <div className={styles.content}>
                <BackButton
                    to={`/tasks/${selectedTaskGroup.id}`}
                />

                <TaskNameSection
                    taskData={taskData}
                    setTaskData={setTaskData}
                />
                <TaskCategorySection
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