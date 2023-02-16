import { useState } from "react";

const useCustomGroups = () => {
    const [customGroups, setCustomGroups] = useState([]);

    const getCustomGroups = () => {
        //fake api
        const customFakeGroups = [
            {icon: "default", title: "Education"},
            {icon: "default", title: "My project"}
        ]
        setCustomGroups(customFakeGroups);
    }
    getCustomGroups();

    return [customGroups];
}
export default useCustomGroups;