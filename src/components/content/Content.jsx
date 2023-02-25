import React from 'react';
import styles from './Content.module.css';
import { DateFormatter } from '../../utils/DateFormatter';
import { groupTitle } from "../ui/containers/BaseGroupContainer";
import {useSelector} from "react-redux";


const Content = () => {
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    return (
        <div className={styles.content}>
            <div className={styles.task_list__container}>
                <section className={styles.content__top_panel}>
                    <div className={styles.task_list__title}>
                        { groupTitle[selectedGroup] }

                        <span className={styles.day_of_week__title}>
                          {' | ' + new DateFormatter().getDayOfWeek()}
                        </span>
                    </div>
                    <span className={styles.date__title}>
                        {new DateFormatter().getFullDate()}
                    </span>
                </section>
            </div>
        </div>
    );
};

export default Content;