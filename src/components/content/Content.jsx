import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";


import TaskContainer from '../ui/containers/TaskContainer';
import ContentTopPanel from './components/ContentTopPanel';
import FilteredContent from './components/FilteredContent';

import styles from './styles/Content.module.scss';

const Content = () => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const filter = useSelector(
        state => state.filterStates.searchFilter
    );

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