import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import ContextMenu from "../ContextMenu";
import TaskGroupMenuList from "./TaskGroupMenuList";
import IconButton from "../../button/IconButton";

import { CSSTransition } from "react-transition-group";
import ModalWindow from "../../modal/ModalWindow";

import styles from "../../../content/styles/ContentTopPanel.module.scss";

const TaskGroupMenuContainer = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const menuContainerRef = useRef(null);

    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    );

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <div className={styles.context__container} ref={menuContainerRef}>
            <IconButton
                // onClick={() => setIsMenuOpened(prevState => !prevState)}
                onClick={handleClick}
            >
                •••
            </IconButton>

            <ContextMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            >
                <TaskGroupMenuList/>
            </ContextMenu>
            {/* {
                isMobile ?
                    <ModalWindow
                        visible={isMenuOpened}
                        setVisible={setIsMenuOpened}
                    >
                        <ContextMenu
                            isMenuOpened={isMenuOpened}
                            setIsMenuOpened={setIsMenuOpened}
                            menuRef={menuContainerRef}
                        >
                            <TaskGroupMenuList />
                        </ContextMenu>
                    </ModalWindow>
                    :
                    <CSSTransition
                        in={isMenuOpened}
                        timeout={500}
                        classNames='menu_page'
                        onEnter={() => setIsMenuOpened(true)}
                        onExited={() => setIsMenuOpened(false)}
                        unmountOnExit
                    >
                        <ContextMenu
                            isMenuOpened={isMenuOpened}
                            setIsMenuOpened={setIsMenuOpened}
                            menuRef={menuContainerRef}
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
                        >
                            <TaskGroupMenuList />
                        </ContextMenu>
                    </CSSTransition>
            } */}
        </div>
    );
};

export default TaskGroupMenuContainer;