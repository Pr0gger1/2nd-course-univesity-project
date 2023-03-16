import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedGroup } from '../../store/reducers/TaskGroupSlice';

import TaskContainer from '../ui/containers/TaskContainer';
import ContentTopPanel from './parts/ContentTopPanel';
import FilteredContent from './parts/FilteredContent';

import styles from './styles/Content.module.scss';

const Content = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const allGroupsObject = useSelector(
        state => state.taskGroupStates.allTaskGroups
    );
    const currentRoute = useSelector(
        state => state.routeState.currentRoute
    );
    const filter = useSelector(
        state => state.filterStates.searchFilter
    );
 
    useEffect(() => {
        const groupId = currentRoute.split('/')[2];
        const allGroups = [...allGroupsObject.base, ...allGroupsObject.custom];

        const group = allGroups.find(group => group.id === groupId);

        if (group)
            dispatch(setSelectedGroup({ group }));
        else navigate('/');


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
            {
                filter.length
                ? <FilteredContent/>
                :
                <>
                    <ContentTopPanel/>
                    <TaskContainer/>
                </>
            }
        </div>
    );
};

export default Content;