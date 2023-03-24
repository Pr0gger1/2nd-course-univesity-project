import {db} from '../firebase.config';

import {doc, getDoc, setDoc} from 'firebase/firestore'
import {generateUniqueId} from '../utils/generateUniqueId';

export class TaskService {
    static async updateUserTasks(taskData, userId) {
        console.log(taskData);
        await setDoc(doc(db, 'tasks', userId), {
            taskData
        });
    }

    static addTask(tasks, taskData) {
        const newTask = {...taskData}
        newTask.id = generateUniqueId('task', 12, true);

        const newTasks = [...tasks];
        newTasks.push(newTask);
        
        return newTasks;
    }

    static deleteTask(tasks, taskId) {
        if (tasks.length)
            return {tasks: tasks.filter(task => task.id !== taskId)};
    }

    static deleteSubTask(tasks, taskId, subTaskId) {
        const newTasks = [...tasks];
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
        const newTasks = [...tasks];
        console.log(tasks)
        // console.log(newTasks)
        console.log(taskData)
        const taskIndex = newTasks.findIndex(
            task => task.id === taskData.id
        );
        console.log(taskIndex)

        if (taskIndex !== -1) {
            newTasks[taskIndex] = taskData;

            return {
                tasks: newTasks, selectedTask: taskData
            };
        }
    }

    static updateSubTask(tasks, taskId, subTaskId, subTaskData) {
        const parentTaskIndex = tasks
            .findIndex(task => task.id === taskId);

        const subTaskIndex = tasks[parentTaskIndex].subTasks
            .findIndex(subTask => subTask.id === subTaskId);

        tasks[parentTaskIndex].subTasks[subTaskIndex] = subTaskData;

        return {
            tasks, selectedTask: tasks[parentTaskIndex].subTasks[subTaskIndex]
        };
    }

    static async getUserTasks(userId) {
        const taskDoc = doc(db, "tasks", userId);
        const docSnap = await getDoc(taskDoc);

        // console.log(docSnap.data())
        if (docSnap.exists()) {
            return docSnap.data();
        }
    }
}