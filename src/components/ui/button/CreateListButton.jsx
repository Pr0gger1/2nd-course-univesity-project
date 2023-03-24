import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLSidebarOpen } from '../../../store/reducers/SidebarSlice';
import { addCustomTaskGroup } from '../../../store/reducers/TaskGroupSlice';

import { CSSTransition } from "react-transition-group";

import Button from './Button';
import ConfirmationButton from "./ConfirmationButton";

import AddBoxIcon from '@mui/icons-material/AddBox';
import { CustomTextField } from '../customComponents/CustomInputs';

import styles from './styles/CreateListButton.module.scss';
import '../animations/Button/createListBtnAnimation.css';

const CreateListButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const [inputValue, setInputValue] = useState('');

    const nodeRef = useRef(null);

    const dispatch = useDispatch();

    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    const adaptiveSpan = !isLSidebarOpened ? {
        display: 'none',
        } : {};

    const adaptiveBtn = !isLSidebarOpened ? {
        padding: '0.25rem'
        } : {}


    useEffect(() => {
        if (!isLSidebarOpened) setShowInput(false);
    }, [isLSidebarOpened, showInput])

    const handleInputSubmit = () => {
        setInputValue('');
        setShowInput(false);
        dispatch(addCustomTaskGroup({groupName: inputValue}));
    }

    const onInputEnterPressed = event => {
        if (event.key === 'Enter' && inputValue.length) {
            handleInputSubmit()
        }
    }

    const onClickCloseInput = () => {
        if (inputValue.length)
            handleInputSubmit();
        else setShowInput(false);
    }

    const onCreateListBtnClick = () => {
        setShowInput(true);
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    }

  return (
    <div className={styles.create__list}>
        {showButton &&
            <Button className={styles.create__list_input_btn}
                    onClick={onCreateListBtnClick}
                    style={adaptiveBtn}
            >
                <AddBoxIcon/>
                <span style={adaptiveSpan}>
                    Создать список
                </span>
            </Button>
        }

        <CSSTransition
            in={showInput}
            nodeRef={nodeRef}
            timeout={300}
            classNames="input"
            unmountOnExit
            onEnter={() => setShowButton(false)}
            onExited={() => setShowButton(true)}
        >
            <>
                <CustomTextField
                    ref={nodeRef}
                    sx={{width: '100%'}}
                    id="standard-basic"
                    label="Введите название списка"
                    variant="standard"
                    onKeyDown={onInputEnterPressed}
                    onSubmit={handleInputSubmit}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onClose={() => setShowInput(false)}
                />

                <ConfirmationButton
                    sx={{padding: 0.5}}
                    variant={inputValue.length ? 'ok' : 'cancel'}
                    onClick={onClickCloseInput}
                />
            </>
        </CSSTransition>
    </div>
  )
}

export default CreateListButton;
