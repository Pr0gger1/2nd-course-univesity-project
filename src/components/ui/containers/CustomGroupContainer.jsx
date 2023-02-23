import React, {useContext, useMemo} from 'react';
import CustomGroup from '../cards/CustomGroup';

import defaultIcon from '../../../assets/img/icons/default/custom_group_task_icon.svg';

import styles from './styles/CustomGroupContainer.module.css';
import UIStates from "../../../context/UIStates.context";
import {generateUniqueId} from "../../../utils/generateUniqueId";


const CustomGroupContainer = () => {
    const customFakeGroups = useMemo(() => {
        return [
            {
                title: "Education",
                icon: defaultIcon,
                counter: 0,
                id: generateUniqueId('task', 4)
            },
            {
                title: "My project",
                icon: defaultIcon,
                counter: 0,
                id: generateUniqueId('task', 4)
            }
        ];
    }, []);

    const {tasks} = useContext(UIStates);

    const clickHandler = (index) => {
        tasks.setActiveTaskGroup(
            index === tasks.activeTaskGroup ? null : index
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
                            index === tasks.activeTaskGroup ? 'active' : null
                        }
                    />
                 )

             }
         </div>
    );
};

export default CustomGroupContainer;