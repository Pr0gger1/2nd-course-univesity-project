import todayTaskIcon from '../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../assets/img/icons/task_list/plan_task_icon.svg';
import favoriteTaskIcon from '../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../assets/img/icons/task_list/all_tasks_icon.svg';

export const baseGroupIds = {
    today: 'today',
    plan: 'plan',
    favorite: 'favorite',
    completed: 'completed',
    all: 'all'
}

export const initialGroup = {
    title: 'Сегодня',
    icon: todayTaskIcon,
    counter: 0,
    id: baseGroupIds.today,
    pageTitle: '✌️Мой день',
    webTitle: 'Productify - Мой день'
}

const defaultGroups = [
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
];
export default defaultGroups;
