import React, {useState, useEffect} from 'react';
import CustomGroup from '../cards/CustomGroup';

import styles from './styles/CustomGroupContainer.module.css';
// import useCustomGroups from '../../../hooks/useCustomGroups';


const CustomGroupContainer = () => {

    const customFakeGroups = [
        {icon: "default", title: "Education", id: 0},
        {icon: "default", title: "My project", id: 1}
    ]

    const [activeIndex, setActiveIndex] = useState(null);

    const clickHandler = (index) => {
        setActiveIndex(
            index === activeIndex ? null : index
            );
    }


    return (

         <div className={styles.custom_group__container}>
             {
                 customFakeGroups.map((group, index) =>
                    <CustomGroup
                        key={group.id}
                        icon={group.icon}
                        title={group.title}
                        counter={group.counter}
                        onClick={() => clickHandler(index)}
                        activeClass={
                            index === activeIndex ? 'active' : null
                        }
                    />
                 )

             }
         </div>
    );
};

export default CustomGroupContainer;