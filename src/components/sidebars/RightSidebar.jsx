import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setRSidebarOpen } from '../../store/reducers/SidebarSlice';
import { setSelectedTask } from '../../store/reducers/TaskSlice';

import CloseIcon from '@mui/icons-material/Close';
import TaskNameSection from "../ui/TaskInfo/TaskNameSection";
import TaskCategorySection from "../ui/TaskInfo/TaskCategorySection";
import TaskNotesSection from "../ui/TaskInfo/TaskNotesSection";

import '../ui/animations/Button/createListBtnAnimation.css'

import styles from './styles/RightSidebar.module.scss';
import TaskDatesSection from "../ui/TaskInfo/TaskDatesSection";

const RightSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isRSidebarOpened = useSelector(
        state => state.sidebarStates.isRightSidebarOpen
    );
    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const sidebarStyles = `${styles.sidebar__right}${!isRSidebarOpened ? ' ' + styles['closed'] : ''}`;


    useEffect(() => {
        if (!isRSidebarOpened) {
            navigate(`/tasks/${selectedTaskGroup.id}`)
            dispatch(setSelectedTask({taskData: {}}))
        }
    }, [dispatch, isRSidebarOpened, navigate, selectedTaskGroup.id]);

    return (
        <aside className={sidebarStyles}>
            <div className={styles.sidebar_container}>
                <div className={styles.sidebar_close__btn}>
                    <CloseIcon 
                        onClick={() => dispatch(setRSidebarOpen())}
                    />
                </div>

                <TaskNameSection/>
                <TaskCategorySection/>
                <TaskDatesSection/>
                <TaskNotesSection/>
            </div>
        </aside>
    );
};

export default RightSidebar;