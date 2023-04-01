import React from 'react';
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import TaskGroup from "../../cards/TaskGroup";
import styles from "../styles/TaskGroupContainer.module.scss";

const CustomGroups = ({ taskGroups, onClick }) => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const isLSidebarOpened = useSelector(
    state => state.sidebarStates.isLeftSidebarOpen
    );

    const hideOverflow = !isLSidebarOpened ? {
    overflow: 'hidden'
    } : {};

    return (
        <div className={styles.custom_group__container}
            style={hideOverflow}
         >
            {
            taskGroups &&
            taskGroups.map(group =>
                <TaskGroup
                    key={group.id}
                    taskGroupData={{
                        id: group.id,
                        icon: group.icon,
                        title: group.title,
                        isActive: !isMobile && group.id === selectedTaskGroup.id ? 'active' : null
                    }}
                    onClick={() => onClick(group)}
                />
                )
            }
         </div>
    );
};

export default CustomGroups;