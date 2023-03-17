import React, {useState} from "react";

import CheckboxInputField from "../input/CheckboxInputField";
import Button from "../button/Button";

import StarBorderIcon from "@mui/icons-material/StarBorderRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import AddIcon from "@mui/icons-material/Add";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { CSSTransition } from "react-transition-group";

import styles from "../../pages/mobile/styles/TaskInfoPage.module.scss";
import { generateUniqueId } from "../../../utils/generateUniqueId";
import SubTaskContainer from "../containers/SubTaskContainer";

export const TaskNameSection = ({ taskData, setTaskData }) => {
    const [showButton, setShowButton] = useState(true);
    const [showInput, setShowInput] = useState(false);

    const [subTaskName, setSubTaskName] = useState('');

    const onTaskNameChange = event => {
        setTaskData({
            ...taskData,
            taskName: event.target.value
        });
    }

    const onTaskCompletedChange = event => {
        setTaskData({
            ...taskData,
            completed: event.target.checked
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
                taskName: subTaskName,
                completed: false,
                createdAt: new Date().getTime()
            })
        });

        setShowInput(false);
        setSubTaskName('');
    }

    return (
        <section className={styles.task_name__section}>
            <div className={styles.main_taskName__container}>
                <CheckboxInputField
                    inputValue={taskData.taskName}
                    onChangeInput={onTaskNameChange}
                    onChangeCheckbox={onTaskCompletedChange}
                    checkboxChecked={taskData.completed}
                />
                {
                taskData.favorite ?
                    <StarIcon sx={{
                        color: "#ffc107",
                        fontSize: 32,
                        backgroundColor: 'var(--bgColorFirst)',
                        borderRadius: '0.5rem',
                        padding: 1
                        }}
                      onClick={favoriteToggleHandler}
                    />

                    : <StarBorderIcon
                        sx={{
                            fontSize: 32,
                            color: 'var(--starColor)',
                            backgroundColor: 'var(--bgColorFirst)',
                            borderRadius: '0.5rem',
                            padding: 1
                        }}
                        onClick={favoriteToggleHandler}
                    />
                }
            </div>

            {
            taskData.subTasks && taskData.subTasks.length !== 0 &&
            <SubTaskContainer
                taskId={taskData.id}
            /> 
            }

            <div className={styles.add_subtask__btn}>
            
                {showButton && (
                    <Button onClick={() => setShowInput(true)}>
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
                            inputValue={subTaskName}
                            onChangeInput={e => setSubTaskName(e.target.value)}
                        />
                        {
                            subTaskName.length ?
                            <CheckRoundedIcon
                                sx={{
                                    fontSize: 32,
                                    color: 'var(--starColor)',
                                    backgroundColor: 'var(--bgColorFirst)',
                                    borderRadius: '0.5rem',
                                    padding: 1
                                }}
                                onClick={saveSubTaskHandler}
                            />
                            :
                            <CloseRoundedIcon
                                sx={{
                                    fontSize: 32,
                                    color: 'var(--starColor)',
                                    backgroundColor: 'var(--bgColorFirst)',
                                    borderRadius: '0.5rem',
                                    padding: 1
                                }}
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