let currentDraggedElement;
let alreadyEmpty = true;
let filteredTasks = [];


/**
 * init board function gets the global init function from script.js, checks if user is logged in
 * gets the tasks from current user, init the rendering of the tasks
 */
async function initBoard() {
    await init();
    setNavLinkActive();
    checkUserIsLoggedIn();
    getTasksOfCurrentUser();
    handleFilterTasks();
    imgheader();
}


/**
 * get the tasks of the current user
 */
function getTasksOfCurrentUser() {
    currentUserTasks = currentUser.tasks;
    console.log(currentUserTasks);
}


/**
 * checks if search input is empty or not and filter the tasks, and calls the function to get the tasks by thier status
 */
function handleFilterTasks() {
    let search = document.getElementById('search_input').value;
    let searchTerm = search.toLowerCase();
    if (searchTerm.length == 0) {
        filteredTasks = currentUserTasks;
        filterTasksByStatus();
    } else {
        filteredTasks = currentUserTasks.filter(filteredTasks => {
            return filteredTasks.title.toLowerCase().includes(searchTerm) || filteredTasks.description.toLowerCase().includes(searchTerm);
        })
        filterTasksByStatus();
    }
}


/**
 * filter all Tasks by thier status and created new arrays for each status, calls reset board function and calls function to render the board
 */
function filterTasksByStatus() {
    let statusTodo = filteredTasks.filter(task => task.status == 'toDo');
    let statusInProgress = filteredTasks.filter(task => task.status == 'inProgress');
    let statusAwaitingFeedback = filteredTasks.filter(task => task.status == 'awaitingFeedback');
    let statusDone = filteredTasks.filter(task => task.status == 'done');
    resetBoard();
    renderBoard(statusTodo, statusInProgress, statusAwaitingFeedback, statusDone);
}


/**
 * reset the board and deletes all tasks from the html code
 */
function resetBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/**
 * renders all tasks by status
 * @param {string} toDo all tasks with status todo
 * @param {string} inProgress all tasks with status inProgress
 * @param {string} awaitingFeedback all tasks with status awaitingFeedback
 * @param {string} done all tasks with status done
 */
function renderBoard(toDo, inProgress, awaitingFeedback, done) {
    renderTasks(toDo);
    renderTasks(inProgress);
    renderTasks(awaitingFeedback);
    renderTasks(done);
    updateProgressBar();
}


/**
 * renders a single task    
 * @param {string} status of the single task
 */
function renderTasks(status) {
    for (let index = 0; index < status.length; index++) {
        const element = status[index];
        let taskStatus = element.status;
        document.getElementById(taskStatus).innerHTML += generateTodoHTML(element);
        renderContactInTask(element);
    }
}

function renderContactInTask(element) {
    for (let i = 0; i < element.user.length; i++) {
        let letter = element.user[i]['contactInitials'];
        let color = element.user[i]['concolor'];
        let id = element.id;
        document.getElementById(id).innerHTML += `<div style="background-color: ${color}" class="user">${letter}</div>`;
    }
}


/**
 * update the progressbar in all rendered tasks
 */
function updateProgressBar() {
    for (i = 0; i < filteredTasks.length; i++) {
        let taskStatus = filteredTasks[i].status;
        let taskId = filteredTasks[i].id;
        let fill = document.getElementById('fill' + taskId);
        let fillText = document.getElementById('fill-text' + taskId);
        if (taskStatus == 'toDo') {
            fill.style.width = "0";
            fillText.innerHTML = `0/3 Done`;
        }
        if (taskStatus == 'inProgress') {
            fill.style.width = "33%";
            fillText.innerHTML = `1/3 Done`;
        }
        if (taskStatus == 'awaitingFeedback') {
            fill.style.width = "66%";
            fillText.innerHTML = `2/3 Done`;
        }
        if (taskStatus == 'done') {
            fill.style.width = "100%";
            fillText.innerHTML = `3/3 Done`;
        }
    }
}


// Drag and Drop
// Defines the dragged task
function startDragging(id) {
    for (i = 0; i < currentUserTasks.length; i++) {
        let index = currentUserTasks[i]['id'];
        if (index == id) {
            currentDraggedElement = i;
            console.log(currentDraggedElement);
        }
    }

}


//Allows the task to be dropped
function allowDrop(ev) {
    ev.preventDefault();
}


// changes the status of the task according to the dropped area
async function moveTo(e, status) {
    currentUserTasks[currentDraggedElement]['status'] = status;
    e.target.classList.remove('drag-over');
    filterTasksByStatus();
    console.log(currentUserTasks);
    backend.setItem('users', JSON.stringify(users));
}


