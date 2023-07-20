import './style.css';

const tasks = [
  { description: 'going to school', completed: 'false', index: 0 },
  { description: 'going to Gym', completed: 'true', index: 1 },
  { description: 'Sport', completed: 'false', index: 2 },
  { description: 'Reading', completed: 'true', index: 3 },
];
const taskContainerFromhtml = document.querySelector('.tasks');
function iterating(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('dynamicElement');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('chkBox');
    const task = document.createElement('p');
    task.classList.add('tsk');
    task.innerText = tasks[i].description;
    const trashicon = document.createElement('span');
    trashicon.classList.add('trashSpan');
    trashicon.textContent = '🗑️';
    taskContainerFromhtml.appendChild(taskContainer);
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(task);
    taskContainer.appendChild(trashicon);
  }
}
iterating(tasks);