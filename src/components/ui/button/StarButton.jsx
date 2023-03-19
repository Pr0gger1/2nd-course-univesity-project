import StarIcon from "@mui/icons-material/StarRounded";
import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorderRounded";

const StarButton = ({ isFavorite, onClick, sx = {} }) => {
    return (
        <>
            {
                isFavorite ?
                    <StarIcon sx={Object.assign({
                        color: "#ffc107",
                        fontSize: 32,
                        cursor: 'pointer'
                    }, sx)}
                    onClick={onClick}
                />
                :
                    <StarBorderIcon
                    sx={Object.assign({
                        fontSize: 32,
                        color: 'var(--starColor)',
                        cursor: 'pointer'
                    }, sx)}
                    onClick={onClick}
                />
            }
        </>
    );
};

export default StarButton;