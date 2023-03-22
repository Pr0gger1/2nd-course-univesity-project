import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskData } from "../../../../store/reducers/TaskSlice";

import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { TaskCategorySelect } from "../../customComponents/TaskCategorySelect";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import dayjs from "dayjs";

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

const RepeatComponent = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );

    const [repeat, setRepeat] = useState(selectedTask.repeat || '');

    const onRepeatChange = event => {
        const value = event.target.value;

        const date = new Date();

        setRepeat(value);
        switch (value) {
            case 'every_day':
                dispatch(updateTaskData({
                    taskData: {
                        ...selectedTask,
                        repeat: value,
                        deadline: dayjs(new Date(date.setDate(date.getDate() + 1)))
                    }
                }));
                break;
            case 'every_week':
                dispatch(updateTaskData({
                    taskData: {
                        ...selectedTask,
                        repeat: value,
                        deadline: dayjs(new Date(date.setDate(date.getDate() + 7)))
                    }
                }));
                break;
            case 'every_month':
                dispatch(updateTaskData({
                    taskData: {
                        ...selectedTask,
                        repeat: value,
                        deadline: dayjs(new Date(date.setMonth(date.getMonth() + 1)))
                    }
                }));
                break;
            default:
                break;
        }
    }

    return (
        <FormControl fullWidth>
            <InputLabel
                id='repeat_select__label'
                style={{color: 'var(--fontColor)'}}
            >
                Повтор
            </InputLabel>
            <TaskCategorySelect
                value={selectedTask.repeat || repeat}
                onChange={onRepeatChange}
                labelId='repeat_select__label'
                IconComponent={CalendarMonthTwoToneIcon}
                MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: 'var(--bgColorFirst)',
                        color: 'var(--fontColor)'
                        }
                    }
                }}
            >
                <MenuItem value=''>Выберите период</MenuItem>
                {
                    repeatItems.map(item =>
                       <MenuItem key={item.value}
                         value={item.value}
                       >
                            {item.title}
                        </MenuItem>
                    )
                }
            </TaskCategorySelect>
        </FormControl>
    );
};

export default RepeatComponent;