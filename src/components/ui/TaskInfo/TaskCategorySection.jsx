import React from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { TaskCategorySelect } from "../customComponents/TaskCategorySelect";


const TaskCategorySection = ({ taskData, setTaskData }) => {
    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.custom
    );

    const onCategoryChange = event => {
        const newTaskGroup = event.target.value;

        setTaskData({
            ...taskData,
            groupId: event.target.value,
            category: taskGroups.find(
                group => group.id === newTaskGroup
            ).title
        });
    }

    return (
        <div>
            <FormControl fullWidth variant="filled">
                <InputLabel
                    style={{color: 'var(--fontColor)'}}
                    id='task_group_label'
                >
                    Категория задачи
                </InputLabel>

                <TaskCategorySelect
                    labelId='task_group_label'
                    value={taskData.groupId || 'ety'}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: 'var(--bgColorFirst)',
                                color: 'var(--fontColor)'
                            }
                        }
                    }}
                    onChange={onCategoryChange}
                >
                    {
                        taskGroups.map(group =>
                            <MenuItem
                                key={group.id}
                                value={group.id}
                            >
                                {group.title}
                            </MenuItem>
                        )
                    }
                </TaskCategorySelect>
            </FormControl>
        </div>
    );
};

export default TaskCategorySection;