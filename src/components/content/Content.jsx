import React, {useEffect} from 'react';
import styles from './Content.module.css';
import {useSelector} from 'react-redux';

import { DateFormatter } from '../../utils/DateFormatter';
import { groupTitle } from '../ui/containers/BaseGroupContainer';


const Content = () => {
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    useEffect(() => {
        try {
            document.title = groupTitle[selectedGroup].webTitle;
        }
        catch (e) {
            document.title = 'Productify';
        }
    }, [selectedGroup]);

    return (
        <div className={styles.content}>
            <div className={styles.task_list__container}>
                <section className={styles.content__top_panel}>
                    <div className={styles.task_list__title}>
                        { groupTitle[selectedGroup].pageTitle }

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