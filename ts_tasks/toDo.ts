const taskInput = document.getElementById('newTask') as HTMLInputElement;
const addButton = document.querySelector('button')!;
const taskList = document.querySelector('ul')!;
const warn = document.querySelector('p')!;

document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as { text: string, done: boolean }[];
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.done);
    });
});


function saveTasks():void {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => {
        return {
            text: (li.querySelector('span') as HTMLSpanElement).textContent || '',
            done: (li.querySelector('input[type="checkbox"]') as HTMLInputElement).checked
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(text: string, done = false):void {
    const taskItem = document.createElement('li');

    const taskContent = document.createElement('div'); 
    taskContent.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;

    const taskText = document.createElement('span');
    taskText.textContent = text;
    if (done) {
        taskText.classList.add('done');
    }

    const editItem = document.createElement('button') // buton to edit the specific task
    editItem.textContent = 'edit';

    const delItem = document.createElement('button')// button to delete the task
    delItem.textContent = 'X';

    // checkbox toggle
    checkbox.addEventListener('change', () => {
        taskText.classList.toggle('done');
        saveTasks();
    });

    // delete
    delItem.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    // edit
    editItem.addEventListener('click', () => {
        const newText = prompt('edit the task', taskText.textContent || '');
        if (newText) {
            taskText.textContent = newText;
            saveTasks();
        }
    });

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(editItem);
    taskItem.appendChild(delItem);
    taskList.appendChild(taskItem);
}


addButton.addEventListener('click', () => {
    if (!taskInput.value) {
        warn.textContent = "please add a task first";
        return;
    } else {
        warn.textContent = "";
    }

    createTaskElement(taskInput.value);
    taskInput.value = '';
    saveTasks();
});
