import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateUniqueId } from '../../utils/generateUniqueId';

import { CustomTaskGroupService } from "../../services/customTaskGroup.service";
import customGroupDefaultIcon from '../../assets/img/icons/default/custom_group_task_icon.svg';

import { initialGroup } from "../defaultData/baseGroups";
import defaultGroups from '../defaultData/baseGroups';
import { deleteTaskAsync } from "./TaskSlice";


export const createCustomTaskGroup = createAsyncThunk(
    'taskGroup/add',
    async (groupName, { getState }) => {
        const { custom: customGroups } = getState()
            .taskGroupStates.allTaskGroups;
        const { uid: userId } = getState().authStates.userData;

        const newGroups = CustomTaskGroupService.createCustomGroup(
            customGroups, groupName
        );

        await CustomTaskGroupService.updateTaskGroups(newGroups, userId);

        return newGroups;
    }
);

export const getCustomTaskGroups = createAsyncThunk(
    'taskGroup/get',
    async (userId) => {
        return await CustomTaskGroupService.getTaskGroups(userId);
    }
)
export const deleteCustomTaskGroupAsync = createAsyncThunk(
     'taskGroup/delete',
    async (groupId, { getState, dispatch }) => {
        const { uid: userId } = getState()
            .authStates.userData;

        const { tasks } = getState().taskStates;

        const { custom: taskGroups }  = getState()
            .taskGroupStates.allTaskGroups;

        const newTaskGroups = CustomTaskGroupService
            .deleteTaskGroup(taskGroups, groupId);

        await CustomTaskGroupService
            .updateTaskGroups(newTaskGroups.taskGroups, userId);

        tasks.forEach(task => {
            if (task.groupId === groupId)
                dispatch(deleteTaskAsync(task.id));
        })
        return newTaskGroups;
    }
);

export const renameCustomTaskGroupAsync = createAsyncThunk(
     'taskGroup/rename',
    async (groupData, { getState }) => {
        const { uid: userId } = getState().authStates.userData;
        const { custom: taskGroups } = getState()
            .taskGroupStates.allTaskGroups;

        const newTaskGroups = CustomTaskGroupService.editTaskGroup(
            taskGroups,
            groupData
        );

        console.log(newTaskGroups)
        await CustomTaskGroupService
            .updateTaskGroups(newTaskGroups.taskGroups, userId);

        return newTaskGroups;
    }
);

const taskGroupSlice = createSlice({
    name: 'taskGroupsStates',
    initialState: {
        selectedTaskGroup: JSON.parse(
                localStorage.getItem('selectedTaskGroup')
            ) || initialGroup,

        allTaskGroups: {
            base: defaultGroups,
            custom: []
        }
    },
    reducers: {
        setSelectedGroup(state, action) {
            state.selectedTaskGroup = action.payload.group;
            localStorage.setItem('selectedTaskGroup', JSON.stringify(action.payload.group));
        },

        addCustomTaskGroup(state, action) {
            const name = action.payload.groupName;
            state.allTaskGroups.custom.push({
                title: name,
                icon: customGroupDefaultIcon,
                id: generateUniqueId('task_group', 12, true),
                pageTitle: name,
                webTitle: `Productify - ${name}`
            });
        },
        
        deleteCustomTaskGroup(state, action) {
            if (state.allTaskGroups.custom.length) {
                state.allTaskGroups.custom = state.allTaskGroups.custom.filter(
                    group => group.id !== action.payload.groupId
                );
                window.location.pathname = `/tasks/${initialGroup.id}`;
            }
        },

        renameCustomTaskGroup(state, action) {
            const groupId = action.payload.groupId;
            const newName = action.payload.newName;

            if (state.allTaskGroups.custom.length) {
                let groupIndex = state.allTaskGroups.custom.findIndex(
                    group => group.id === groupId
                );
                state.allTaskGroups.custom[groupIndex].title = newName;
                state.allTaskGroups.custom[groupIndex].pageTitle = newName;
                state.allTaskGroups.custom[groupIndex].webTitle = `Productify - ${newName}`;
            }
        }
    },

    extraReducers: builder => {
        builder
            .addCase(createCustomTaskGroup.fulfilled, (state, action) => {
                console.log(action);
                state.allTaskGroups.custom = action.payload;
            })

            .addCase(createCustomTaskGroup.rejected, (state, action) => {
                console.log(action)
            })

            .addCase(getCustomTaskGroups.fulfilled, (state, action) => {
                state.allTaskGroups.custom = action.payload.taskGroups;
                console.log(action);
            })

            .addCase(getCustomTaskGroups.rejected, (state, action) => {
                console.log(action);
            })

             .addCase(deleteCustomTaskGroupAsync.fulfilled, (state, action) => {
                console.log(action);
                state.allTaskGroups.custom = action.payload.taskGroups;
                state.selectedTaskGroup = action.payload.selectedTaskGroup;
            })

            .addCase(deleteCustomTaskGroupAsync.rejected, (state, action) => {
                console.log(action)
            })

            .addCase(renameCustomTaskGroupAsync.fulfilled, (state, action) => {
                console.log(action);
                state.allTaskGroups.custom = action.payload.taskGroups;
                state.selectedTaskGroup = action.payload.selectedTaskGroup;
            })

            .addCase(renameCustomTaskGroupAsync.rejected, (state, action) => {
                console.log(action)
            })
    }
});

export const {
    setSelectedGroup, addCustomTaskGroup,
    deleteCustomTaskGroup, renameCustomTaskGroup
} = taskGroupSlice.actions;

export default taskGroupSlice.reducer;