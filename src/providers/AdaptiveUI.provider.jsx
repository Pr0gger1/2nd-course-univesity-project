import React, { useContext, useState } from 'react';
import adaptiveUi from '../context/adaptiveUi.context';

const AdaptiveUIPovider = ({ children }) => {
    const [isLeftSidebarOpened, setIsLeftSidebarOpened] = useState(true);
    const [isRightSidebarOpened, setIsRightSidebarOpened] = useState(false);

    return (
        <adaptiveUi.Provider value={{
            sidebars: {
                isLeftSidebarOpened,
                isRightSidebarOpened,
                setIsLeftSidebarOpened,
                setIsRightSidebarOpened
            }
        }}>
            {children}
        </adaptiveUi.Provider>
    );
};

export default AdaptiveUIPovider;