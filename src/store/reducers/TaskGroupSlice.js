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
                counter: 0,
                id: generateUniqueId('task', 4),
                pageTitle: name,
                webTitle: `Productify - ${name}`
            });
        },
        
        deleteCustomTaskGroup(state, action) {
            if (state.allTaskGroups.custom.length)
                state.allTaskGroups.custom = state.allTaskGroups.custom.filter(
                    group => group.id !== action.payload.groupId
                );
        }
    }
});

export const {
    setSelectedGroup,addCustomTaskGroup, deleteCustomTaskGroup
} = taskGroupSlice.actions;

export default taskGroupSlice.reducer;