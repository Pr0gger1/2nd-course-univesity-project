import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSelectedGroup } from "../../../../store/reducers/TaskGroupSlice";
import { setCurrentRoute } from "../../../../store/reducers/RouteSlice";

import CreateListButton from "../../button/CreateListButton";
import BaseGroups from "./BaseGroups";
import CustomGroups from "./CustomGroups";

import styles from "../styles/TaskGroupContainer.module.scss";

const TaskGroupContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const taskGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups
    );

    const clickHandler = (group) => {
        dispatch(setSelectedGroup({ group }));

        dispatch(setCurrentRoute(`/tasks/${group.id}`));
        navigate(`/tasks/${group.id}`);
    }

    return (
        <div className={styles.groups}>
            <BaseGroups
                taskGroups={taskGroups.base}
                onClick={clickHandler}
            />

            <div className={styles.container}>
                <CustomGroups
                    taskGroups={taskGroups.custom}
                    onClick={clickHandler}
                />
                <CreateListButton/>
            </div>
        </div>
    );
};

export default TaskGroupContainer;