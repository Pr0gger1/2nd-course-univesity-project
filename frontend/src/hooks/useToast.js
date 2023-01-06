import {useState} from "react";

export const useToast = () => {
    const [toastList, setToastList] = useState([]);

    class toastElement {
        constructor(description, title) {
            this.properties = {
                id: toastList.length,
                title: title,
                description: description,
                type: "default"
            };
        }
        get info() {
            this.properties.type = "info";
            return setToastList([...toastList, this.properties]);
        }
        get success() {
            this.properties.type = "success";
            return setToastList([...toastList, this.properties]);
        }
        get warning() {
            this.properties.type = "warning";
            return setToastList([...toastList, this.properties]);
        }
        get error() {
            this.properties.type = "error";
            return setToastList([...toastList, this.properties]);
        }
    }

    return {toastList, setToastList, toastElement};
}