import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskData } from "../../../../store/reducers/TaskSlice";

import DeleteButton from "../../button/DeleteButton";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';

import styles from "../styles/TaskDatesSection.module.scss";

const ReminderPicker = ({ setShowReminderPicker }) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.tasksStates.selectedTask
    );

    const [reminderValue, setReminderValue] = useState(null);

    const onReminderChange = value => {
        const taskData = {
            ...selectedTask,
            reminder: value
        };

        setReminderValue(value);
        dispatch(updateTaskData({taskData}));
    }

    const deleteReminderHandler = () => {
        const taskData = {
            ...selectedTask,
            reminder: null
        };

        dispatch(updateTaskData({taskData}));
        setShowReminderPicker(false);
    }

    return (
        <div className={styles.date__container}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <MobileDateTimePicker
                    value={selectedTask.reminder || reminderValue}
                    onChange={val => onReminderChange(val)}
                />
             </LocalizationProvider>

            <DeleteButton
                sx={{
                    padding: 2
                }}
                onClick={deleteReminderHandler}
            />
        </div>
    );
};

export default ReminderPicker;