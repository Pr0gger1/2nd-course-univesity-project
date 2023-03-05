import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../input/InputField';
import Button from './Button';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import styles from './styles/CreateTaskButton.module.css'
import { addTask } from "../../../store/reducers/TaskGroupSlice";

const CreateTaskButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();

    const onEnterPressed = (event) => {
        if (event.key === 'Enter' && event.target.value.length) {
            setShowInput(false);
            setShowButton(true);

            dispatch(addTask({
                groupId: selectedGroup.id,
                taskData: {
                    taskName,
                    completed: false,
                    subTasks: [],
                    notes: '',
                    category: selectedGroup.title,
                    deadline: null,
                    reminder: null,
                    repeat: null
                }
            }))
            setTaskName('');
        }
    }

   const onAddTaskInputChange = (event) => {
        setTaskName(event.target.value);
    }

    const onAddTaskButtonClick = () => {
        setShowButton(false); 
        setShowInput(true);
    }

    const onCloseClick = () => {
        setShowInput(false);
        setShowButton(true);
    }

    return (
        <div className={styles.create_task__container}>
            {
            showButton &&
                <>
                    <Button
                        className={styles.create_task__btn}
                        onClick={onAddTaskButtonClick}
                    >
                        Добавить задачу
                    </Button>
                </>

            }
            {
                showInput &&
                <div className={styles.add_task__input}>
                    <CloseRoundedIcon
                        className={styles.close_input__btn}
                        onClick={onCloseClick}
                    />
                    <InputField
                        customClasses={[styles.add_task__btn]}
                        onChange={e => onAddTaskInputChange(e)}
                        value={taskName}
                        onKeyDown={e => onEnterPressed(e)}
                    />
                </div>
            }
        </div>
    );
};

export default CreateTaskButton;