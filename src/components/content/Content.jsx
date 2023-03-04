import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedGroup } from '../../store/reducers/TaskGroupSlice';

import TasksContainer from '../ui/containers/TasksContainer'; 
import ContentTopPanel from './ContentTopPanel';

import styles from './styles/Content.module.css';


const Content = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedGroup = useSelector(state => state.taskGroupStates.selectedTaskGroup);
    const allGroupsObject = useSelector(state => state.taskGroupStates.allTaskGroups);
    const currentRoute = useSelector(state => state.routeState.currentRoute);


    useEffect(() => {
        const groupId = currentRoute.split('/')[2];
        const allGroups = [...allGroupsObject.base, ...allGroupsObject.custom];

        const group = allGroups.find(group => group.id === groupId);

        if (group) {
            dispatch(setSelectedGroup({ group }));
        }
        else {
         navigate('/');
        }

    }, [
        allGroupsObject.base,
        allGroupsObject.custom,
        currentRoute, dispatch,
        navigate
    ]);


    useEffect(() => {
        try {
            document.title = selectedGroup.webTitle
        }
        catch (e) {
            document.title = 'Productify';
        }
    }, [selectedGroup]);

    return (
        <div className={styles.content}>
            <ContentTopPanel/>
            <TasksContainer/>
        </div>
    );
};

export default Content;