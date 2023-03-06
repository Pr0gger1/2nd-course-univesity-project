import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../store/reducers/TaskGroupSlice';

import InputField from '../input/InputField';
import Button from './Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CSSTransition } from 'react-transition-group';

import styles from './styles/CreateTaskButton.module.css';
import './styles/BtnAnimation.css';
import './styles/InputAnimation.css';

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
            // setShowInput(false);

            dispatch(addTask({
                taskData: {
                    taskName,
                    completed: false,
                    subTasks: [],
                    notes: '',
                    groupId: selectedGroup.id,
                    category: selectedGroup.title,
                    deadline: null,
                    reminder: null,
                    repeat: null
                    }
                }
            ));

            setTaskName('');
        }
    }


    return (
        <div className={styles.create_task__container}>
            <CSSTransition
                in={showButton}
                timeout={300}
                classNames="btn_animation"
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
                <div className={styles.add_task__input}>
                    <CloseRoundedIcon
                        className={styles.close_input__btn}
                        onClick={() => setShowInput(false)}
                    />
                    <InputField
                        customClasses={[styles.add_task__btn]}
                        onChange={e => setTaskName(e.target.value)}
                        value={taskName}
                        onKeyDown={e => onEnterPressed(e)}
                        onClose={() => setShowInput(false)}
                    />
                </div>
            </CSSTransition>
        </div>
    );
};

export default CreateTaskButton;