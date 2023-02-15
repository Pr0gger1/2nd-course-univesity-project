import React from 'react';

const NotificationCounter = ( {count = 0, children} ) => {
    return (
        <span>
            {children}
        </span>
    );
};

export default NotificationCounter;