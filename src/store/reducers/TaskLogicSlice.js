// import { createSlice } from '@reduxjs/toolkit';
//
// const taskLogicSlice = createSlice({
//     name: 'taskLogic',
//     initialState: {
//
//     },
//     reducers: {
//         addTask(state, action) {
//             // const taskState = taskGroupSlice.se
//             // const taskState = store.taskGroupStates.tasks;
//
//             const groupId = action.payload.taskData.groupId;
//             const taskName = action.payload.taskData.taskName;
//             const completed = action.payload.taskData.completed;
//             const subTasks = action.payload.taskData.subTasks;
//             const notes = action.payload.taskData.notes;
//             const category = action.payload.taskData.category;
//             const deadline = action.payload.taskData.deadline;
//             const repeat = action.payload.taskData.repeat;
//             const reminder = action.payload.taskData.reminder;
//
//             // taskState.tasks.push({
//             //         taskName, completed,
//             //         subTasks, notes,
//             //         category, groupId,
//             //         deadline, repeat,
//             //         reminder
//             // });
//         }
//     }
// });
//
// export const { addTask } = taskLogicSlice.actions;
// export default taskLogicSlice.reducer;