import React, { useRef, useState } from 'react';
import { useSelector } from "react-redux";

import Button from '../ui/button/Button';
import TaskGroupMenuContainer from '../ui/containers/TaskGroupMenuContainer';
import ContextMenu from '../ui/contextMenu/ContextMenu';

import { DateFormatter } from '../../utils/DateFormatter';

import styles from './styles/ContentTopPanel.module.scss';

const ContentTopPanel = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const menuRef = useRef(null);

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    // useEffect(() => {
    //     console.log(filterTask);
    // }, [filterTask]);

    // const onAlphabetFilterClick = event => {
    //     let filterData = {
    //         type: event.target.value,
    //         desc: false
    //     }
    //
    //     if (filterTask.desc)
    //         filterData.desc = true;
    //
    //     setFilterTask(filterData);
    // }

    return (
        <section className={styles.content__top_panel}>
            <div className={styles.top_panel__left}>
                <div className={styles.task_list__title}>
                    <span>
                        { selectedGroup.pageTitle }
                    </span>

                    <span className={styles.day_of_week__title}>
                      {' | ' + new DateFormatter().getDayOfWeek()}
                    </span>
                </div>

                <span className={styles.date__title}>
                    {new DateFormatter().getFullDate()}
                </span>
            </div>

            <div className={styles.context__container} ref={menuRef}>
                <Button customClass={styles.task_list__settings}
                    onClick={() => setIsMenuOpened(prevState => !prevState)}
                >
                    •••
                </Button>

                <ContextMenu
                    isMenuOpened={isMenuOpened}
                    setIsMenuOpened={setIsMenuOpened}
                    menuRef={menuRef}
                >
                    <TaskGroupMenuContainer/>
                </ContextMenu>
            </div>

        </section>
    );
};

export default ContentTopPanel;