import React, { useEffect, useState } from "react";

import CheckboxInputField from "../input/CheckboxInputField";
import SubTaskContainer from "../containers/SubTaskContainer";
import Button from "../button/Button";
import ConfirmationButton from "../button/ConfirmationButton";
import StarButton from "../button/StarButton";

import { generateUniqueId } from "../../../utils/generateUniqueId";

import AddIcon from "@mui/icons-material/Add";

import { CSSTransition } from "react-transition-group";
import styles from "./styles/TaskNameSelection.module.scss";

export const TaskNameSection = ({ taskData, setTaskData }) => {
    // локальные состояния необходимы для того, чтобы при
    // скрытии сайдбара информация не пропадала
    const [isCompleted, setIsCompleted] = useState(taskData.completed || false);
    const [taskName, setTaskName] = useState(taskData.taskName || '');

    const [subTaskNameInput, setSubTaskNameInput] = useState('');

    const [showButton, setShowButton] = useState(true);
    const [showInput, setShowInput] = useState(false);


    useEffect(() => {
        setTaskName(taskData.taskName)
        setIsCompleted(taskData.completed)
    }, [taskData])

    const onTaskNameChange = event => {
        setTaskName(event.target.value);

        setTaskData({
            ...taskData,
            taskName: event.target.value
        });
    }

    const onTaskCompletedChange = event => {
        const completed = event.target.checked;
        setIsCompleted(completed);

        setTaskData({
            ...taskData,
            completed
        });
    }

    const favoriteToggleHandler = () => {
        setTaskData({
            ...taskData,
            favorite: !taskData.favorite
        });
    }

    const saveSubTaskHandler = () => {
        setTaskData({
            ...taskData,
            subTasks: taskData.subTasks.concat({
                id: generateUniqueId('task', 12, true),
                taskName: subTaskNameInput,
                completed: false,
                createdAt: new Date().getTime()
            })
        });

        setShowInput(false);
        setSubTaskNameInput('');
    }

    const onSubTaskInputEnterPressed = event => {
        if (event.key === 'Enter' && taskName.length) {
            saveSubTaskHandler();
        }
    }

    return (
        <section className={styles.task_name__section}>
            <div className={styles.main_taskName__container}>
                <CheckboxInputField
                    inputStyle={{
                        textDecoration:
                            taskData.completed ? 'line-through' : 'none'
                    }}
                    inputValue={taskData.taskName || taskName || ''}
                    onChangeInput={onTaskNameChange}
                    onChangeCheckbox={onTaskCompletedChange}
                    checked={taskData.completed || isCompleted || false}
                />
                <StarButton
                    onClick={favoriteToggleHandler}
                    isFavorite={taskData.favorite}
                    sx={{
                        backgroundColor: 'var(--bgColorFirst)',
                        borderRadius: '0.5rem',
                        padding: 1
                    }}
                />
            </div>

            {
                taskData.subTasks &&
                taskData.subTasks.length !== 0 &&
                    <SubTaskContainer
                        taskId={taskData.id}
                    />
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