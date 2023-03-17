import React from "react";
import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";

import styles from "./styles/LeftSidebar.module.scss";

import testAvatar from '../../assets/test/testAvatar.jpg';

import { useDispatch, useSelector } from "react-redux";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";
import TaskGroupsContainer from "../ui/containers/TaskGroupsContainer";

const LeftSidebar = () => {
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );
    // const isLSidebarOpened = localStorage.getItem('LSidebarOpened');

    const dispatch = useDispatch();

    const searchClickHandler = () => {
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    }

    return (
        <aside className={
            styles.sidebar__left
            + `${!isLSidebarOpened ? ' ' + styles.closed : ''}`
            }
        >
            <UserDataCard
                name="Alexey Bobrov"
                email="alexeybobrov@gmail.com"
                photo={testAvatar}
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