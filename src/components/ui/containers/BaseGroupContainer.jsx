import React, { useState } from 'react';

import todayTaskIcon from '../../../assets/img/icons/task_list/today_task_icon.svg';
import planTaskIcon from '../../../assets/img/icons/task_list/plan_task_icon.svg';
import favouriteTaskIcon from '../../../assets/img/icons/task_list/favourite_task_icon.svg';
import completedTaskIcon from '../../../assets/img/icons/task_list/completed_task_icon.svg';
import allTasksIcon from '../../../assets/img/icons/task_list/all_tasks_icon.svg';

import styles from './styles/BaseGroupContainer.module.css';
import BaseGroup from '../cards/BaseGroup';

const BaseGroupContainer = () => {
    const groups = [
        {title: "Сегодня", icon: todayTaskIcon, counter: 0, id: 1},
        {title: "Запланировано", icon: planTaskIcon, counter: 2, id: 2},
        {title: "Избранные", icon: favouriteTaskIcon, counter: 0, id: 3},
        {title: "Завершенные", icon: completedTaskIcon, counter: 0, id: 4},
        {title: "Все задачи", icon: allTasksIcon, counter: 0, id: 5},
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const clickHandler = (index) => {
        console.log("click")
        setActiveIndex(index === activeIndex ? null : index);
    }

    return (
        <div className={styles.base_group__container}>
            {
                groups.map((group, index) => 
                    <BaseGroup 
                        key={group.id}
                        icon={group.icon}
                        title={group.title}
                        counter={group.counter}
                        onClick={() => clickHandler(index)}
                        activeClass={
                            index === activeIndex ? 'active' : null
                        }
                    />
                )
            }
        </div>
    );
}

export default BaseGroupContainer;