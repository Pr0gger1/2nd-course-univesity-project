import React from 'react';
import { Popover } from '@mui/material'
import { useSelector } from 'react-redux';

const ContextMenu = ({children, anchorEl, setAnchorEl}) => {
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    );

    const closeMenuHandler = () => {
        setAnchorEl(null);
    }

    return (
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