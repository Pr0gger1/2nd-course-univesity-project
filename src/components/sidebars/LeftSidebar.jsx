import React, { useContext } from "react";
import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";

import styles from "./styles/LeftSidebar.module.css";

import testAvatar from '../../assets/test/testAvatar.jpg';
import BaseGroupContainer from "../ui/containers/BaseGroupContainer";
import UIStates from "../../context/UIStates.context";
import CustomGroupContainer from '../ui/containers/CustomGroupContainer';
import CreateListButton from '../ui/button/CreateListButton';

// import { useSelector, useDispatch } from "react-redux";

export const LeftSidebar = () => {
    const {sidebars} = useContext(UIStates);
    // const isLbarOpened = useSelector(state => state.uiStates.value);
    // const dispatch = useDispatch();

    const searchClickHandler = () => {
        if (!sidebars.isLeftSidebarOpened)
         sidebars.setIsLeftSidebarOpened(prev => !prev);
    }

    return (
        <aside className={
            styles.sidebar__left
            + `${!sidebars.isLeftSidebarOpened ? ' ' + styles.closed : ''}`
            // + `${!isLbarOpened ? ' ' + styles.closed : ''}`
            }
        >

            <UserDataCard
                name="Alexey Bobrov"
                email="alexeybobrov@gmail.com"
                photo={testAvatar}
            />

            <SearchInput
                onClick={() => searchClickHandler()}
                placeholder="Поиск..."
            />
            <BaseGroupContainer/>
            <CustomGroupContainer/>
            {/*<div className={styles.groups__container}>*/}
            {/*    <div className={styles.groups}>*/}
            {/*    </div>*/}
            <CreateListButton/>
            {/*</div>*/}
        </aside>
    );
}