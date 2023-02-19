import React, { useState } from 'react';
import UIStates from '../context/UIStates.context';

const UIStatesProvider = ({ children }) => {
    const [isLeftSidebarOpened, setIsLeftSidebarOpened] = useState(true);
    const [isRightSidebarOpened, setIsRightSidebarOpened] = useState(false);

    return (
        <UIStates.Provider value={{
            sidebars: {
                isLeftSidebarOpened,
                isRightSidebarOpened,
                setIsLeftSidebarOpened,
                setIsRightSidebarOpened
            }
        }}>
            {children}
        </UIStates.Provider>
    );
};

export default UIStatesProvider;