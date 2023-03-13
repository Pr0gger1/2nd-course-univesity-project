import {useMemo} from "react";

function sortTasksByText(a, b, desc = true) {
    if (!desc) {
        let temp = a;
        a = b;
        b = temp;
    }
    return a.taskName.localeCompare(b.taskName);
}

function sortTasksByTime(a, b, desc = true) {
    if (!desc) {
        let temp = a;
        a = b;
        b = temp;
    }
    return a > b;
}
export const useTask = (groupTasks, filter) => {
    return useMemo(() => {
        if (filter.type === 'alphabet')
            return [...groupTasks].sort((a, b) => sortTasksByText(a, b, filter.desc));
        else if (filter.type === 'created_at')
            return [...groupTasks].sort((a, b) => sortTasksByTime(a, b, filter.desc));

    }, [groupTasks, filter]);
}