//Highlighting the Drag and Drop Area
function dragEnter(e) {
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}


/**
 * open the task details
 * @param {number} id is the uniqe id from the array entry of the task
 */
function showDetailWindow(id) {
    let detailContainer = document.getElementById('detail_container');
    let detailContent = document.getElementById('detail_content');
    for (let filteredTasksIndex = 0; filteredTasksIndex < filteredTasks.length; filteredTasksIndex++) {
        let currentTask = filteredTasks[filteredTasksIndex];
        if (currentTask.id == id) {
            detailContainer.classList.remove('d-none');
            detailContent.innerHTML = detailContentTemplate(currentTask);
            renderAssignedContactsDetails(currentTask);
            renderAssignedSubTasks(currentTask);
        }
    }
}


/**
 * renders the assigned contacts from the current task
 * @param {object} currentTask is the task to show the details from
 */
function renderAssignedContactsDetails(currentTask) {
    let detailAssignedContacts = document.getElementById('detail_assigned_contacts');
    for (let assignedContactsIndex = 0; assignedContactsIndex < currentTask.user.length; assignedContactsIndex++) {
        let letter = currentTask.user[assignedContactsIndex]['contactInitials'];
        let color = currentTask.user[assignedContactsIndex]['concolor'];
        detailAssignedContacts.innerHTML += `<div style="background-color: ${color}" class="user">${letter}</div>`;
    }
}

/**
 * renders the assigned subTasks from the current task
 * @param {object} currentTask is the task to show the details from
 */
function renderAssignedSubTasks(currentTask) {
    let detailAssignedSubTasks = document.getElementById('detail_subTasks');
    for (let assignedSubTaskIndex = 0; assignedSubTaskIndex < currentTask.subTask.length; assignedSubTaskIndex++) {
        let subTask = currentTask.subTask[assignedSubTaskIndex];
        detailAssignedSubTasks.innerHTML += `
            <div>
                <input id="subTask_${assignedSubTaskIndex}" onchange="setSubTaskDone(${assignedSubTaskIndex})" type="checkbox">    
                <span>${subTask.title}</span>
            </div>`;
    }
}


function setSubTaskDone(assignedSubTaskIndex) {
    let subTaskCheckbox = document.getElementById(`subTask_${assignedSubTaskIndex}`);
    if (subTaskCheckbox.checked) {
        console.log('ja');
        console.log(subTasks);
    }
}


// renders the mask for editing an existing task
function changeTask(id) {
    let detailContent = document.getElementById('detail_content');
    for (let filteredTasksIndex = 0; filteredTasksIndex < filteredTasks.length; filteredTasksIndex++) {
        const currentTask = filteredTasks[filteredTasksIndex];
        if (currentTask.id == id) {
            detailContent.innerHTML = changeTaskTemplate(currentTask);
            editShowSelectedPriority(currentTask);
            editShowSubTasks(currentTask);
        }
    }
}


function editShowSubTasks(currentTask) {
    let detailAssignedSubTasks = document.getElementById('edit_subTasks')
    for (let assignedSubTaskIndex = 0; assignedSubTaskIndex < currentTask.subTask.length; assignedSubTaskIndex++) {
        let subTask = currentTask.subTask[assignedSubTaskIndex];
        detailAssignedSubTasks.innerHTML += /*html*/`
        <div class="subtaskList" id="subtaskValue">  
          <input id="subTask_checkBox" value="${subTask}" class="subtaskCheckbox pointer" type="checkbox">
          <span>${subTask}</span>
        </div>
        `
    }
}

function deleteCheckedSubTask() {
    let subtaskCheckboxes = document.querySelectorAll("subTask_checkBox");
    subtaskCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                subTaskSelect = event.target.value;
                currentTask.splice(subTaskSelect, 1);
                // await backend.setItem('users', JSON.stringify(users));
            }
        });
    });
}


