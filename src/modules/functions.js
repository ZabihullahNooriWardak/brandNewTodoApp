/* eslint-disable no-restricted-globals */
// add button function
let listTasks = [];
if (localStorage.getItem('listTasks') !== null) {
  listTasks = JSON.parse(localStorage.getItem('listTasks'));
}
// DOM manipulation
const addbtn = document.querySelector('.add');
const msg = document.querySelector('.msg');
const txtField = document.getElementById('taskTextField');
const taskContainerFromhtml = document.querySelector('.tasks');
let removeButton = [];

function add(arr) {
  if (localStorage.getItem('listTasks') !== null) {
    arr = JSON.parse(localStorage.getItem('listTasks'));
  }
  arr.push(txtField.value);
  localStorage.setItem('listTasks', JSON.stringify(arr));
}

// displaying task function
function display(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('dynamicElement');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('chkBox');
    const task = document.createElement('p');
    task.classList.add('tsk');
    task.innerText = arr[i];
    const trashicon = document.createElement('span');
    trashicon.classList.add('trashSpan');
    trashicon.textContent = '🗑️';
    taskContainerFromhtml.appendChild(taskContainer);
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(task);
    taskContainer.appendChild(trashicon);
    removeButton = document.querySelectorAll('.trashSpan');
  }
}

// Remove Button function
function remove() {
  for (let i = 0; i < removeButton.length; i += 1) {
    removeButton[i].addEventListener('click', () => {
      listTasks.splice(i, 1);
      localStorage.setItem('listTasks', JSON.stringify(listTasks));
      location.reload();
    });
  }
}

window.onload = () => {
  if (localStorage.getItem('listTasks') !== null) {
    const arr = JSON.parse(localStorage.getItem('listTasks'));
    display(arr);
    remove();
  }
};

addbtn.addEventListener('click', () => {
  if (txtField.value === '') {
    msg.style.display = 'block';
  } else {
    add(listTasks);

    location.reload();
  }
});
