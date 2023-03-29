import React from 'react';
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import TaskGroup from "../../cards/TaskGroup";

import styles from "../styles/TaskGroupContainer.module.scss";

const BaseGroups = ({ taskGroups, onClick }) => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    return (
        <div className={styles.base_group__container}>
        {
            taskGroups.map(group =>
                <TaskGroup
                    key={group.id}
                    taskGroupData={{
                        id: group.id,
                        icon: group.icon,
                        title: group.title,
                        isActive: !isMobile && group.id === selectedTaskGroup.id
                        ? 'active' : null
                    }}
                    onClick={() => onClick(group)}
                />
            )
        }
        </div>
    );
};

export default BaseGroups;