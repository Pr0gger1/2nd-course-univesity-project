import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';

import Button from '../ui/button/Button';
import InputField from '../ui/input/InputField';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';

import styles from './styles/RightSidebar.module.css';

// import dayjs from 'dayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RightSidebar = () => {
    const dispatch = useDispatch();
    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );
    
    const selectedTask = useSelector(
        state => state.taskGroupStates.selectedTask
    );
    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.base.concat(state.taskGroupStates.allTaskGroups.custom)
    )
    const [taskNameValue, setTaskNameValue] = useState(selectedTask.taskName);

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;

    const textAreaAdjust = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight + 2}px`
    }

    const onTaskCategoryClick = () => {
        
    }

    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_close__btn}>
                <CloseIcon onClick={() => dispatch(setRSidebarOpen())}/>
            </div>

            <section className={styles.add_task__section}>
                <div className={styles.add_task}>
                    <Checkbox 
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
                    <InputField customClasses={[styles.add_task__input]}
                        placeholder="Ваша задача"
                        value={taskNameValue}
                        onChange={e => setTaskNameValue(e.target.value)}
                    />
                </div>    

                <div className={styles.add_subtask__btn}>
                    <Button>Добавить подзадачу</Button>
                </div>

            </section>

            <section className={styles.task_category__section}>
                <select className={styles.choose_group} name="" id="">
                    {
                        taskGroups.map((group, index) => 
                            <option selected={selectedTask.category === group.id}
                                value={group.id}
                                key={index}
                                onClick={onTaskCategoryClick}
                            >
                                {group.title}
                            </option>    
                        )
                    }
                </select>
            </section>
                        
            
            <div className={styles.date_and_repeat}>
                <InputField 
                    className={styles.deadline} 
                    type="date"
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DesktopDatePicker']}>
                        <DemoItem>
                            <DesktopDatePicker label="Basic date picker"
                                defaultValue={dayjs('2022-04-17')} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider> */}

                <select className={styles.repeat}
                    defaultValue={'default'}>
                    <option disabled
                        value='default'
                    >
                        Повтор
                        </option>
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