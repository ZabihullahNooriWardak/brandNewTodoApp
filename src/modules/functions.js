/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
let listTasks = [];
// for taking the value from local storage storing in above array
if (localStorage.getItem('listTasks') !== null) {
  listTasks = JSON.parse(localStorage.getItem('listTasks'));
}
// DOM manipulation
const addbtn = document.querySelector('.add');
const msg = document.querySelector('.msg');
const txtField = document.getElementById('taskTextField');
const taskContainerFromhtml = document.querySelector('.tasks');
const containerAllFromHtml = document.querySelector('.container');
const removeAllBtn = document.querySelector('.clear');
let containerEdit;
let cancelButton;
let saveButton;
let inputForEdit;
let task;
let removeButton = [];
// for adding new task to array and localStorageArray
 function add(arr) {
  // if (localStorage.getItem('listTasks') !== null) {
  //   arr = JSON.parse(localStorage.getItem('listTasks'));
  // }
  arr.push({
    isCompleted: false,
    index: arr.length + 1,
    description: txtField.value,
  });
  localStorage.setItem('listTasks', JSON.stringify(arr));
}

// For displaying all the Task in the Screen.
function display(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('dynamicElement');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('chkBox');
    task = document.createElement('p');
    task.classList.add('tsk');
    const chkAndPcontainer = document.createElement('div');
    chkAndPcontainer.classList.add('chkp');
    chkAndPcontainer.appendChild(checkbox);
    chkAndPcontainer.appendChild(task);
    task.innerText = arr[i].description;
    const trashicon = document.createElement('span');
    trashicon.classList.add('trashSpan');
    trashicon.innerHTML = "<i class='bx bxs-trash-alt'></i>";
    const editIcon = document.createElement('span');
    editIcon.classList.add('edit');
    editIcon.innerHTML = "<i class='bx bxs-edit-alt'></i>";
    const containerIcons = document.createElement('div');
    containerIcons.classList.add('containerIcons');
    containerIcons.appendChild(editIcon);
    containerIcons.appendChild(trashicon);
    taskContainerFromhtml.appendChild(taskContainer);
    taskContainer.appendChild(chkAndPcontainer);
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
/* Cancel button Function */
function cancelButtonMethod() {
  cancelButton.addEventListener('click', () => {
    containerAllFromHtml.removeChild(containerEdit);
  });
}
// save Button function
function SaveButtonMethod(index) {
  saveButton.addEventListener('click', () => {
    listTasks[index].description = inputForEdit.value;
    localStorage.setItem('listTasks', JSON.stringify(listTasks));
    location.reload();
  });
}

// Edit button function
function edit(arr) {
  const editButtons = document.querySelectorAll('.edit');
  for (let i = 0; i < editButtons.length; i += 1) {
    editButtons[i].addEventListener('click', () => {
      containerEdit = document.createElement('div');
      containerEdit.classList.add('editContainer');
      inputForEdit = document.createElement('input');
      inputForEdit.value = arr[i].description;
      inputForEdit.classList.add('txtEdit');
      cancelButton = document.createElement('button');
      cancelButton.textContent = 'cancel';
      cancelButton.classList.add('cancel');
      saveButton = document.createElement('button');
      saveButton.classList.add('save');
      saveButton.textContent = 'save';
      containerEdit.appendChild(inputForEdit);
      containerEdit.appendChild(cancelButton);
      containerEdit.appendChild(saveButton);
      if (!document.querySelector('.editContainer')) {
        containerAllFromHtml.appendChild(containerEdit);
        cancelButtonMethod();
        SaveButtonMethod(i);
      }
    });
  }
}

//  function for clear all button
function removeAll() {
  const chkBoxes = document.querySelectorAll('.chkBox');
  const newArray = [];
  if (chkBoxes.length !== 0) {
    for (let i = 0; i < chkBoxes.length; i += 1) {
      if (!chkBoxes[i].checked) {
        newArray.push(i);
      }
    }
    const newArrayForStoringLocalStorage = [];
    for (let j = 0; j < listTasks.length; j += 1) {
      for (let k = 0; k < newArray.length; k += 1) {
        if (listTasks.indexOf(listTasks[j]) === newArray[k]) {
          newArrayForStoringLocalStorage.push(listTasks[j]);
        }
      }
    }
    localStorage.setItem(
      'listTasks',
      JSON.stringify(newArrayForStoringLocalStorage),
    );
  }
  location.reload();
}
removeAllBtn.addEventListener('click', removeAll);

window.onload = () => {
  if (localStorage.getItem('listTasks') !== null) {
    const arr = JSON.parse(localStorage.getItem('listTasks'));
    display(arr);
    remove();
    edit(listTasks);
  }
};

// add button Event listener
addbtn.addEventListener('click', () => {
  if (txtField.value === '') {
    msg.style.display = 'block';
  } else {
    add(listTasks);
    location.reload();
    
  }
});
