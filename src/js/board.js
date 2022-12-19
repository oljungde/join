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
    identifyId();
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
        document.getElementById(id).innerHTML += `
            <div style="background-color: ${color}" class="user">${letter}</div>
        `;
    }
}

// Update the board
function identifyId() {
    let length = currentUserTasks.length - 1;
    if (j > 0 || length >= 0) {
        j = length;
        j++;
    }
}


// renders the Task-Card on the Board
function generateTodoHTML(element) {
    return /*html*/`
    <div onclick="showDetailWindow(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo" id="${element['id']}">   
      <div class="${element['category']['TaskColor']}">${element['category']['Category']}</div>
      <div class=titleAndText>
          <h4 class="title">${element['title']}</h4>
          <div class="text">${element['description']}</div>
      </div>

      <div class="task-progress">
        <div class="progress-bar">
            <div class="progress-bar-fill" id="fill${element["id"]}"></div>
        </div>
        <span id="fill-text${element["id"]}"> Done</span>
      </div>

      <div class=UserAndPriority>
        <div id="${element['id']}"></div>
        
        <div class="priority"><img src="assets/img/prio-${element['priority']}.png" alt=""></div>
      </div>
    </div>`
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
    currentDraggedElement = id;
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
 * @param {opject} currentTask is the selected task to show the details window
 * @returns the html code for rendering the task details window
 */
function detailContentTemplate(currentTask) {
    return /*html*/`
        <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
        <div class="detail-category ${currentTask.category.TaskColor}">
            ${currentTask.category.Category}
        </div>
        <h2 class="detail-title">${currentTask.title}</h2>
        <div class="detail-text">
            ${currentTask.description}
        </div>
        <div class="detail-dueDate"> 
            <span>Due date:</span>  
            <p>${currentTask.dueDate}</p>
        </div>
        <div class="detail-priority">
            <p> Priority:</p> 
            <img src="assets/img/detail-prio-${currentTask.priority}.png" alt="">
        </div>
        <div class="detail-assignedTo"> 
            <p>Assigned To:</p> 
            <div id="detail_assigned_contacts">
                
            </div> 
        </div>
        <img id="edit_button" class="edit-button pointer" src="assets/img/edit-button.png" onclick="changeTask(${currentTask.id})">
        <div class="detail-subTasks" id="detail_subTasks">
        <p>Subtasks:</p>
        </div>
    `;
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
        detailAssignedContacts.innerHTML += `
            <div style="background-color: ${color}" class="user">${letter}</div>
        `;
    }
}

/**
 * renders the assigned subTasks from the current task
 * @param {object} currentTask is the task to show the details from
 */
function renderAssignedSubTasks(currentTask) {
    let detailAssignedSubTasks = document.getElementById('detail_subTasks')
    for (let assignedSubTaskIndex = 0; assignedSubTaskIndex < currentTask.subTask.length; assignedSubTaskIndex++) {
        let subTask = currentTask.subTask[assignedSubTaskIndex];
        detailAssignedSubTasks.innerHTML += `
        <div> ${subTask}</div>
        `
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
        }
    }
}


function changeTaskTemplate(currentTask) {
    return /*html*/`
        <form onsubmit="saveChangedTask(${currentTask.id}); return false;" class="editTask">
            <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
        
            <div class="input-title">
                <input id="changed_title" type="text" value="${currentTask.title}" autocomplete="off" required>
            </div>

            <div>
                <h4>Description</h4>
                <input class="add-description" id="changed_description" type="text" value="${currentTask.description}">
            </div>

            <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
                <h4>Due Date</h4>
                <div class= "input-date" id="input-date">
                    <input id="changed_date" class="add-date" value="${currentTask.dueDate}" type="date">
                </div>
            </div>

            <div class="priorityContainer">
                    <div class="priority-urgent" onclick="editSelectedPriority(1)" id="editPriorityUrgent">
                        <p>Urgent</p> 
                        <img id="editPriorityUrgentImg" src="assets/img/prio-urgent.png" alt="">
                    </div>
                <div class="priority-medium" id="editPriorityMedium" onclick="editSelectedPriority(2)">
                    <p>Medium</p> 
                    <img id="editPriorityMediumImg" src="assets/img/prio-medium.png" alt="">
                </div>
                <div class="priority-low" id="editPriorityLow" onclick="editSelectedPriority(3)">
                    <p>Low</p> 
                    <img id="editPriorityLowImg" src="assets/img/prio-low.png" alt="">
                </div>
            </div>

            <div id="user_selector">
                <div class="selector-header" onclick="showUsers(${currentTask.id})">
                    Select contacts to assign
                    <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
                </div>
            </div>
            <div class="selector-user-dropdown" id="selector_user_dropdown">  
            </div>
            <div>
                <button class="btn ok">Ok <img src="assets/img/white-check.png" alt=""></button>
            </div>
        </form>
        <button onclick="deleteTask(${currentTask.id})" class="btn trash-button"><img class="trash" src="assets/img/trash.ico" alt=""></button>
    `
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
    selectorcontactIndex--;
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