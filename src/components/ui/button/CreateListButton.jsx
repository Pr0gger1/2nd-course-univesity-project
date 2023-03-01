import React, { useState } from 'react';

import styles from './styles/createListButton.module.css';
import Button from './Button';
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const CreateListButton = ({ onCreateList }) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('')

    const handleInputSubmit = (event) => {
        event.preventDefault();
        onCreateList(inputValue);
        setInputValue('')
        setShowInput(false);
    }

    const CssTextField = styled(TextField)({
        '& label': {
            color: 'var(--fontColor)'
        }

    })


  return (
    <div className={styles.create_list__btn}>
        {!showInput &&
            <Button className={styles.btn} onClick={() => setShowInput(true)}>
                Создать список
            </Button>
        }
        {showInput &&
        <>
            <CssTextField
                id="standard-basic"
                label="Введите название списка"
                variant="standard"
                onSubmit={handleInputSubmit}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <CloseIcon onClick={() => setShowInput(false)}/>
        </>
        }
    </div>
  )
}

export default CreateListButton;
