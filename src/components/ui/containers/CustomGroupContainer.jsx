import React, {useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedGroup } from '../../../store/reducers/TaskGroupSlice';
import { generateUniqueId } from '../../../utils/generateUniqueId';

import defaultIcon from '../../../assets/img/icons/default/custom_group_task_icon.svg';
import styles from './styles/CustomGroupContainer.module.css';

import TaskGroup from '../cards/TaskGroup';


const CustomGroupContainer = () => {
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const dispatch = useDispatch();
    const [customGroups, setCustomGroups] = useState([]);

    const navigate = useNavigate();

    // Здесь будет посылаться запрос на сервер и вытягиваться информация
    // о кастомных группах. Пока что заносится фейк инфо
    useMemo(() => {
        setCustomGroups([{
            title: "Education",
            icon: defaultIcon,
            counter: 0,
            id: generateUniqueId('task', 4)
        },
        {
            title: "My project",
            icon: defaultIcon,
            counter: 0,
            id: generateUniqueId('task', 4)
        }])
    }, []);


    const clickHandler = (groupId) => {
        dispatch(setSelectedGroup({ groupId }));
        localStorage.setItem('selectedTaskGroup', groupId);
        navigate(`/tasks/${groupId}`);
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
                        onClick={() => clickHandler(group.id)}
                        isActive={
                            group.id === selectedTaskGroup ? 'active' : null
                        }
                    />
                 )

             }
         </div>
    );
};

export default CustomGroupContainer;