let currentDraggedElement;


//Update the board
async function initBoard() {
    checkUserIsLoggedIn();
    await init();
    identifyId()
    updateHTML();
}

// Updates the individual Areas of the board
function updateHTML() {
    updateToDoStatus()
    updateInProgressStatus()
    updateAwaitingFeedbackStatus()
    updateDoneStatus()
}


// Update the board
function identifyId() {
    let length = allTasks.length - 1;
    if (j > 0 || length >= 0) {
        j = length;
        j++;
    }
}


// Drag and Drop Bereiche werden definiert und Tasks gerendert
function updateToDoStatus() {
    let toDo = allTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }
}

//render the InProgress Area
function updateInProgressStatus() {
    let inProgress = allTasks.filter(p => p['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }
}


//render the updateAwaiting Area
function updateAwaitingFeedbackStatus() {
    let awaitingFeedback = allTasks.filter(a => a['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element);
    }
}


//render the Done Area
function updateDoneStatus() {
    let done = allTasks.filter(d => d['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}


// renders the Task-Card on the Board
function generateTodoHTML(element) {
    return /*html*/`
    <div onclick="showDetailWindow(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">   
      <div class="${element['category']}">${element['category']}</div>
      <div class=titleAndText>
          <h4 class="title">${element['title']}</h4>
          <div class="text">${element['description']}</div>
      </div>
      <div class=UserAndPriority>
        <div class="user">${element['user']}</div>
        <div class="priority"><img src="assets/img/prio-${element['priority']}.png" alt=""></div>
      </div>
    </div>`
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
function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    updateHTML();
}


// Generates the Detail Window
function showDetailWindow(id) {
    document.getElementById('detail-container').classList.remove('d-none');

    let detailTodo = allTasks[id];
    let category = detailTodo['category'];
    let title = detailTodo['title'];
    let description = detailTodo['description'];
    let dueDate = detailTodo['dueDate'];
    let priority = detailTodo['priority'];
    let user = detailTodo['user'];

    let toDo = allTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, title, description, dueDate, user, priority)
    }
}


// renders the Detail Window
function generateDetailTodoHTML(element, category, title, description, dueDate, user, priority) {
    return /*html*/`
    
    <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
    <div class="detail-category ${category}">${category}</div>
    <h2 class="detail-title">${title}</h2>
    <div class="detail-text">${description}</div>
    <div class="detail-dueDate"> <span>Due date: </span>  <p>${dueDate}</p></div>
    
    <div class="detail-priority">
     <p> Priority:</p> <img src="assets/img/detail-prio-${priority}.png" alt="">
    </div>
    <div class="detail-assignedTo">Assigned To:${user}</div>
    <img id="edit_button" class="edit-button pointer" src="assets/img/edit-button.png" onclick="changeTask()">
    `;
}

function changeTask(){
    document.getElementById('Detail').innerHTML = /*html*/`
    <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
    
    <div class="input-title">
        <input id="AddTitle" type="text" placeholder="Enter a title" autocomplete="off" required>
    </div>

    <div>
        <h4>Description</h4>
        <input class="add-description" id="AddDescription" type="text" placeholder="Enter a Description">
    </div>

    <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
        <h4>Due Date</h4>
        <div class= "input-date" id="input-date">
            <input id="add-date" class="add-date" placeholder="dd/mm/yy" type="date">
            <img src="assets/img/dateSelect-img.png" alt="">
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
        <button class="btn">Ok <img src="assets/img/white-check.png" alt=""></button>

    `
}


//Closes the Detail Window
function closeDetailTask() {
    document.getElementById('detail-container').classList.add('d-none');
    updateHTML()
}


