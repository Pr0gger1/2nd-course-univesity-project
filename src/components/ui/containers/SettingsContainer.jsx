import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../../../store/reducers/AuthSlice';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import styles from './styles/SettingsContainer.module.scss';

const SettingsContainer = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.settings_container}>
            <button 
                className={styles.logout_btn}
                onClick={() => dispatch(logoutHandler())}
            >
                <LogoutRoundedIcon/>
                <span>Выйти</span>
            </button>
        </div>
    );
};

export default SettingsContainer;