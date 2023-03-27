import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteSubTaskAsync,
    updateSubTaskAsync
} from "../../../store/reducers/TaskSlice";

import CheckboxInputField from '../input/CheckboxInputField';
import DeleteButton from "../button/DeleteButton";

import styles from './styles/SubTaskContainer.module.scss';

const SubTaskContainer = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.taskStates.selectedTask
    );

    const onTaskNameChange = (event, subTask) => {
        const subTaskData = {
            ...subTask,
            taskName: event.target.value
        }

        dispatch(updateSubTaskAsync({
            taskId: selectedTask.id,
            subTaskId: subTask.id,
            subTaskData
        }));
        // dispatch(updateSubTaskData({
        //     parentTaskId: selectedTask.id,
        //     subTaskId: subTask.id,
        //     subTaskData: {...subTask, taskName: event.target.value}
        // }));
    }

    const onCheckboxChange = subTask => {
        const completed = !subTask.completed;
        const subTaskData = {
            ...subTask, completed
        };
        dispatch(updateSubTaskAsync({
            taskId: selectedTask.id,
            subTaskId: subTask.id,
            subTaskData
        }));
        // dispatch(updateSubTaskData({
        //     parentTaskId: selectedTask.id,
        //     subTaskId: subTask.id,
        //     subTaskData: {...subTask, completed}
        // }));
    }

    const deleteSubTaskHandler = (subTask) => {
        dispatch(deleteSubTaskAsync({
            taskId: selectedTask.id,
            subTaskId: subTask.id
        }))
        // dispatch(deleteSubTask({
        //     taskId: selectedTask.id,
        //     subTaskId: subTask.id
        // }))
    }

    return (
        <>
            {
                selectedTask.subTasks &&
                selectedTask.subTasks.length !== 0 &&
                <div className={styles.subtask__container}>
                {
                    selectedTask.subTasks.map(subTask =>
                        <div className={styles.subtask}
                            key={subTask.id}
                        >
                            <CheckboxInputField
                                inputValue={subTask.taskName || ''}
                                onChangeInput={e => onTaskNameChange(e, subTask)}
                                onChangeCheckbox={() => onCheckboxChange(subTask)}
                                checked={subTask.completed || false}
                                inputStyle={{
                                    textDecoration: subTask.completed ? 'line-through' : 'none'
                                }}
                            />
                            <DeleteButton
                                onClick={() => deleteSubTaskHandler(subTask)}
                            />
                        </div>
                    )
                }
            </div>
            }
        </>
    );
};

export default SubTaskContainer;