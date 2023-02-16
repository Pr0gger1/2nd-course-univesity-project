import React, { useContext } from "react";
import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";

import styles from "./styles/LeftSidebar.module.css";

import testAvatar from "../../assets/test/testAvatar.jpg";
import BaseGroupContainer from "../ui/containers/BaseGroupContainer";
import adaptiveUi from "../../context/adaptiveUi.context";

export const LeftSidebar = () => {
    const {sidebars} = useContext(adaptiveUi);
    const searchClickHandler = () => {
         sidebars.setIsLeftSidebarOpened(prev => !prev);
    }

    return (
        <aside className={
                styles.sidebar__left
                 + `${!sidebars.isLeftSidebarOpened ? ' ' + styles.closed : ''}`
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
        </aside>
    );
}