import React from "react";
import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";

import styles from "./styles/LeftSidebar.module.css";

import testAvatar from '../../assets/test/testAvatar.jpg';
import BaseGroupContainer from "../ui/containers/BaseGroupContainer";
import CustomGroupContainer from '../ui/containers/CustomGroupContainer';
import CreateListButton from '../ui/button/CreateListButton';

import { useDispatch, useSelector } from "react-redux";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";

export const LeftSidebar = () => {
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );
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

            <BaseGroupContainer/>
            <div className={styles.container}>
                <CustomGroupContainer/>
                <CreateListButton/>
            </div>
        </aside>
    );
}