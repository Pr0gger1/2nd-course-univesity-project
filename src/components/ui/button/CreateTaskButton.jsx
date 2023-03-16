import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../store/reducers/TaskSlice';

import InputField from '../input/InputField';
import Button from './Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { baseGroupIds } from '../../../store/defaultData/baseGroups';
import { CSSTransition } from 'react-transition-group';

import styles from './styles/CreateTaskButton.module.scss';
import '../animations/Button/createTaskBtnAnimation.css';
import '../animations/Input/InputAnimation.css';

const CreateTaskButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();


    const addTaskHandler = () => {
        let taskData = {
            taskName,
            completed: false,
            favorite: false,
            createdAt: new Date().getTime(),
            subTasks: [],
            notes: '',
            groupId: selectedGroup.id,
            category: selectedGroup.title,
            deadline: null,
            reminder: null,
            repeat: null
            };

        if (selectedGroup.id === baseGroupIds.favorite)
            taskData.favorite = true;

        dispatch(addTask({taskData}));
        setTaskName('');
    }

    const onInputKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value.length)
            addTaskHandler();
        else if (event.key === 'Escape')
            setShowInput(false);
    }

    return (
        <>
            <CSSTransition
                in={showButton}
                timeout={300}
                classNames="create_task_btn_animation"
                unmountOnExit
            >
                <Button
                    className={styles.create_task__btn}
                    onClick={() => setShowInput(true)}
                >
                    Добавить задачу
                </Button>
            </CSSTransition>

            <CSSTransition
                in={showInput}
                timeout={700}
                classNames="input_animation"
                onEnter={() => setShowButton(false)}
                onExited={() => setShowButton(true)}
                unmountOnExit
            >
                <div className={styles.add_task_input__container}>
                    {
                        taskName.length ?
                        <CheckRoundedIcon
                            className={[styles.close_input__btn, styles.send_task__btn].join(' ')}
                            onClick={addTaskHandler}
                        />
                        :
                        <CloseRoundedIcon
                            className={styles.close_input__btn}
                            onClick={() => setShowInput(false)}
                    />
                    }
                    <InputField
                        customClasses={[styles.add_task__btn]}
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        onKeyDown={e => onInputKeyDown(e)}
                        onClose={() => setShowInput(false)}
                    />
                </div>
            </CSSTransition>
        </>
    );
};

export default CreateTaskButton;