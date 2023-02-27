import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import todayTaskIcon from '../../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../../assets/img/icons/task_list/plan_task_icon.svg';
import favouriteTaskIcon from '../../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../../assets/img/icons/task_list/all_tasks_icon.svg';

import styles from './styles/BaseGroupContainer.module.css';

import TaskGroup from '../cards/TaskGroup';

import { baseGroupNames, setSelectedGroup } from "../../../store/reducers/TaskGroupSlice";
import {useNavigate} from "react-router-dom";


export const groupTitle = {
    'task_today': {
        pageTitle: '✌️Мой день',
        webTitle: `Productify - Мой день`
    },
    'task_plan': {
        pageTitle: '🗓️Запланировано',
        webTitle: 'Productify - Запланировано'
    },
    'task_favorite': {
        pageTitle: '✨Избранное',
        webTitle: 'Productify - Избранное'
    },
    'task_completed': {
        pageTitle: '✅Завершенное',
        webTitle: 'Productify - Завершенное'
    },
    'task_all': {
        pageTitle: '🎯Все задачи',
        webTitle: 'Productify - Все задачи'
    }
}

const BaseGroupContainer = () => {
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const groups = [
        {
            title: "Сегодня",
            icon: todayTaskIcon,
            counter: 0,
            id: baseGroupNames.today,
            route: 'today'
        },
        {
            title: "Запланировано",
            icon: planTaskIcon,
            counter: 0,
            id: baseGroupNames.plan,
            route: 'plan'
        },
        {
            title: "Избранные",
            icon: favouriteTaskIcon,
            counter: 0,
            id: baseGroupNames.favorite,
            route: 'favorite'
        },
        {
            title: "Завершенные",
            icon: completedTaskIcon,
            counter: 0,
            id: baseGroupNames.completed,
            route: 'completed'
        },
        {
            title: "Все задачи",
            icon: allTasksIcon,
            counter: 0,
            id: baseGroupNames.all,
            route: 'all'
        }
    ];

    const clickHandler = (groupId, route) => {
        dispatch(setSelectedGroup({ groupId }));
        localStorage.setItem('selectedTaskGroup', groupId);
        navigate(`/tasks/${route}`);
    }

    return (
        <div className={styles.base_group__container}>
            {
                groups.map(group =>
                    <TaskGroup
                        key={group.id}
                        icon={group.icon}
                        title={group.title}
                        counter={group.counter}
                        route={group.route}
                        onClick={() => clickHandler(group.id, group.route)}
                        isActive={
                            group.id === selectedTaskGroup ? 'active' : null
                        }
                    />
                )
            }
        </div>
    );
}

export default BaseGroupContainer;