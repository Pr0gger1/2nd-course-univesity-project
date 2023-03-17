import React from 'react';
import { useSelector } from "react-redux";

import FilteredContent from "../../content/parts/FilteredContent";
import ContentTopPanel from "../../content/parts/ContentTopPanel";
import TaskContainer from "../../ui/containers/TaskContainer";
import Header from "../../header/Header";

import styles from "./styles/TaskPage.module.scss";
const TaskPage = () => {
    const filter = useSelector(
        state => state.filterStates.searchFilter
    );

    return (
        <main className={styles.main__container}>
            <Header/>
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
        </main>
    );
};

export default TaskPage;