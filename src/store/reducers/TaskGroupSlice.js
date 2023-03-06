import { createSlice } from '@reduxjs/toolkit';
import { generateUniqueId } from '../../utils/generateUniqueId';

import todayTaskIcon from '../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../assets/img/icons/task_list/plan_task_icon.svg';
import favoriteTaskIcon from '../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../assets/img/icons/task_list/all_tasks_icon.svg';
import customGroupDefaultIcon from '../../assets/img/icons/default/custom_group_task_icon.svg';

export const baseGroupIds = {
    today: 'today',
    plan: 'plan',
    favorite: 'favorite',
    completed: 'completed',
    all: 'all'
}

const initialGroup = {
    title: 'Сегодня',
    icon: todayTaskIcon,
    counter: 0,
    id: baseGroupIds.today,
    route: 'today',
    pageTitle: '✌️Мой день',
    webTitle: 'Productify - Мой день'
}

const taskGroupSlice = createSlice({
    name: 'taskGroupsStates',
    initialState: {
        selectedTaskGroup: JSON.parse(
            localStorage.getItem('selectedTaskGroup')
        ) || initialGroup,

        taskFilter: '',

        // массив всех задач
        tasks: [],

        // массив задач активной группы
        currentGroupTasks: [],
        allTaskGroups: {
            base: [
                {
                    title: 'Сегодня',
                    icon: todayTaskIcon,
                    counter: 0,
                    id: baseGroupIds.today,
                    pageTitle: '✌️Мой день',
                    webTitle: 'Productify - Мой день'
                },
                {
                    title: 'Запланировано',
                    icon: planTaskIcon,
                    counter: 0,
                    id: baseGroupIds.plan,
                    pageTitle: '🗓️Запланировано',
                    webTitle: 'Productify - Запланировано',
                },
                {
                    title: "Избранные",
                    icon: favoriteTaskIcon,
                    counter: 0,
                    id: baseGroupIds.favorite,
                    pageTitle: '✨Избранное',
                    webTitle: 'Productify - Избранное'
                },
                {
                    title: "Завершенные",
                    icon: completedTaskIcon,
                    counter: 0,
                    id: baseGroupIds.completed,
                    pageTitle: '✅Завершенные',
                    webTitle: 'Productify - Завершенное'
                },
                {
                    title: "Все задачи",
                    icon: allTasksIcon,
                    counter: 0,
                    id: baseGroupIds.all,
                    pageTitle: '🎯Все задачи',
                    webTitle: 'Productify - Все задачи'
                }
            ],
            custom: []
        }
    },
    reducers: {
        setFilter(state, action) {
          state.taskFilter = action.payload.filter;
        },

        setSelectedGroup(state, action) {
            state.selectedTaskGroup = action.payload.group;
            localStorage.setItem('selectedTaskGroup', JSON.stringify(action.payload.group));
        },

        setCurrentGroupTasks(state, action) {
            state.currentGroupTasks = action.payload.tasks;
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
                    reminder
                });
        }
    }
})
export const {
    setSelectedGroup, setCurrentGroupTasks, setFilter,
    addCustomTaskGroup, addTask, deleteCustomTaskGroup
} = taskGroupSlice.actions;

export default taskGroupSlice.reducer;