import React, { useState } from 'react';
import UIStates from '../context/UIStates.context';

export const baseGroupNames = {
    today: 'task_today',
    plan: 'task_plan',
    favorite: 'task_favorite',
    completed: 'task_completed',
    all: 'task_all'
}

export const groupTitle = {
    'task_today': '✌️Мой день',
    'task_plan': '🗓️Запланировано',
    'task_favorite': '✨Избранное',
    'task_completed': '✅Завершенное',
    'task_all': '🎯Все задачи'
}

const UIStatesProvider = ({ children }) => {
    // sidebars states
    const [isLeftSidebarOpened, setIsLeftSidebarOpened] = useState(true);
    const [isRightSidebarOpened, setIsRightSidebarOpened] = useState(false);

    const [activeTaskGroup, setActiveTaskGroup] = useState(null);

    const [isMobile, setIsMobile] = useState(/Mobi/i.test(navigator.userAgent));

    const [selectedGroup, setSelectedGroup] = useState(
        localStorage.getItem('selectedGroup') || baseGroupNames.today
    );


    return (
        <UIStates.Provider value={{
            sidebars: {
                isLeftSidebarOpened,
                isRightSidebarOpened,
                setIsLeftSidebarOpened,
                setIsRightSidebarOpened
            },
            tasks: {
                selectedGroup,
                setSelectedGroup,
                activeTaskGroup,
                setActiveTaskGroup
            },
            isMobile,
            setIsMobile
        }}>
            {children}
        </UIStates.Provider>
    );
};

export default UIStatesProvider;