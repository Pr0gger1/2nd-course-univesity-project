import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../input/InputField';

import Button from './Button';

import styles from './styles/CreateTaskButton.module.css'

const CreateTaskButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const dispatch = useDispatch();

    const onEnterPressed = (event) => {
        if (event.key === 'Enter') {
            // if (!event.value.length) {
                setShowInput(false);
                setShowButton(true);
            // }
        }
    }

    const onButtonClick = () => {
        setShowButton(false); 
        setShowInput(true);
    }

    return (
        <div className={styles.create_task__container}>
            {
            showButton && 
                <Button 
                    className={styles.create_task__btn}
                    onClick={onButtonClick}
                >
                    Добавить задачу
                </Button>

            }
            {
                showInput &&
                <>
                    {/* <Checkbox/> */}
                    <InputField
                        customClasses={[styles.add_task__btn]}
                        onKeyDown={e => onEnterPressed(e)}

                    />
                </>
            }
        </div>
    );
};

export default CreateTaskButton;