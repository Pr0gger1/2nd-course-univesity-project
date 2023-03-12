import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroupTasks } from "../../store/reducers/TaskSlice";
import Task from "../ui/cards/Task";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from '../ui/containers/styles/TasksContainer.module.scss';

const FilteredContent = () => {
    const dispatch = useDispatch();

    const currentGroupTasks = useSelector(
        state => state.tasksStates.currentGroupTasks
    );

    const filter = useSelector(
        state => state.filterStates.searchFilter
    );

    const tasks = useSelector(
        state => state.tasksStates.tasks
    );

    useEffect(() => {
        let currentTasks = [];

        if (filter && filter.length) {
            currentTasks = tasks.filter(
                task => task.taskName.includes(filter)
            );

            dispatch(setCurrentGroupTasks({tasks: currentTasks}));
        }

    }, [dispatch, filter, tasks]);
    return (
        <div className={styles.tasks__container}>
            <TransitionGroup style={{paddingLeft: '0.5rem'}}>
                {
                    currentGroupTasks.length > 0 && (
                    currentGroupTasks.map((task, index) =>
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="item"
                            mountOnEnter
                        >
                            <Task
                                key={task.taskId}
                                taskDataProps={task}
                            />
                        </CSSTransition>
                    ))
                }
                </TransitionGroup>
        </div>
    );
};

export default FilteredContent;