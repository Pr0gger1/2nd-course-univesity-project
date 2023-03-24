import { createSlice } from '@reduxjs/toolkit';
import { generateUniqueId } from '../../utils/generateUniqueId';

import customGroupDefaultIcon from '../../assets/img/icons/default/custom_group_task_icon.svg';

import { initialGroup } from "../defaultData/baseGroups";
import defaultGroups from '../defaultData/baseGroups';

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
    }
});

export const {
    setSelectedGroup,addCustomTaskGroup,
    deleteCustomTaskGroup, renameCustomTaskGroup
} = taskGroupSlice.actions;

export default taskGroupSlice.reducer;