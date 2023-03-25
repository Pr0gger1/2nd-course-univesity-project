import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../../store/reducers/TaskSlice";

import DeleteButton from "../../button/DeleteButton";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';
import dayjs from "dayjs";

import styles from "../styles/TaskDatesSection.module.scss";

const DeadlinePicker = ({ setShowDeadlinePicker }) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        state => state.taskStates.selectedTask
    );

    const onDeadlineChange = value => {
        const taskData = {
            ...selectedTask,
            deadline: new Date(value['$d']).getTime()
        }

        if (selectedTask.repeat)
            taskData.repeat = null;

        dispatch(updateTaskAsync(taskData));
    }

    const deleteDeadlineHandler = () => {
        const taskData = {
            ...selectedTask,
            deadline: null
        };

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
                    value={dayjs(selectedTask.deadline)}
                    onChange={val => onDeadlineChange(val)}
                    sx = {{
                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            color: "var(--fontColor)",
                            // border: "1px solid var(--fontColor)",
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
                onClick={deleteDeadlineHandler}
            />
        </div>
    );
};

export default DeadlinePicker;