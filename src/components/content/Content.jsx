import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import { setSelectedGroup } from '../../store/reducers/TaskGroupSlice';

import TaskContainer from '../ui/containers/TaskContainer';
import ContentTopPanel from './parts/ContentTopPanel';
import FilteredContent from './parts/FilteredContent';

import styles from './styles/Content.module.scss';

const Content = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

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
         document.title = selectedGroup.webTitle || 'Productify'
    }, [selectedGroup]);

    return (
        <div className={styles.content}
            style={!isMobile && {width: '100vw'}}
        >
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