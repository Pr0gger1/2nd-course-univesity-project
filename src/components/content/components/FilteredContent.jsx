import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroupTasks } from "../../../store/reducers/TaskSlice";
import Task from "../../ui/cards/Task";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as selectors from "../../../store";

import styles from '../../ui/containers/styles/TaskContainer.module.scss';

const FilteredContent = () => {
    const dispatch = useDispatch();

    const currentGroupTasks = useSelector(selectors.currentGroupTasksSelector);
    const searchFilter = useSelector(selectors.filterSelector).searchFilter;
    const tasks = useSelector(selectors.tasksSelector);

    useEffect(() => {
        let currentTasks = [];
        if (searchFilter && searchFilter.length) {
            currentTasks = tasks.filter(
                task => task.taskName.includes(searchFilter)
            );

            dispatch(setCurrentGroupTasks({tasks: currentTasks}));
        }
    }, [dispatch, searchFilter, tasks]);
    
    return (
        <div className={styles.tasks__container}>
            <TransitionGroup style={{
                paddingLeft: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
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
                                key={task.id}
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