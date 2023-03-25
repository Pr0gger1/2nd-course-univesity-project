import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import TaskGroupMenuContainer from '../../ui/contextMenu/task_page/TaskGroupMenuContainer';
import BackButton from "../../ui/button/BackButton";

import { DateFormatter } from '../../../utils/DateFormatter';

import styles from '../styles/ContentTopPanel.module.scss';
import '../../ui/animations/ContextMenu/ContextMenuPageAnimation.scss';

const ContentTopPanel = () => {
    // const contextMenuMedia = useMediaQuery({minWidth: });

    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );


    return (
        <section className={styles.content__top_panel}>
            {
                isMobile &&
                <BackButton to='/'/>
            }

            <div className={styles.top_panel__left}>
                <div className={styles.task_list__title}>
                    <span>
                        { selectedGroup.pageTitle }
                        <span className={styles.day_of_week__title}>
                            { new DateFormatter().getDayOfWeek() }
                        </span>
                    </span>
                </div>

                <span className={styles.date__title}>
                    {new DateFormatter().getFullDate()}
                </span>
            </div>

            {
                !mobileScreen &&
                <TaskGroupMenuContainer/>
            }
        </section>
    );
};

export default ContentTopPanel;