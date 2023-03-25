import React, { useState, useEffect } from 'react';
import { Popover } from '@mui/material'
import { useSelector } from 'react-redux';

const ContextMenu = ({children,anchorEl, setAnchorEl}) => {
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    );
        
    // useEffect(() => {
    //     const handleClickOutside = event => {
    //         if (menuRef.current) {
    //             const body = document.body;
    //             const selectListDiv = document.getElementById('menu-');
    //             const isTargetContains = menuRef.current.contains(event.target);
    //             const isTargetList = selectListDiv && selectListDiv.contains(event.target);

    //             if (event.target !== body && !isTargetContains && !isTargetList)
    //                 setIsMenuOpened(false);
    //         }
    //     };

    //     document.addEventListener('click', handleClickOutside);

    //     return () => document.removeEventListener('click', handleClickOutside);
    // }, [menuRef, setIsMenuOpened]);

    const closeMenuHandler = () => {
        setAnchorEl(null);
    }

    return (
        // isMenuOpened &&
        // <div className={styles.context__menu}>
        //     { children }
        // </div>
        <Popover
            sx={{
                "& .MuiPaper-root": {
                    
                    color: "var(--fontColor)",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                    width: isMobile ? "100%" : "20%",
                    minWidth: "20%",
                },
                "& .MuiTypography-root": {
                    fontSize: "18px",
                },
                "& img": {
                    width: "1.3rem",
                    height: "1.3rem"
                }
            }}
            PaperProps={{
                style: {
                    backgroundColor: "var(--bgColorSecond)",
                }
            }}
            
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeMenuHandler}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {children}
        </Popover>
    );
};

export default ContextMenu;