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

const main = (action: 'add' | 'update' | 'delete', description: string) => {
    if (action === 'add') {
        addTask(description);
    } else {
        console.log(`Action ${action} is not implemented yet.`);
    }
}

main(argv[2], argv[3]);