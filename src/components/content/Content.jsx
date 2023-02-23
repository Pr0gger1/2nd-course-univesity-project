import React, {useContext} from 'react';
import styles from './Content.module.css';
import { DateFormatter } from '../../utils/DateFormatter';
import UIStates from "../../context/UIStates.context";
import { groupTitle } from "../../providers/UIStates.provider";


const Content = () => {
    const { tasks } = useContext(UIStates);
    return (
        <div className={styles.content}>
            <div className={styles.task_list__container}>
                <section className={styles.content__top_panel}>
                    <h1 className={styles.task_list__title}>
                        {groupTitle[tasks.selectedGroup]}
                        <span className={styles.day_of_week__title}>
                        | {new DateFormatter().getDayOfWeek()}
                        </span>
                    </h1>
                    <span className={styles.date__title}>
                        {new DateFormatter().getFullDate()}
                    </span>
                </section>
            </div>
        </div>
    );
};

export default Content;