import { createContext } from "react";

const UIStates = createContext({
    sidebars: {
        isLeftSidebarOpened: true,
        setIsLeftSidebarOpened: () => {},
        isRightSidebarOpened: false,
        setIsRightSidebarOpened: () => {}
    }
})

export default UIStates;