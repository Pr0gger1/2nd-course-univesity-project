import { createSlice } from '@reduxjs/toolkit';

export const baseGroupNames = {
    today: 'task_today',
    plan: 'task_plan',
    favorite: 'task_favorite',
    completed: 'task_completed',
    all: 'task_all'
}

const taskGroupSlice = createSlice({
    name: 'taskGroup',
    initialState: {
        selectedTaskGroup: localStorage.getItem('selectedTaskGroup') || baseGroupNames.today
    },
    reducers: {
        setSelectedGroup(state, action) {
            state.selectedTaskGroup = action.payload.groupId;
            localStorage.setItem('selectedTaskGroup', action.payload.groupId);
        }
    }
})
export const { setSelectedGroup } = taskGroupSlice.actions;
export default taskGroupSlice.reducer;