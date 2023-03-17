import React from 'react';
import { useSelector } from 'react-redux';
import CheckboxInputField from '../input/CheckboxInputField';

import styles from './styles/SubTaskContainer.module.scss';

const SubTaskContainer = ({ taskId }) => {
    const subTasks = useSelector(
        state => state.tasksStates.tasks.find(
            task => task.id === taskId
        ).subTasks
    );

    return (
        <div className={styles.subtask__container}>
            {
                subTasks && subTasks.length &&
                subTasks.map(subTask => 
                    <CheckboxInputField
                        inputValue={subTask.taskName}
                        checkboxChecked={subTasks.completed}
                    />
                )
            }
        </div>
    );
};

export default SubTaskContainer;