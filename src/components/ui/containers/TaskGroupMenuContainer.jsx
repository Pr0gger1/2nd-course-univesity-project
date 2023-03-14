import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggleIconTheme from '../../../hooks/useToggleIconTheme';

import filterIcon from '../../../assets/img/icons/filter_icon.svg';
import deleteGroupIcon from '../../../assets/img/icons/delete_icon.svg';

import { CustomSelect } from '../customComponents/CustomSelect';
import { CustomTextField } from "../customComponents/CustomInputs";

import { MenuItem, Tooltip } from '@mui/material';
import { baseGroupIds } from '../../../store/defaultData/baseGroups';
import Stack from '@mui/material/Stack';

import { setTaskFilter } from '../../../store/reducers/FilterSlice';
import {deleteCustomTaskGroup, renameCustomTaskGroup} from '../../../store/reducers/TaskGroupSlice';

import upArrowFilterDark from '../../../assets/img/icons/filter/up_arrow_dark.svg';
import downArrowFilterDark from '../../../assets/img/icons/filter/down_arrow_dark.svg';
import upArrowFilterLight from '../../../assets/img/icons/filter/up_arrow_light.svg';
import downArrowFilterLight from '../../../assets/img/icons/filter/down_arrow_light.svg';
import editIcon from '../../../assets/img/icons/edit_icon.svg';

import styles from "../../content/styles/ContentTopPanel.module.scss";

const TaskGroupMenuContainer = () => {
    const dispatch = useDispatch();

    const [showEditInput, setShowEditInput] = useState(false);
    const [editInputText, setEditInputText] = useState('');

    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
    const taskFilter = useSelector(
        state => state.filterStates.taskFilter
    );
    const currentTheme = useSelector(
        state => state.themeState.theme
    );

    const filterModeIconUp = useToggleIconTheme(
        upArrowFilterLight, upArrowFilterDark,
        currentTheme
    );
    const filterModeIconDown = useToggleIconTheme(
        downArrowFilterLight, downArrowFilterDark,
        currentTheme
    );

    const onFilterChange = event => {
        dispatch(setTaskFilter({
            type: event.target.value,
            desc: true
        }));
    }

    const onEditGroupTitleClick = () => {
        if (showEditInput) {
            dispatch(renameCustomTaskGroup({
                groupId: selectedGroup.id,
                newName: editInputText
            }));
            setShowEditInput(false);
        }
    }
    const onEnterPressed = event => {
        if (event.key === 'Enter')
            onEditGroupTitleClick();
    }

    const deleteCustomTaskGroupHandler = () => {
        dispatch(deleteCustomTaskGroup({
            groupId: selectedGroup.id
        }));
    }

    const toggleFilterMode = () => {
        dispatch(setTaskFilter({
            ...taskFilter, desc: !taskFilter.desc
        }));
    }

    return (
        <Stack spacing={1}>
            <div className={styles.menu__item}>
                <img src={filterIcon} alt="Сортировка задач"/>
                <div className={styles.select__container}>
                    <Tooltip
                        title={taskFilter.desc ? 'По возрастанию' : 'По убыванию'}
                    >
                        <span onClick={toggleFilterMode}>
                            {
                                taskFilter.desc ?
                            <img src={filterModeIconUp} alt="сортировка"/>
                            :
                            <img src={filterModeIconDown} alt="сортировка"/>
                            }
                        </span>
                    </Tooltip>

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
                            <MenuItem value="alphabet">
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
            </div>

            {
            !baseGroupIds[selectedGroup.id] &&
            <>
                <div className={styles.menu__item}
                    onClick={() => setShowEditInput(true)}
                >
                    <img
                        src={editIcon}
                        alt="Переименовать список"
                        onClick={onEditGroupTitleClick}
                    />
                    {
                    showEditInput ?
                        <CustomTextField
                            variant='standard'
                            value={editInputText}
                            onChange={e => setEditInputText(e.target.value)}
                            onKeyDown={onEnterPressed}
                        />
                        :
                        <span>
                            Переименование списка
                        </span>

                    }
                </div>

                <div className={styles.menu__item}
                    onClick={deleteCustomTaskGroupHandler}
                >
                    <img src={deleteGroupIcon} alt="Удалить группу задач"/>
                    <span style={{color: '#ff634c'}}>
                        Удалить список
                    </span>
                </div>
            </>
            }
        </Stack>
    );
};

export default TaskGroupMenuContainer;