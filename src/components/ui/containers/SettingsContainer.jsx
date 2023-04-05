import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {deleteUser, logoutHandler} from '../../../store/reducers/AuthSlice';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import TabPanel from "../Tab/TabPanel/TabPanel";

import styles from './styles/SettingsContainer.module.scss';
import {StyledTab, StyledTabs} from "../Tab/Tab";
import {Chip} from "@mui/material";

const SettingsContainer = () => {
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <div className={styles.settings__container}>
            <StyledTabs
                orientation='horizontal'
                variant='scrollable'
                scrollButtons='auto'
                value={tabValue}
                onChange={onTabChange}
                sx={{
                    color: 'var(--fontColor)'
                }}
            >
                <StyledTab
                    label='Действия с аккаунтом'
                    icon={<VpnKeyTwoToneIcon/>}
                    id={0}
                />

                <StyledTab
                    label='Настройки аккаунта'
                    icon={<ManageAccountsTwoToneIcon/>}
                    id={1}
                >
                </StyledTab>
            </StyledTabs>
            <TabPanel value={tabValue} index={0}>
                <button
                    className={[styles.settings__btn, styles.logout].join(' ')}
                    onClick={() => dispatch(logoutHandler())}
                >
                    <LogoutRoundedIcon/>
                    <span>Выйти</span>
                </button>

                <div className={styles.dangerous__zone}>
                    <Chip
                        color='error'
                        label='Опасная зона'
                        size='small'
                    />
                    <button
                        className={[styles.settings__btn, styles.delete_account].join('')}
                        onClick={() => dispatch(deleteUser())}
                    >
                        <PersonOffOutlinedIcon/>
                        Удалить аккаунт
                    </button>
                </div>
            </TabPanel>

            <TabPanel index={1} value={tabValue}>
                <button>Изменить аватар</button>
                <button>Изменить никнейм</button>
            </TabPanel>
        </div>
    );
};

export default SettingsContainer;