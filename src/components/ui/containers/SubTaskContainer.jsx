import React from 'react';
import { useSelector } from 'react-redux';
import SubTask from "../cards/SubTask";

import styles from './styles/SubTaskContainer.module.scss';

const SubTaskContainer = () => {
    const selectedTask = useSelector(
        state => state.taskStates.selectedTask
    );

    return (
        <>
            {
                selectedTask.subTasks &&
                selectedTask.subTasks.length !== 0 &&
                <div className={styles.subtask__container}>
                {
                    selectedTask.subTasks.map(subTask =>
                        <SubTask
                            key={subTask.id}
                            subTaskData={subTask}
                        />
                    )
                }
            </div>
            }
        </>
    );
};

export default SubTaskContainer;