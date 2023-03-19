import React from 'react';
import InputField from './InputField';
import Checkbox from '@mui/material/Checkbox';

import styles from './styles/CheckboxInput.module.scss';

const CheckboxInputField = ({
    placeholder, inputValue, onChangeInput,
    checkboxChecked, onChangeCheckbox, onCheckboxClick,
    style
}) => {
    return (
        <div className={styles.checkbox_input__container}>
            <Checkbox
                checked={checkboxChecked}
                onChange={onChangeCheckbox}
                onClick={onCheckboxClick}
                sx={{
                    color: "var(--checkboxColor)",
                    '& .MuiSvgIcon-root': {
                        fontSize: 30,
                        borderRadius: "15px"
                    },
                    '&.Mui-checked': {
                        color: '#68d96d',
                    }
                }}
            />
            
            <InputField customClasses={[styles.checkbox__input]}
                style={style}
                placeholder={placeholder}
                value={inputValue}
                onChange={onChangeInput}
            />
        </div>
    );
};

export default CheckboxInputField;