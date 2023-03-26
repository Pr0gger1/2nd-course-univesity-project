import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../../store/reducers/TaskSlice";

import DeleteButton from "../../button/DeleteButton";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';

import styles from "../styles/TaskDatesSection.module.scss";
import dayjs from "dayjs";

const ReminderPicker = ({ setShowReminderPicker }) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.taskStates.selectedTask
    );


    const onReminderChange = value => {
        const taskData = {
            ...selectedTask,
            reminder: new Date(value['$d']).getTime()
        };

        dispatch(updateTaskAsync(taskData));
    }

    const deleteReminderHandler = () => {
        const taskData = {
            ...selectedTask,
            reminder: null
        };

        dispatch(updateTaskAsync(taskData));
        setShowReminderPicker(false);
    }

    return (
        <div className={styles.date__container}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <MobileDateTimePicker
                    value={dayjs(new Date(selectedTask.reminder))}
                    onChange={val => onReminderChange(val)}
                    sx = {{
                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            color: "var(--fontColor)",
                        },
                        ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                            border: "1px solid var(--borderColor)"
                        }
                    }}
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