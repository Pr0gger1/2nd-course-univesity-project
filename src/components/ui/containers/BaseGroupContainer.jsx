import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSelectedGroup } from '../../../store/reducers/TaskGroupSlice';

import TaskGroup from '../cards/TaskGroup';
import styles from './styles/BaseGroupContainer.module.css';


const BaseGroupContainer = () => {
    // активная группа задач
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    // Группы по умолчанию
    const groups = useSelector(state => state.taskGroupStates.allTaskGroups.base);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickHandler = (group) => {
        dispatch(setSelectedGroup({ group }));
        localStorage.setItem('selectedTaskGroup', JSON.stringify(group));

        navigate(`/tasks/${group.id}`);
    }

    return (
        <div className={styles.base_group__container}>
        {
            groups.map(group =>
                <TaskGroup
                    key={group.id}
                    icon={group.icon}
                    title={group.title}
                    counter={group.counter}
                    route={group.route}
                    onClick={() => clickHandler(group)}
                    isActive={
                        group.id === selectedTaskGroup.id ? 'active' : null
                    }
                />
            )
        }
        </div>
    );
}

export default BaseGroupContainer;