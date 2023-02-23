const ConditionalRoute = ({ conditionVar, onTrueRoute, onFalseRoute }) => {
    return (
        conditionVar ? onTrueRoute : onFalseRoute
    );
};

export default ConditionalRoute;