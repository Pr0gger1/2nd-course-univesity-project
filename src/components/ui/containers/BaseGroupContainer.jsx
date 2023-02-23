import React, {useContext, useEffect} from 'react';

import todayTaskIcon from '../../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../../assets/img/icons/task_list/plan_task_icon.svg';
import favouriteTaskIcon from '../../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../../assets/img/icons/task_list/all_tasks_icon.svg';

import styles from './styles/BaseGroupContainer.module.css';

import BaseGroup from '../cards/BaseGroup';

import UIStates from "../../../context/UIStates.context";
import { baseGroupNames } from '../../../providers/UIStates.provider';

const BaseGroupContainer = () => {
    const { tasks } = useContext(UIStates);
    const selectedGroup = localStorage.getItem("selectedGroup");

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

    useEffect(() => {
        if (selectedGroup)
        tasks.setActiveTaskGroup(selectedGroup)
    }, [selectedGroup]);


    const clickHandler = (groupId) => {
        tasks.setActiveTaskGroup(
            groupId === tasks.activeTaskGroup ? null : groupId
        );
        localStorage('selectedGroup', groupId)
        tasks.setSelectedGroup(groupId);
    }

    return (
        <div className={styles.base_group__container}>
            {
                groups.map((group, index ) =>
                    <BaseGroup
                        key={index}
                        icon={group.icon}
                        title={group.title}
                        counter={group.counter}
                        onClick={() => clickHandler(group.id)}
                        activeClass={
                            group.id === tasks.activeTaskGroup ? 'active' : null
                        }
                    />
                )
            }
        </div>
    );
}

export default BaseGroupContainer;