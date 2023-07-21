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

  arr.push({
    isCompleted: false,
    index: arr.length,
    description: txtField.value,
  });
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
    task.innerText = arr[i].description;
    const trashicon = document.createElement('span');
    trashicon.classList.add('trashSpan');
    trashicon.textContent = '🗑️';
    const editIcon = document.createElement('span');
    editIcon.classList.add('edit');
    editIcon.textContent = '✏️';
    const containerIcons = document.createElement('div');
    containerIcons.appendChild(editIcon);
    containerIcons.appendChild(trashicon);
    taskContainerFromhtml.appendChild(taskContainer);
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(task);
    taskContainer.appendChild(containerIcons);
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
/* Edit button Function */

function edit(arr) {
  const editButtons = document.querySelectorAll('.edit');
  for (let i = 0; i < editButtons.length; i += 1) {
    editButtons[i].addEventListener('click', () => {
      const containerEdit = document.createElement('div');
      containerEdit.classList.add('editContainer');
      const inputForEdit = document.createElement('input');
      inputForEdit.value = arr[i].description;
      inputForEdit.classList.add('txtEdit');
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'cancel';
      cancelButton.classList.add('cancel');
      const saveButton = document.createElement('button');
      saveButton.classList.add('save');
      saveButton.textContent = 'save';
      containerEdit.appendChild(inputForEdit);
      containerEdit.appendChild(cancelButton);
      containerEdit.appendChild(saveButton);
      const containerAllFromHtml = document.querySelector('.container');
      if(!(document.querySelector('.editContainer'))){
        containerAllFromHtml.appendChild(containerEdit);
      }
    });
  }
}

window.onload = () => {
  if (localStorage.getItem('listTasks') !== null) {
    const arr = JSON.parse(localStorage.getItem('listTasks'));
    display(arr);
    remove();
    edit(listTasks);
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
