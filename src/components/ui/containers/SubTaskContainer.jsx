import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubTaskData } from "../../../store/reducers/TaskSlice";
import CheckboxInputField from '../input/CheckboxInputField';

import styles from './styles/SubTaskContainer.module.scss';

const SubTaskContainer = ({ taskId }) => {
    const dispatch = useDispatch();
    const subTasks = useSelector(
        state => state.tasksStates.tasks.find(
            task => task.id === taskId
        ).subTasks
    );

    const onTaskNameChange = (event, subTask) => {
        dispatch(updateSubTaskData({
            parentTaskId: taskId,
            subTaskId: subTask.id,
            subTaskData: {...subTask, taskName: event.target.value}
        }));
    }

    const onCheckboxChange = subTask => {
        const completed = !subTask.completed;

        dispatch(updateSubTaskData({
            parentTaskId: taskId,
            subTaskId: subTask.id,
            subTaskData: {...subTask, completed}
        }));
    }

    return (
        <div className={styles.subtask__container}>
            {
                subTasks && subTasks.length &&
                subTasks.map(subTask => 
                    <CheckboxInputField
                        key={subTask.id}
                        inputValue={subTask.taskName}
                        onChangeInput={e => onTaskNameChange(e, subTask)}
                        onChangeCheckbox={() => onCheckboxChange(subTask)}
                        checkboxChecked={subTask.completed}
                    />
                )
            }
        </div>
    );
};

export default SubTaskContainer;