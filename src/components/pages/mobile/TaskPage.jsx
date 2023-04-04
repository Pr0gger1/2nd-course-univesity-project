import React from 'react';
import { useSelector } from "react-redux";

import FilteredContent from "../../content/components/FilteredContent";
import ContentTopPanel from "../../content/components/ContentTopPanel";
import TaskContainer from "../../ui/containers/TaskContainer/TaskContainer";
import Header from "../../header/Header";

import { filterSelector } from "../../../store";

import styles from "./styles/TaskPage.module.scss";

const TaskPage = () => {
    const searchFilter = useSelector(filterSelector).searchFilter;

    return (
        <main className={styles.main__container}>
            <Header/>
            <div className={styles.content}>
                {
                    searchFilter.length
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