import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import filterIcon from "../../../assets/img/icons/filter_icon.svg";
import deleteGroupIcon from "../../../assets/img/icons/delete_icon.svg";

import { CustomSelect } from "../customComponents/CustomSelect";
import { MenuItem } from "@mui/material";
import { baseGroupIds } from "../../../store/defaultData/baseGroups";
import Stack from "@mui/material/Stack";

import styles from "../../content/styles/ContentTopPanel.module.scss";
import {setTaskFilter} from "../../../store/reducers/FilterSlice";

const TaskGroupMenuContainer = () => {
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const dispatch = useDispatch();
    const taskFilter = useSelector(
        state => state.filterStates.taskFilter
    );

    useEffect(() => {
        console.log(taskFilter)
    }, [taskFilter])

    const onFilterChange = event => {
        dispatch(setTaskFilter({
            type: event.target.value,
            desc: true
        }));
    }

    return (
        <Stack spacing={1}>
            <div className={styles.menu__item}>
                <img src={filterIcon} alt="Сортировка задач"/>

                <span onClick={() => dispatch(setTaskFilter({...taskFilter, desc: !taskFilter.desc}))}>
                    {taskFilter.desc ? 1 : 0}
                </span>

                <span>
                    <CustomSelect
                        value={taskFilter.type}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: 'var(--bgColorFirst)',
                                    color: 'var(--fontColor)'
                                }
                            }
                        }}
                        onChange={e => onFilterChange(e)}
                    >
                        <MenuItem value="alphabet"
                            // onClick={e => onAlphabetFilterClick(e)}
                        >
                            По алфавиту
                        </MenuItem>

                        <MenuItem value="created_at">
                            По дате добавления
                        </MenuItem>

                        <MenuItem value="favorite">
                            По важности
                        </MenuItem>
                    </CustomSelect>
                </span>
            </div>

            {
            !baseGroupIds[selectedGroup.id] &&
            <div className={styles.menu__item}>
                <img src={deleteGroupIcon} alt="Удалить группу задач"/>
                <span style={{color: '#ff634c'}}>Удалить список</span>
            </div>
            }
        </Stack>
    );
};

export default TaskGroupMenuContainer;