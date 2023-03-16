import React, { useEffect } from 'react';

import styles from './styles/ContextMenu.module.scss';

const ContextMenu = ({
     isMenuOpened, setIsMenuOpened, menuRef, children
    }) => {
        
    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current) {
                const body = document.body;
                const selectListDiv = document.getElementById('menu-');
                const isTargetContains = menuRef.current.contains(event.target);
                const isTargetList = selectListDiv && selectListDiv.contains(event.target);

                if (event.target !== body && !isTargetContains && !isTargetList)
                    setIsMenuOpened(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuRef, setIsMenuOpened]);

    return (
        isMenuOpened &&
        <div className={styles.context__menu}>
            { children }
        </div>
    );
};

export default ContextMenu;