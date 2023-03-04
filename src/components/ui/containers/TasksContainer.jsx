import React from 'react';
import CreateTaskButton from '../button/CreateTaskButton';
import styles from './styles/TasksContainer.module.css';
import Task from '../cards/Task';

const TasksContainer = () => {

    const tasks = [
        { 
            id: 1,
            taskName: 'Task 1',
            completed: false,
            category: 'Group 1', 
            subTasks: [],
            notes: '',
            deadline: null,
            repeat: null,
            reminder: null,
            favorite: true
        },
        { 
            id: 2,
            taskName: 'Task 2',
            completed: false,
            category: 'Group 1', 
            subTasks: [],
            notes: '',
            deadline: null,
            repeat: null,
            reminder: null,
            favorite: false
        },
        { 
            id: 3, 
            taskName: 'Task 3',
            completed: true,
            category: 'Group 1', 
            subTasks: [],
            notes: '',
            deadline: null,
            repeat: null,
            reminder: null ,
            favorite: false
        }
    ];

    return (
        <div className={styles.tasks__container}>
            <CreateTaskButton/>
            {
                tasks.map((task) => 
                    <Task
                        key={task.id}
                        taskData={task}
                    />
                )
            }
        </div>
    );
};

export default TasksContainer;