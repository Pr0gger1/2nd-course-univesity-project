import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { TaskService } from '../../services/task.service';

export const addTaskAsync = createAsyncThunk(
    'task/add',
    async (taskData, { getState }) => {
        try {
            const tasks = getState().taskStates.tasks;
            const userId = getState().authStates.userData.uid;

            const newTasks = TaskService.addTask(tasks, taskData);

            await TaskService.updateUserTasks(newTasks, userId);
            return newTasks;
        }
        catch (error) {
            throw error;
        }
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'task/delete',
    async (taskId, { getState }) => {
        const tasks = getState().taskStates.tasks;
        const userId = getState().authStates.userData.uid
        
        const newTasks = TaskService.deleteTask(tasks, taskId);
        await TaskService.updateUserTasks(newTasks.tasks, userId);

        return newTasks;
    }
)

export const deleteSubTaskAsync = createAsyncThunk(
    'subtask/delete',
    async (taskId, subTaskId, { getState }) => {
        const tasks = getState().taskStates.tasks;
        const userId = getState().authStates.userData.uid;
        
        const newTasks = TaskService.deleteSubTask(tasks, taskId, subTaskId);
        await TaskService.updateUserTasks(newTasks.tasks, userId);

        return newTasks;
    }
)

export const updateTaskAsync = createAsyncThunk(
    'task/update',
    async (taskData, { getState }) => {
        const tasks = getState().taskStates.tasks;
        const userId = getState().authStates.userData.uid;
        
        const newTasks = TaskService.updateTask(tasks, taskData);
        await TaskService.updateUserTasks(newTasks.tasks, userId);

        return newTasks;
    }
)

export const updateSubTaskAsync = createAsyncThunk(
    'subtask/update',
    async (taskId, subTaskId, subTaskData, { getState }) => {
        const tasks = getState().taskStates.tasks;
        
        const newTasks = TaskService.updateSubTask(tasks, taskId, subTaskId, subTaskData)
        await TaskService.updateUserTasks(newTasks)
        return newTasks;
    }
);

export const getUserTasks = createAsyncThunk(
    'task/get',
    async userId => {
        try {
            return await TaskService.getUserTasks(userId);
        }
        catch (error) {
            throw error;
        }
    }
)

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        // массив всех задач
        tasks: [],

        // информация о выбранной задаче в контенте
        selectedTask: {},

        // массив задач активной группы
        currentGroupTasks: [],
        status: ''
    },
    reducers: {
        setCurrentGroupTasks(state, action) {
            state.currentGroupTasks = action.payload.tasks;
        },

        setSelectedTask(state, action) {
            state.selectedTask = action.payload.taskData;
        },

        addTask(state, action) {
            const newTask = {...action.payload.taskData}
            newTask.taskId = generateUniqueId('task', 12, true);
            state.tasks.push(newTask);
        },

        deleteTask(state, action) {
            const taskId = action.payload.taskId;
            if (state.tasks.length) {
                state.tasks = state.tasks.filter(task => task.id !== taskId);
                state.selectedTask = {};
            }
        },

        deleteSubTask(state, action) {
            const taskId = action.payload.taskId;
            const subTaskId = action.payload.subTaskId;

            const taskIndex = state.tasks.findIndex(
                task => task.id === taskId
            );

            const filteredTasks = state.tasks[taskIndex].subTasks.filter(
                    task => task.id !== subTaskId
            );

            state.tasks[taskIndex] = {
                ...state.tasks[taskIndex],
                subTasks: filteredTasks
            };

            state.selectedTask = state.tasks[taskIndex];
        },

        updateTaskData(state, action) {
            const taskData = action.payload.taskData;
            const taskIndex = state.tasks.findIndex(
                task => task.id === taskData.id
            );

            if (taskIndex !== -1) {
                state.tasks[taskIndex] = taskData;
                state.selectedTask = taskData;
            }

        },

        updateSubTaskData(state, action) {
            const parentTaskId = action.payload.parentTaskId;
            const subTaskId = action.payload.subTaskId;
            const subTaskData = action.payload.subTaskData;

            const parentTaskIndex = state.tasks
                .findIndex(task => task.id === parentTaskId);

            const subTaskIndex = state.tasks[parentTaskIndex].subTasks
                .findIndex(subTask => subTask.id === subTaskId);

            state.tasks[parentTaskIndex].subTasks[subTaskIndex] = subTaskData;
            state.selectedTask.subTasks[subTaskIndex] = subTaskData;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                console.log(action);
                state.tasks = action.payload;
            })

            .addCase(addTaskAsync.rejected, (state, action) => {
                console.log(action);
            })

            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = {};
            })

            .addCase(deleteTaskAsync.rejected, (state, action) => {
                console.log(action);
            })

            .addCase(deleteSubTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(deleteSubTaskAsync.rejected, (state, action) => {
            })

            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.selectedTask = action.payload.selectedTask;
            })

            .addCase(updateTaskAsync.rejected, (state, action) => {
                console.log(action);
                throw action.error;
            })

            .addCase(updateSubTaskAsync.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })

            .addCase(updateSubTaskAsync.rejected, (state, action) => {
                console.log(action);
            })

            .addCase(getUserTasks.pending, (state, action) => {
                state.status = 'loading';

            })

            .addCase(getUserTasks.fulfilled, (state, action) => {
                try {
                    if (action.payload && action.payload.taskData) {
                        state.tasks = action.payload.taskData;
                        state.status = 'success';
                    }
                }
                catch (e) {console.log(e);}

            })
            .addCase(getUserTasks.rejected, (state, action) => {
                console.log(action)
                state.status = 'failed';
            })
    }
});

export const {
    setCurrentGroupTasks, setSelectedTask,
    addTask, updateTaskData, updateSubTaskData,
    deleteTask, deleteSubTask
} = taskSlice.actions;

export default taskSlice.reducer;