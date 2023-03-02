import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomTaskGroup } from '../../../store/reducers/TaskGroupSlice';

import Button from './Button';
import CloseIcon from '@mui/icons-material/Close';
import { CreateGroupInput } from '../customComponents/CustomInputs';

import styles from './styles/createListButton.module.css';

const CreateListButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
        {!showInput &&
            <Button className={styles.btn} onClick={() => setShowInput(true)}>
                Создать список
            </Button>
        }
        {showInput &&
        <>
            <CreateGroupInput
                id="standard-basic"
                label="Введите название списка"
                variant="standard"
                onKeyDown={handleInputSubmit}
                onSubmit={handleInputSubmit}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <CloseIcon onClick={() => setShowInput(false)}/>
        </>
        }
    </div>
  )
}

export default CreateListButton;
