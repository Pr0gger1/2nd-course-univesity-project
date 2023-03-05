import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';

import Button from '../ui/button/Button';
import InputField from '../ui/input/InputField';
import CloseIcon from '@mui/icons-material/Close';

import styles from './styles/RightSidebar.module.css';

const RightSidebar = () => {
    const dispatch = useDispatch();
    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_close__btn}
                onClick={() => dispatch(setRSidebarOpen())}>
                <CloseIcon/>
            </div>

            <section className={styles.add_task__section}>
                <InputField customClasses={[styles.add_task__input]}
                    placeholder="Введите задачу"
                    />
                <div className={styles.add_task__btn}>
                    <Button>Добавить подзадачу</Button>
                </div>
            </section>
            <select name="" id="">

            </select>
            <div>
                <InputField/>
                <InputField/>
            </div>

            <InputField/>

            <textarea>

            </textarea>
        </aside>
    );
};

export default RightSidebar;