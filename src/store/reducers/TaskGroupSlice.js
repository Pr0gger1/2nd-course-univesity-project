import { createSlice } from '@reduxjs/toolkit';

import todayTaskIcon from '../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../assets/img/icons/task_list/plan_task_icon.svg';
import favouriteTaskIcon from '../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../assets/img/icons/task_list/all_tasks_icon.svg';

import customGroupDefafultIcon from '../../assets/img/icons/default/custom_group_task_icon.svg';
import { generateUniqueId } from '../../utils/generateUniqueId';

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
                    webTitle: `Productify - Мой день`,
                    tasks: []
                },
                {
                    title: "Запланировано",
                    icon: planTaskIcon,
                    counter: 0,
                    id: baseGroupIds.plan,
                    pageTitle: '🗓️Запланировано',
                    webTitle: 'Productify - Запланировано',
                    tasks: []
                },
                {
                    title: "Избранные",
                    icon: favouriteTaskIcon,
                    counter: 0,
                    id: baseGroupIds.favorite,
                    pageTitle: '✨Избранное',
                    webTitle: 'Productify - Избранное',
                    tasks: []
                },
                {
                    title: "Завершенные",
                    icon: completedTaskIcon,
                    counter: 0,
                    id: baseGroupIds.completed,
                    pageTitle: '✅Завершенные',
                    webTitle: 'Productify - Завершенное',
                    tasks: []
                },
                {
                    title: "Все задачи",
                    icon: allTasksIcon,
                    counter: 0,
                    id: baseGroupIds.all,
                    pageTitle: '🎯Все задачи',
                    webTitle: 'Productify - Все задачи',
                    tasks: []
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
            const name = action.payload;
            state.allTaskGroups.custom.push({
                title: name,
                icon: customGroupDefafultIcon,
                counter: 0,
                id: generateUniqueId('task', 4),
                pageTitle: name,
                webTitle: `Productify - ${name}`,
                tasks: []
            });
        },
        
        deleteCustomTaskGroup(state, action) {
            if (state.allTaskGroups.custom.length)
                state.allTaskGroups.custom.filter(
                    group => group.id !== action.payload.group
                );
        }, 

        addTask(state, action) {
            const taskGroup = action.payload.groupId;

            const taskName = action.payload.taskData.name;
            const completed = action.payload.taskData.completed;
            const subTasks = action.payload.taskData.subTasks;
            const notes = action.payload.taskData.notes;
            const category = action.payload.taskData.category;
            const deadline = action.payload.taskData.deadline;
            const repeat = action.payload.taskData.repeat;
            const reminder = action.payload.taskData.reminder;

            if (!Object.values(baseGroupIds).includes(taskGroup)) {
                let length = state.allTaskGroups.custom;

                for (let i = 0; i < length; i++) {
                    if (state.allTaskGroups.custom[i].id === taskGroup) {
                        state.allTaskGroups.custom[i].tasks.push({
                            taskName, subTasks,
                            category, deadline,
                            repeat, reminder,
                            notes, completed
                        })
                    }
                }
            }
            else {
                let length = state.allTaskGroups.base.length;

                for (let i = 0; i < length; i++) {
                    if (state.allTaskGroups.base[i].id === taskGroup) {
                        state.allTaskGroups.base[i].tasks.push(
                            {
                                taskName, subTasks,
                                category, deadline,
                                repeat, reminder,
                                notes, completed
                        });
                    }
                    break;
                }
            }
        }
    }
})
export const { setSelectedGroup, addCustomTaskGroup, deleteCustomTaskGroup } = taskGroupSlice.actions;
export default taskGroupSlice.reducer;