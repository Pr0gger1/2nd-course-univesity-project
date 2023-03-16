import React from "react";
import Button from "./Button";

import styles from "./styles/IconButton.module.scss";

const IconButton = ({ onClick, children }) => {
    return (
        <Button customClass={styles.icon__button}
                onClick={onClick}
        >
            { children }
        </Button>
    );
};

export default IconButton;