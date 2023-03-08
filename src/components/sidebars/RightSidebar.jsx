import React, { useState } from 'react';
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

    
    const selectedTask = useSelector(
        state => state.taskGroupStates.selectedTask
    );

    const [taskNameValue, setTaskNameValue] = useState(selectedTask.taskName);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_close__btn}
                onClick={() => dispatch(setRSidebarOpen())}>
                <CloseIcon/>
            </div>

            <section className={styles.add_task__section}>
                <InputField customClasses={[styles.add_task__input]}
                    placeholder="Ваша задача"
                    value={taskNameValue}
                    onChange={e => setTaskNameValue(e.target.value)}
                    />

                <div className={styles.add_subtask__btn}>
                    <Button>Добавить подзадачу</Button>
                </div>
            </section>
            <select className={styles.choose_group} name="" id="">
                <option disabled selected>Выберите категорию задачи...</option>
            </select>
            <div className={styles.date_and_repeat}>
                <InputField className={styles.deadline} type="date"/>
                <select className={styles.repeat}>
                    <option disabled selected>Повтор</option>
                </select>
            </div>

            <InputField 
                className={styles.reminder}
                placeholder="Напоминание"
            />

            <textarea 
                className={styles.notes}
                placeholder="Ваши заметки"
                onInput={e => textAreaAdjust(e)}
            >

            </textarea>
        </aside>
    );
};

export default RightSidebar;