import { createSlice } from '@reduxjs/toolkit';
import {generateUniqueId} from "../../utils/generateUniqueId";

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        // массив всех задач
        tasks: [],

        // информация о выбранной задаче в контенте
        selectedTask: {},

        // массив задач активной группы
        currentGroupTasks: [],
    },
    reducers: {
        setCurrentGroupTasks(state, action) {
            state.currentGroupTasks = action.payload.tasks;
        },

        setSelectedTask(state, action) {
            state.selectedTask = action.payload.taskData;
        },

        addTask(state, action) {
            const groupId = action.payload.taskData.groupId;

            const taskId = generateUniqueId('task', 12, true);
            const favorite = action.payload.taskData.favorite;
            const taskName = action.payload.taskData.taskName;
            const completed = action.payload.taskData.completed;
            const subTasks = action.payload.taskData.subTasks;
            const notes = action.payload.taskData.notes;
            const category = action.payload.taskData.category;
            const deadline = action.payload.taskData.deadline;
            const repeat = action.payload.taskData.repeat;
            const reminder = action.payload.taskData.reminder;

            state.tasks.push({
                    taskName, completed,
                    favorite,
                    subTasks, notes,
                    category, groupId,
                    deadline, repeat,
                    reminder, taskId
            });

        },

        updateTaskData(state, action) {
            const taskIndex = state.tasks.findIndex(task => task.taskId === action.payload.taskData.taskId);

            if (taskIndex !== -1)
                state.tasks[taskIndex] = action.payload.taskData;
        }
    }
});

export const {
    setCurrentGroupTasks, setSelectedTask,
    addTask, updateTaskData
} = taskSlice.actions;
export default taskSlice.reducer;