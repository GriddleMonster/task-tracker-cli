console.log('hello world');
const { argv } = require('node:process');
const fs = require('fs');

interface Task {
    id: number;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    createdAt: Date;
    updatedAt: Date;    
}

const addTask = (description: string) => {
    console.log('adding task: ', description);
    const tasks: Task[] = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const newTask: Task = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    tasks.push(newTask);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}

const updateTask = (taskID: number, newDescription: string) => {
    console.log('updating task with ID: ', taskID);
    console.log('new description: ', newDescription);
    const tasks: Task[] = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex((task) => task.id === taskID);
    tasks[taskIndex].description = newDescription;
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}

const deleteTask = (taskID: number) => {
    console.log('deleting task with ID: ', taskID);
    const tasks: Task[] = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex((task) => task.id === taskID);
    tasks.splice(taskIndex, 1);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}

const main = (action: 'add' | 'update' | 'delete', taskID: number, description: string) => {
    if (action === 'add') {
        addTask(description);
    }
    if (action === 'update') {
        updateTask(Number(taskID), description)
    } 
    if (action === 'delete') {
        deleteTask(Number(taskID));
    } else {
        console.log(`Action ${action} is not implemented yet.`);
    }
}

main(argv[2], argv[3], argv[4]);