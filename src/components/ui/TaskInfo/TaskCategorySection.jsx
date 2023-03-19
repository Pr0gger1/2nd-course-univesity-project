import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { TaskCategorySelect } from "../customComponents/TaskCategorySelect";

const TaskCategorySection = ({ taskData, setTaskData }) => {
    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.custom
    );

    useEffect(() => {
        console.log(taskData)
    }, [taskData])

    const onCategoryChange = event => {
        setTaskData({
            taskData: {...taskData,
                groupId: taskGroups.find(group => group.title === event.target.value).groupId,
                category: event.target.value}
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

                {
                    taskGroups.length !== 0 &&
                    <TaskCategorySelect
                        labelId='task_group_label'
                        value={taskData.category}
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
                            taskGroups.map(group => {

                                return (
                                    <MenuItem
                                    key={group.id}
                                    value={group.title}
                                >
                                    {group.title}
                                </MenuItem>
                                )
                            }
                            )
                        }
                    </TaskCategorySelect>
                }
            </FormControl>
        </div>
    );
};

export default TaskCategorySection;