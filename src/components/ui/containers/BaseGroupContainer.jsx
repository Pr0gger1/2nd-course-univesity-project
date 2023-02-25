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


export const groupTitle = {
    'task_today': '✌️Мой день',
    'task_plan': '🗓️Запланировано',
    'task_favorite': '✨Избранное',
    'task_completed': '✅Завершенное',
    'task_all': '🎯Все задачи'
}

const BaseGroupContainer = () => {
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const dispatch = useDispatch();


    const groups = [
        {
            title: "Сегодня",
            icon: todayTaskIcon,
            counter: 0,
            id: baseGroupNames.today
        },
        {
            title: "Запланировано",
            icon: planTaskIcon,
            counter: 0,
            id: baseGroupNames.plan
        },
        {
            title: "Избранные",
            icon: favouriteTaskIcon,
            counter: 0,
            id: baseGroupNames.favorite
        },
        {
            title: "Завершенные",
            icon: completedTaskIcon,
            counter: 0,
            id: baseGroupNames.completed
        },
        {
            title: "Все задачи",
            icon: allTasksIcon,
            counter: 0,
            id: baseGroupNames.all
        }
    ];

    const clickHandler = (groupId) => {
        dispatch(setSelectedGroup({ groupId }));
        localStorage.setItem('selectedTaskGroup', groupId);
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
                        onClick={() => clickHandler(group.id)}
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