import React, { useRef } from 'react';

import styles from './styles/ContextMenu.module.scss';

const ContextMenu = ({ isMenuOpened, setIsMenuOpened, menuRef, children }) => {

    // const menuRef = useRef(null);
    const nodeRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = event => {
    //         console.log(event.target)
    //         console.log(menuRef.current)
    //         console.log(menuRef.current.contains(event.target))
    //
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setIsMenuOpened(false);
    //         }
    //         else setIsMenuOpened(true);
    //     };
    //
    //     document.body.addEventListener('click', handleClickOutside);
    //
    //     return () => {
    //         document.body.removeEventListener('click', handleClickOutside);
    //     };
    // }, [nodeRef, menuRef, setIsMenuOpened]);

    return (
        isMenuOpened &&
        <div className={styles.context__menu} ref={nodeRef}>
            { children }
        </div>
    );
};

export default ContextMenu;