function editShowSelectedPriority(currentTask) {

    if (currentTask.priority == "urgent") {
        prioritySelect = "urgent";
        document.getElementById("editPriorityUrgent").classList.add('prio-urgent-selected');
        document.getElementById("editPriorityMedium").classList.remove('prio-medium-selected');
        document.getElementById("editPriorityLow").classList.remove('prio-low-selected');

        document.getElementById('editPriorityUrgentImg').src = 'assets/img/prio-urgent-white.png';
        document.getElementById('editPriorityMediumImg').src = 'assets/img/prio-medium.png';
        document.getElementById('editPriorityLowImg').src = 'assets/img/prio-low.png';
    }
    if (currentTask.priority == "medium") {
        prioritySelect = "medium";
        document.getElementById("editPriorityMedium").classList.add('prio-medium-selected');
        document.getElementById("editPriorityUrgent").classList.remove('prio-urgent-selected');
        document.getElementById("editPriorityLow").classList.remove('prio-low-selected');

        document.getElementById('editPriorityUrgentImg').src = 'assets/img/prio-urgent.png';
        document.getElementById('editPriorityMediumImg').src = 'assets/img/prio-medium-white.png';
        document.getElementById('editPriorityLowImg').src = 'assets/img/prio-low.png';
    }
    if (currentTask.priority == "low") {
        prioritySelect = "low";
        document.getElementById("editPriorityLow").classList.add('prio-low-selected');
        document.getElementById("editPriorityUrgent").classList.remove('prio-urgent-selected');
        document.getElementById("editPriorityMedium").classList.remove('prio-medium-selected');

        document.getElementById('editPriorityUrgentImg').src = 'assets/img/prio-urgent.png';
        document.getElementById('editPriorityMediumImg').src = 'assets/img/prio-medium.png';
        document.getElementById('editPriorityLowImg').src = 'assets/img/prio-low-white.png';
    }
}

function editSelectedPriority(i) {

    if (i == 1) {
        prioritySelect = "urgent";
        document.getElementById("editPriorityUrgent").classList.add('prio-urgent-selected');
        document.getElementById("editPriorityMedium").classList.remove('prio-medium-selected');
        document.getElementById("editPriorityLow").classList.remove('prio-low-selected');

        document.getElementById('editPriorityUrgentImg').src = 'assets/img/prio-urgent-white.png';
        document.getElementById('editPriorityMediumImg').src = 'assets/img/prio-medium.png';
        document.getElementById('editPriorityLowImg').src = 'assets/img/prio-low.png';
    }
    if (i == 2) {
        prioritySelect = "medium";
        document.getElementById("editPriorityMedium").classList.add('prio-medium-selected');
        document.getElementById("editPriorityUrgent").classList.remove('prio-urgent-selected');
        document.getElementById("editPriorityLow").classList.remove('prio-low-selected');

        document.getElementById('editPriorityUrgentImg').src = 'assets/img/prio-urgent.png';
        document.getElementById('editPriorityMediumImg').src = 'assets/img/prio-medium-white.png';
        document.getElementById('editPriorityLowImg').src = 'assets/img/prio-low.png';
    }
    if (i == 3) {
        prioritySelect = "low";
        document.getElementById("editPriorityLow").classList.add('prio-low-selected');
        document.getElementById("editPriorityUrgent").classList.remove('prio-urgent-selected');
        document.getElementById("editPriorityMedium").classList.remove('prio-medium-selected');

        document.getElementById('editPriorityUrgentImg').src = 'assets/img/prio-urgent.png';
        document.getElementById('editPriorityMediumImg').src = 'assets/img/prio-medium.png';
        document.getElementById('editPriorityLowImg').src = 'assets/img/prio-low-white.png';
    }
}



async function saveChangedTask(currentTaskId) {
    selectorcontactIndex = 0;
    let changedTitle = document.getElementById('changed_title').value;
    let changedDescription = document.getElementById('changed_description').value;
    let changedDueDate = document.getElementById('changed_date').value;
    let taskToChange = filteredTasks.find((taskId) => taskId.id == currentTaskId);
    taskToChange.user = [];
    taskToChange.user = userSelect;
    taskToChange.title = changedTitle;
    taskToChange.description = changedDescription;
    taskToChange.dueDate = changedDueDate;
    taskToChange.priority = prioritySelect;
    userSelect = [];
    prioritySelect = [];
    await backend.setItem('users', JSON.stringify(users));
    closeDetailTask();
}


async function deleteTask(currentTaskId) {
    let taskToDelete = filteredTasks.findIndex((taskId) => taskId.id == currentTaskId);
    filteredTasks.splice(taskToDelete, 1);
    await backend.setItem('users', JSON.stringify(users));
    closeDetailTask()
}

async function saveDeletetTask() {
    await backend.setItem('users', JSON.stringify(users));
}

//Closes the Detail Window
function closeDetailTask() {
    document.getElementById('detail_content').innerHTML = '';
    document.getElementById('detail_container').classList.add('d-none');
    filterTasksByStatus();
}