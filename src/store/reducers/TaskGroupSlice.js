import { createSlice } from '@reduxjs/toolkit';

import todayTaskIcon from '../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../assets/img/icons/task_list/plan_task_icon.svg';
import favouriteTaskIcon from '../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../assets/img/icons/task_list/all_tasks_icon.svg';

export const baseGroupIds = {
    today: 'today',
    plan: 'plan',
    favorite: 'favorite',
    completed: 'completed',
    all: 'all'
}

const initialGroup = {
    title: "Сегодня",
    icon: todayTaskIcon,
    counter: 0,
    id: baseGroupIds.today,
    route: 'today',
    pageTitle: '✌️Мой день',
    webTitle: `Productify - Мой день`
}

const taskGroupSlice = createSlice({
    name: 'taskGroupsStates',
    initialState: {
        selectedTaskGroup: JSON.parse(localStorage.getItem('selectedTaskGroup')) || initialGroup,
        allTaskGroups: {
            base: [
                {
                    title: "Сегодня",
                    icon: todayTaskIcon,
                    counter: 0,
                    id: baseGroupIds.today,
                    pageTitle: '✌️Мой день',
                    webTitle: `Productify - Мой день`
                },
                {
                    title: "Запланировано",
                    icon: planTaskIcon,
                    counter: 0,
                    id: baseGroupIds.plan,
                    pageTitle: '🗓️Запланировано',
                    webTitle: 'Productify - Запланировано'
                },
                {
                    title: "Избранные",
                    icon: favouriteTaskIcon,
                    counter: 0,
                    id: baseGroupIds.favorite,
                    pageTitle: '✨Избранное',
                    webTitle: 'Productify - Избранное',
                },
                {
                    title: "Завершенные",
                    icon: completedTaskIcon,
                    counter: 0,
                    id: baseGroupIds.completed,
                    pageTitle: '✅Завершенное',
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
        setSelectedGroup(state, action) {
            state.selectedTaskGroup = action.payload.group;
            localStorage.setItem('selectedTaskGroup', JSON.stringify(action.payload.group));
        },
        addCustomTaskGroup(state, action) {
            state.allTaskGroups.custom.push(action.payload.group);
        },
        deleteCustomTaskGroup(state, action) {
            if (state.allTaskGroups.custom.length)
                state.allTaskGroups.custom.filter(group => group.id !== action.payload.group);
        }
    }
})
export const { setSelectedGroup, addCustomTaskGroup, deleteCustomTaskGroup } = taskGroupSlice.actions;
export default taskGroupSlice.reducer;