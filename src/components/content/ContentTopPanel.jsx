import React from "react";
import { useSelector } from "react-redux";

import { DateFormatter } from "../../utils/DateFormatter";
import Button from '../ui/button/Button';

import styles from "./styles/ContentTopPanel.module.css";

const ContentTopPanel = () => {
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    return (
        <section className={styles.content__top_panel}>
            <div className={styles.top_panel__left}>
                <div className={styles.task_list__title}>
                    { selectedGroup.pageTitle }

                    <span className={styles.day_of_week__title}>
                      {' | ' + new DateFormatter().getDayOfWeek()}
                    </span>
                </div>
                <span className={styles.date__title}>
                    {new DateFormatter().getFullDate()}
                </span>
            </div>
            <Button customClass={styles.task_list__settings}>
                •••
            </Button>



        </section>
    );
};

export default ContentTopPanel;