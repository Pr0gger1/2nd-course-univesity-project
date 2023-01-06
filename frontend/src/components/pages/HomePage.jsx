import React, {useContext} from "react";
import {ToastContext} from "../../context/toast.context";

const HomePage = () => {
    const {toastElement} = useContext(ToastContext)

    return (
        <div>
            <button onClick={() => new toastElement('desc', 'title').success}>Click</button>
        </div>
    )
}

export default HomePage;