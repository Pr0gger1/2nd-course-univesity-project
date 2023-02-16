import { createContext } from "react";

const adaptiveUi = createContext({
    sidebars: {
        isLeftSidebarOpened: true,
        setIsLeftSidebarOpened: () => {},
        isRightSidebarOpened: false,
        setIsRightSidebarOpened: () => {}
    }
})

export default adaptiveUi;