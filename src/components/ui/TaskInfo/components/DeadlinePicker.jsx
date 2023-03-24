import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../../store/reducers/TaskSlice";

import DeleteButton from "../../button/DeleteButton";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';

import styles from "../styles/TaskDatesSection.module.scss";

const DeadlinePicker = ({ setShowDeadlinePicker }) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.taskStates.selectedTask
    );

    const [deadlineValue, setDeadlineValue] = useState(selectedTask.deadline || '');

    const onDeadlineChange = value => {
        const taskData = {
            ...selectedTask,
            deadline: value
        }

        setDeadlineValue(value);
        // dispatch(updateTaskData({taskData}))
        dispatch(updateTaskAsync(taskData));
    }

    const deleteDeadlineHandler = () => {
        const taskData = {
            ...selectedTask,
            deadline: null
        };

        // dispatch(updateTaskData({taskData}));
        dispatch(updateTaskAsync(taskData));
        setShowDeadlinePicker(false);
    }


    return (
        <div className={styles.date__container}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <MobileDateTimePicker
                    value={selectedTask.deadline || deadlineValue}
                    onChange={val => onDeadlineChange(val)}
                />
            </LocalizationProvider>
            <DeleteButton
                sx={{
                    padding: 2
                }}
                onClick={deleteDeadlineHandler}
            />
        </div>
    );
};

export default DeadlinePicker;