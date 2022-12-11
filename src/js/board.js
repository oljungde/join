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
        <div style="background-color: ${element['usercolor']}" class="user">${element['user']}</div>
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


// Generates the Detail Window
function showDetailWindow(id) {
    document.getElementById('detail-container').classList.remove('d-none');

    let detailTodo = filteredTasks[id];
    let category = detailTodo['category']['Category'];
    let categoryColor = detailTodo['category']['TaskColor'];
    let title = detailTodo['title'];
    let description = detailTodo['description'];
    let dueDate = detailTodo['dueDate'];
    let priority = detailTodo['priority'];
    let user = detailTodo['user'];

    let toDo = filteredTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, categoryColor, title, description, dueDate, user, priority, id)
    }

    let inProgress = filteredTasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, categoryColor, title, description, dueDate, user, priority, id)
    }

    let awaitingFeedback = filteredTasks.filter(t => t['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, categoryColor, title, description, dueDate, user, priority, id)
    }

    let done = filteredTasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, categoryColor, title, description, dueDate, user, priority, id)
    }
}


// renders the Detail Window
function generateDetailTodoHTML(element, category, categoryColor, title, description, dueDate, user, priority, id) {
    return /*html*/`
    
    <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
    <div class="detail-category ${categoryColor}">${category}</div>
    <h2 class="detail-title">${title}</h2>
    <div class="detail-text">${description}</div>
    <div class="detail-dueDate"> 
      <span>Due date:</span>  
      <p>${dueDate}</p>
    </div>
    
    <div class="detail-priority">
      <p> Priority:</p> 
      <img src="assets/img/detail-prio-${priority}.png" alt="">
    </div>
    
    <div class="detail-assignedTo"> 
      <p>Assigned To:</p> 
      <div  >${user}</div> 
    </div>
    
    <img id="edit_button" class="edit-button pointer" src="assets/img/edit-button.png" onclick="changeTask(${id})">
    `;
}


// renders the mask for editing an existing task
function changeTask(id) {
    filteredTasks[id]
    document.getElementById('Detail').innerHTML = /*html*/`
    <form onsubmit="pushChangedTask(${filteredTasks[id]}); return false;" class="editTask">
    <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
    
    <div class="input-title">
        <input id="AddTitle" type="text" value="${filteredTasks[id]['title']}" autocomplete="off" required>
    </div>

    <div>
        <h4>Description</h4>
        <input class="add-description" id="AddDescription" type="text" value="${filteredTasks[id]['description']}">
    </div>

    <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
        <h4>Due Date</h4>
        <div class= "input-date" id="input-date">
            <input id="add-date" class="add-date" value="${filteredTasks[id]['dueDate']}" type="date">
            <img src="./assets/img/dateSelect-img.png" alt="">
        </div>
    </div>

    <div class="priorityContainer">
            <div class="priority-urgent" onclick="selectedPriority(1)" id="priorityUrgent">
                <p>Urgent</p> 
                <img id="priorityUrgentImg" src="assets/img/prio-urgent.png" alt="">
            </div>
          <div class="priority-medium" id="priorityMedium" onclick="selectedPriority(2)">
              <p>Medium</p> 
              <img id="priorityMediumImg" src="assets/img/prio-medium.png" alt="">
          </div>
          <div class="priority-low" id="priorityLow" onclick="selectedPriority(3)">
              <p>Low</p> 
              <img id="priorityLowImg" src="assets/img/prio-low.png" alt="">
          </div>
       </div>

       <div id="user_selector">
             <div class="selector-header" onclick="showUsers()">
                Select contacts to assign
                <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
              </div>
        </div>
        <div class="selector-user-dropdown" id="selector_user_dropdown">  </div>
        <div>
        
        <button type="submit" class="btn ok">Ok <img src="assets/img/white-check.png" alt=""></button>
        </div>
</form>
<button onclick="deleteTask(${id})" class="btn trash-button"><img class="trash" src="assets/img/trash.ico" alt=""></button>
    `
}


async function deleteTask(id) {
    filteredTasks.splice(id, 1);
    console.log(filteredTasks);
    await backend.setItem('users', JSON.stringify(users));
    closeDetailTask();
    filterTasksByStatus();
}

async function saveDeletetTask() {
    await backend.setItem('users', JSON.stringify(users));
}

//Closes the Detail Window
function closeDetailTask() {
    document.getElementById('detail-container').classList.add('d-none');


}