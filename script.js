let newTask = document.querySelector('#add-new-task');
let form = document.querySelector('form');
let incompleteList = document.querySelector('#items');
let completeList = document.querySelector('.complete-list ul');


//Create a New Task
let createTask = function (task) {
    let listItem = document.createElement('li');
    listItem.className = 'item';
    let checkBox = document.createElement('input');
    let taskLabel = document.createElement('label');

    checkBox.type = 'checkbox';
    taskLabel.innerText = task;

    listItem.appendChild(checkBox);
    listItem.appendChild(taskLabel);

    return listItem;
}

let addNewTask = function (event) {
    event.preventDefault();
    let listItem = createTask(newTask.value);
    incompleteList.appendChild(listItem);
    newTask.value = "";

    //bind the new items to the incomplete task
    bindIncompleteItems(listItem, completeTask);
}

let bindIncompleteItems = function (taskItem, checkboxClick) {
    let checkBox = taskItem.querySelector('input[type = "checkbox"]');
    checkBox.onchange = checkboxClick;
}


//Completed Task
let completeTask = function () {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete-btn';
    listItem.appendChild(deleteBtn);

    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove();
    completeList.appendChild(listItem);

    //bind the new items to the complete task
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let bindCompleteItems = function (taskItem, deleteBtnClick) {
    let deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.onclick = deleteBtnClick;
}

//Function Call
for (let i = 0; i < incompleteList.children.length; i++) {
    bindIncompleteItems(incompleteList.children[i], completeTask);
}

for (let i = 0; i < completeList.children.length; i++) {
    bindCompleteItems(completeList.children[i], deleteTask);
}

form.addEventListener('submit', addNewTask);