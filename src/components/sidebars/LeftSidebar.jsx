import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";

import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";
import TaskGroupsContainer from "../ui/containers/TaskGroupsContainer";

import styles from "./styles/LeftSidebar.module.scss";

const LeftSidebar = () => {
    const dispatch = useDispatch();
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );
    
    const searchClickHandler = () => {
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    };

    return (
        <aside className={
            styles.sidebar__left
            + `${!isLSidebarOpened ? ' ' + styles.closed : ''}`
            }
        >
            <UserDataCard
            />

            <SearchInput
                onClick={searchClickHandler}
                placeholder="Поиск..."
            />
            <TaskGroupsContainer/>
        </aside>
    );
}
export default LeftSidebar;