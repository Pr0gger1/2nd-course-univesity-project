import {useDispatch, useSelector} from "react-redux";
import {updateTaskAsync} from "../store/reducers/TaskSlice";
import {useEffect} from "react";

const observeReminder = tasks => {

}

const observeDeadline = tasks => {

}

export const useNotification = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(
        state => state.taskStates.tasks
    );

    useEffect(() => {
        function checkDeadlines() {
            console.log('call function')

            tasks.forEach((task) => {
                if (task.isRemindNotified !== undefined) {
                    if (task.reminder && new Date(task.reminder) < new Date() && !task.isRemindNotified) {
                        const notification = new Notification('Напоминание', {
                            body: `${task.taskName}`,
                            }
                        );
                        setTimeout(notification.close.bind(notification), 5000);

                        let taskData = {...task}

                        taskData.isRemindNotified = true;
                        taskData.reminder = null;

                        dispatch(updateTaskAsync(taskData));
                    }
                }
            });
        }

        const observeTasks = setInterval( () => {
            if ('Notification' in window && Notification.permission === 'granted') {
                checkDeadlines();
            }
            console.log('observing notification')
        }, 5000);

        return () => clearInterval(observeTasks)
    }, [dispatch, tasks])
}