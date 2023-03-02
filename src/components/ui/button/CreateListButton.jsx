import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomTaskGroup } from '../../../store/reducers/TaskGroupSlice';

import Button from './Button';
import CloseIcon from '@mui/icons-material/Close';
import { CreateGroupInput } from '../customComponents/CustomInputs';

import styles from './styles/createListButton.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {CSSTransition} from "react-transition-group";


const CreateListButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showButton, setShowButton] = useState(true);
    const nodeRef = useRef(null);

    const dispatch = useDispatch();
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    )

    useEffect(() => {
        if (!isLSidebarOpened) setShowInput(false);
    }, [isLSidebarOpened, showInput])

    const handleInputSubmit = (event) => {
        if (event.key === 'Enter' && inputValue.length) {
            setInputValue('');
            setShowInput(false);
            dispatch(addCustomTaskGroup(inputValue));
        }
    }

  return (
    <div className={styles.create_list__btn}>
        {showButton &&
            <Button className={styles.btn} onClick={() => setShowInput(true)}>
                <AddBoxIcon className={styles.add_icon}/>
                <span className={styles.btn_text}>Создать список</span>
            </Button>
        }

        <CSSTransition
            in={showInput}
            nodeRef={nodeRef}
            timeout={300}
            classNames={{
                enter: styles.inputEnter,
                enterActive: styles.inputEnterActive,
                exit: styles.inputExit,
                exitActive: styles.inputExitActive,
            }}
            unmountOnExit
            onEnter={() => setShowButton(false)}
            onExited={() => setShowButton(true)}
        >
            <>
            <CreateGroupInput
                ref={nodeRef}
                id="standard-basic"
                label="Введите название списка"
                variant="standard"
                onKeyDown={handleInputSubmit}
                onSubmit={handleInputSubmit}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onClose={() => setShowInput(false)}
            />
            <CloseIcon className={styles.close_icon} onClick={() => setShowInput(false)}/>
            </>
        </CSSTransition>

    </div>
  )
}

export default CreateListButton;
