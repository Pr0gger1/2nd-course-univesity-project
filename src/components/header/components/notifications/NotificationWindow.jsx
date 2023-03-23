import React from 'react';

import Popover from '@mui/material/Popover';
import NotificationContainer from './NotificationContainer';

const NotificationWindow = ({ anchor, setAnchor }) => {
    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <Popover
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "var(--bgColor)",
                    color: "var(--fontColor)",
                    borderRadius: "8px",
                    padding: "1rem",
                    width: "12rem",
                },
                "& .MuiTypography-root": {
                    fontSize: "18px",
                },
            }}
            PaperProps={{
                style: {
                    backdropFilter: "blur(5px)"
                }
            }}
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <NotificationContainer/>
        </Popover>
    );
};

export default NotificationWindow;