import React from 'react';
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import IconButton from "../../ui/button/IconButton";
import WestRoundedIcon from '@mui/icons-material/WestRounded';

import TaskGroupMenuContainer from "../../ui/contextMenu/TaskGroupMenuContainer";

import { DateFormatter } from '../../../utils/DateFormatter';

import styles from '../styles/ContentTopPanel.module.scss';
import '../../ui/animations/ContextMenu/ContextMenuPageAnimation.scss';
import {useNavigate} from "react-router-dom";

const ContentTopPanel = () => {
    const contextMenuMedia = useMediaQuery({minWidth: 1101});
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    );
    const navigate = useNavigate();

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    return (
        <section className={styles.content__top_panel}>
            {
                isMobile &&
                <div
                    onClick={() => navigate('/')}
                >
                    <IconButton>
                        <WestRoundedIcon/>
                    </IconButton>
                </div>
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
                contextMenuMedia &&
                <TaskGroupMenuContainer/>
            }
        </section>
    );
};

export default ContentTopPanel;