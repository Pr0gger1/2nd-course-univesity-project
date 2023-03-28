import { db } from '../firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { generateUniqueId } from '../utils/generateUniqueId';

export class TaskService {
    static async updateUserTasks(tasks, userId) {
        await setDoc(doc(db, 'tasks', userId), {
            taskData: tasks
        });
    }

    static addTask(tasks, taskData) {
        const newTask = {...taskData}
        newTask.id = generateUniqueId('task', 12, true);

        let newTasks = [...tasks];
        newTasks.push(newTask);
        
        return newTasks;
    }

    static deleteTask(tasks, taskId) {
        if (tasks.length)
            return {tasks: tasks.filter(task => task.id !== taskId)};
    }

    static deleteSubTask(tasks, taskId, subTaskId) {
        let newTasks = [...tasks];
        const taskIndex = newTasks.findIndex(
            task => task.id === taskId
        );

        const filteredTasks = newTasks[taskIndex].subTasks.filter(
            task => task.id !== subTaskId
        );

        newTasks[taskIndex] = {
            ...newTasks[taskIndex],
            subTasks: filteredTasks
        };

        return {tasks: newTasks, selectedTask: newTasks[taskIndex]};
    }

    static updateTask(tasks, taskData) {
        let newTasks = [...tasks];

        const taskIndex = newTasks.findIndex(
            task => task.id === taskData.id
        );

        if (taskIndex !== -1) {
            newTasks[taskIndex] = taskData;

            return {
                tasks: newTasks, selectedTask: taskData
            };
        }
    }

    static updateSubTask(tasks, taskId, subTaskId, subTaskData) {
        let newTasks = [...tasks];

        let parentTaskIndex = newTasks
            .findIndex(task => task.id === taskId);

        let subTaskIndex = newTasks[parentTaskIndex].subTasks
            .findIndex(subTask => subTask.id === subTaskId);

        newTasks[parentTaskIndex].subTasks[subTaskIndex] = subTaskData;

        return {
            tasks: newTasks, selectedTask: newTasks[parentTaskIndex].subTasks[subTaskIndex]
        };
    }

    static async getUserTasks(userId) {
        try {
            const taskDoc = doc(db, "tasks", userId);
            const docSnap = await getDoc(taskDoc);

            if (docSnap.exists()) {
                return docSnap.data();
            }
            else return [];
        }
        catch (error) {

        }
    }
}