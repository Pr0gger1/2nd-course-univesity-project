import React from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSelectedGroup } from "../../../store/reducers/TaskGroupSlice";
import { setCurrentRoute } from "../../../store/reducers/RouteSlice";
import TaskGroup from "../cards/TaskGroup";

import CreateListButton from "../button/CreateListButton";
import styles from "./styles/TaskGroupsContainer.module.scss";

const TaskGroupsContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups
    );

    const clickHandler = (group) => {
        dispatch(setSelectedGroup({ group }));

        dispatch(setCurrentRoute(`/tasks/${group.id}`));
        navigate(`/tasks/${group.id}`);
    }

    const hideOverflow = !isLSidebarOpened ? {
        overflow: 'hidden'
        } : {};

    return (
        <div className={styles.groups}>
            <div className={styles.base_group__container}>
            {
                taskGroups.base.map(group =>
                    <TaskGroup
                        key={group.id}
                        taskGroupData={{
                            icon: group.icon,
                            title: group.title,
                            counter: group.counter,
                            isActive: !isMobile && group.id === selectedTaskGroup.id
                            ? 'active' : null
                        }}
                        onClick={() => clickHandler(group)}
                    />
                )
            }
            </div>

            <div className={styles.container}>
                <div className={styles.custom_group__container}
                    style={hideOverflow}
                 >
                    {
                    taskGroups.custom.map(group =>
                        <TaskGroup
                            key={group.id}
                            taskGroupData={{
                                icon: group.icon,
                                title: group.title,
                                counter: group.counter,
                                isActive: !isMobile && group.id === selectedTaskGroup.id ? 'active' : null
                            }}
                            onClick={() => clickHandler(group)}
                        />
                        )
                    }
                 </div>
                <CreateListButton/>
            </div>
        </div>
    );
};

export default TaskGroupsContainer;