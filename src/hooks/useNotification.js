import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../store/reducers/TaskSlice";
import { useEffect } from "react";
import { updateNotifications } from "../store/reducers/NotificationSlice";
import { generateUniqueId } from "../utils/generateUniqueId";

const reminderObserver = (tasks, dispatch) => {

    console.log('call function')

    tasks.forEach((task) => {
        if (task.isRemindNotified !== undefined) {
            if (task.reminder && new Date(task.reminder) < new Date() && !task.isRemindNotified) {
                const notification = new Notification('Напоминание', {
                    body: `${task.taskName}`,
                    }
                );

                setTimeout(notification.close.bind(notification), 4000);

                let taskData = {...task}
                taskData.isRemindNotified = true;
                taskData.reminder = null;
                dispatch(updateTaskAsync(taskData));

                dispatch(updateNotifications({
                    notification: {
                        taskName: taskData.taskName,
                        type: 'reminder',
                        message: 'Напоминание',
                        id: generateUniqueId('notify', 4, true)
                    }
                }));
            }
        }
    });
}

const deadlineObserver = (tasks, dispatch) => {
    tasks.forEach((task) => {
        if (task.isDeadlineNotified !== undefined) {
            if (task.reminder && (new Date(task.reminder) - new Date() < 2) && !task.isDeadlineNotified) {
                const notification = new Notification('Напоминание', {
                    body: `${task.taskName}`,
                    }
                );

                setTimeout(notification.close.bind(notification), 4000);

                let taskData = {...task}
                taskData.isDeadlineNotified = true;

                if (taskData.repeat) {
                    switch (taskData.repeat) {

                    }
                }
                // taskData.deadline = null;
                // setTimeout(() => {
                // }, 4000);
                dispatch(updateTaskAsync(taskData));
            }
        }
    });
}

export const useNotification = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(
        state => state.taskStates.tasks
    );

    useEffect(() => {
        const observeTasks = setInterval( () => {
            if ('Notification' in window && Notification.permission === 'granted') {
                reminderObserver(tasks, dispatch)
            }
            console.log('observing notification')
        }, 10000);

        return () => clearInterval(observeTasks)
    }, [dispatch, tasks])
}