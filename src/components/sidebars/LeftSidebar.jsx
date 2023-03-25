import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLSidebarOpen } from "../../store/reducers/SidebarSlice";
import { UserService } from "../../services/user.service";

import UserDataCard from "../ui/cards/UserDataCard";
import SearchInput from "../ui/input/SearchInput";
import TaskGroupsContainer from "../ui/containers/TaskGroupsContainer";

import testAvatar from '../../assets/test/testAvatar.jpg';

import styles from "./styles/LeftSidebar.module.scss";

const LeftSidebar = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );
    const userData = useSelector(
        state => state.authStates.userData
    );
    
    const searchClickHandler = () => {
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    };
    
    useEffect(() => {
        const fetchData = async () => {
            return await UserService.getUserData(userData.uid);
        }

        if (userData && userData.uid) {
            fetchData().then(res => setUsername(res.username));
            fetchData().then(res => setEmail(res.email));
        }
    }, [userData]);

    return (
        <aside className={
            styles.sidebar__left
            + `${!isLSidebarOpened ? ' ' + styles.closed : ''}`
            }
        >
            <UserDataCard
                name={username}
                email={email}
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