import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedGroup } from '../../../store/reducers/TaskGroupSlice';

import TaskGroup from '../cards/TaskGroup';

import styles from './styles/CustomGroupContainer.module.css';

const CustomGroupContainer = () => {
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customGroups = useSelector(
        state => state.taskGroupStates.allTaskGroups.custom
    );

    const clickHandler = (group) => {
        dispatch(setSelectedGroup({ group }));
        localStorage.setItem('selectedTaskGroup', JSON.stringify(group));
        navigate(`/tasks/${group.id}`);
    }

    return (
         <div className={styles.custom_group__container}>
            {
            customGroups.map(group =>
                <TaskGroup
                    key={group.id}
                    icon={group.icon}
                    title={group.title}
                    counter={group.counter}
                    onClick={() => clickHandler(group)}
                    isActive={
                        group.id === selectedTaskGroup.id ? 'active' : null
                    }
                />
                )
            }
         </div>
    );
};

export default CustomGroupContainer;