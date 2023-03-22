import React from "react";

import { MenuItem } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TaskCategorySelect } from "../customComponents/TaskCategorySelect";
import styles from "./styles/TaskDatesSection.module.scss";


const repeatItems = [
    {
        title: 'Каждый день',
        value: 'every_day'
    },
    {
        title: 'Каждую неделю',
        value: 'every_week'
    },
    {
        title: 'Каждый месяц',
        value: 'every_month'
    }
];

const TaskDatesSection = () => {
    return (
        <>
            <div className={styles.date_and_repeat}>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDateTimePicker/>
                 </LocalizationProvider>
                <TaskCategorySelect>
                    {
                        repeatItems.map(item =>
                            <MenuItem key={item.value}>
                                {item.title}
                            </MenuItem>
                        )
                    }
                </TaskCategorySelect>
            </div>

            <select className={styles.reminder}>
                <option>
                    Через час
                </option>

                <option>
                    Через пять часов
                </option>

                <option>
                    Завтра
                </option>

                <option>
                    Через неделю
                </option>
            </select>
        </>
    );
};

export default TaskDatesSection;