import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckboxInputField from "../input/CheckboxInputField";
import SubTaskContainer from "../containers/SubTaskContainer";
import Button from "../button/Button";
import ConfirmationButton from "../button/ConfirmationButton";
import StarButton from "../button/StarButton";

import { generateUniqueId } from "../../../utils/generateUniqueId";

import AddIcon from "@mui/icons-material/Add";

import { CSSTransition } from "react-transition-group";
import styles from "./styles/TaskNameSelection.module.scss";
import {updateTaskData} from "../../../store/reducers/TaskSlice";

export const TaskNameSection = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );

    const [subTaskNameInput, setSubTaskNameInput] = useState('');

    const [showButton, setShowButton] = useState(true);
    const [showInput, setShowInput] = useState(false);


    const onTaskNameChange = event => {
        const taskData = {
            ...selectedTask,
            taskName: event.target.value
        }
        dispatch(updateTaskData({taskData}));
    }

    const onTaskCompletedChange = event => {
        const completed = event.target.checked;
        const taskData = {
            ...selectedTask,
            completed
        }

        dispatch(updateTaskData({taskData}));
    }

    const favoriteToggleHandler = () => {
        const taskData = {
            ...selectedTask,
            favorite: !selectedTask.favorite
        };

        dispatch(updateTaskData({taskData}));
    }

    const saveSubTaskHandler = () => {
        const taskData = {
             ...selectedTask,
            subTasks: selectedTask.subTasks.concat({
                id: generateUniqueId('task', 12, true),
                taskName: subTaskNameInput,
                completed: false,
                createdAt: new Date().getTime()
            })
        };

        dispatch(updateTaskData({taskData}));

        setShowInput(false);
        setSubTaskNameInput('');
    }

    const onSubTaskInputEnterPressed = event => {
        if (event.key === 'Enter' && subTaskNameInput.length)
            saveSubTaskHandler();
    }

    return (
        <section className={styles.task_name__section}>
            <div className={styles.main_taskName__container}>
                <CheckboxInputField
                    inputStyle={{
                        textDecoration:
                            selectedTask.completed ? 'line-through' : 'none'
                    }}
                    inputValue={selectedTask.taskName || ''}
                    onChangeInput={onTaskNameChange}
                    onChangeCheckbox={onTaskCompletedChange}
                    checked={selectedTask.completed || false}
                />
                <StarButton
                    onClick={favoriteToggleHandler}
                    isFavorite={selectedTask.favorite}
                    sx={{
                        backgroundColor: 'var(--bgColorFirst)',
                        borderRadius: '0.5rem',
                        padding: 1
                    }}
                />
            </div>

            {
                selectedTask.subTasks &&
                selectedTask.subTasks.length !== 0 &&
                    <SubTaskContainer/>
            }

            <div className={styles.add_subtask__btn}>
            
                {showButton && (
                    <Button
                        onClick={() => setShowInput(true)}
                    >
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
                    <>
                        <CheckboxInputField
                            inputValue={subTaskNameInput}
                            onChangeInput={e => setSubTaskNameInput(e.target.value)}
                            onInputKeyDown={onSubTaskInputEnterPressed}
                        />
                        {
                            subTaskNameInput.length ?
                            <ConfirmationButton
                                backgroundColor='var(--bgColorFirst)'
                                variant='ok'
                                onClick={saveSubTaskHandler}
                            />
                            :
                            <ConfirmationButton
                                backgroundColor='var(--bgColorFirst)'
                                variant='cancel'
                                onClick={() => setShowInput(false)}
                            />
                        }
                    </>
                </CSSTransition>
            </div>
        </section>
    );
};

export default TaskNameSection;