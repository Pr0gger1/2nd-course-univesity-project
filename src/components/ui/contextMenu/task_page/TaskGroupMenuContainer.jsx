import React, { useRef, useState } from "react";

import ContextMenu from "../ContextMenu";
import TaskGroupMenuList from "./TaskGroupMenuList";
import IconButton from "../../button/IconButton";

import styles from "../../../content/styles/ContentTopPanel.module.scss";

const TaskGroupMenuContainer = () => {
    const menuContainerRef = useRef(null);
    const [anchorMenu, setAnchorMenu] = useState(null);

    const handleClick = (event) => {
        setAnchorMenu(event.currentTarget);
    };


    return (
        <div className={styles.context__container} ref={menuContainerRef}>
            <IconButton
                onClick={handleClick}
            >
                •••
            </IconButton>

            <ContextMenu
                anchorEl={anchorMenu}
                setAnchorEl={setAnchorMenu}
            >
                <TaskGroupMenuList/>
            </ContextMenu>
        </div>
    );
};

export default TaskGroupMenuContainer;