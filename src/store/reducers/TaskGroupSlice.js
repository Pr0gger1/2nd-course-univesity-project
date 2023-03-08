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
        selectedTask: {},

        // массив всех задач
        tasks: [],

        // массив задач активной группы
        currentGroupTasks: [],
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

        setCurrentGroupTasks(state, action) {
            state.currentGroupTasks = action.payload.tasks;
        },

        setSelectedTask(state, action) {
            state.selectedTask = action.payload.taskData;
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
        }, 

        addTask(state, action) {
            const groupId = action.payload.taskData.groupId;

            const taskId = generateUniqueId('task', 12, true);
            const taskName = action.payload.taskData.taskName;
            const completed = action.payload.taskData.completed;
            const subTasks = action.payload.taskData.subTasks;
            const notes = action.payload.taskData.notes;
            const category = action.payload.taskData.category;
            const deadline = action.payload.taskData.deadline;
            const repeat = action.payload.taskData.repeat;
            const reminder = action.payload.taskData.reminder;

            state.tasks.push({
                    taskName, completed,
                    subTasks, notes,
                    category, groupId,
                    deadline, repeat,
                    reminder, taskId
            });

        },
        updateCompleteTask(state, action) {
            const index = state.tasks.findIndex(task => task.taskId === action.payload.taskId);
            state.tasks[index].completed = action.payload.completed;
        },
        updateFavoriteTask(state, action) {
            const index = state.tasks.findIndex(task => task.taskId === action.payload.taskId);
            state.tasks[index].favorite = action.payload.favorite
        }
    }
})
export const {
    setSelectedGroup, setCurrentGroupTasks, setSelectedTask,
    addCustomTaskGroup, addTask, deleteCustomTaskGroup,
    updateCompleteTask, updateFavoriteTask
} = taskGroupSlice.actions;

export default taskGroupSlice.reducer;