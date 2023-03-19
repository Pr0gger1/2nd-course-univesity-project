import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const DeleteButton = ({ onClick }) => {
    return (
        <DeleteRoundedIcon
            onClick={onClick}
            sx={{
                fontSize: 24,
                color: '#ff554b',
                backgroundColor: 'var(--bgColorFirst)',
                borderRadius: '0.5rem',
                padding: 1,
                cursor: 'pointer'
            }}
        />
    );
};

export default DeleteButton;