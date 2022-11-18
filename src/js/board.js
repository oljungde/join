let currentDraggedElement;


//Update the board
async function initBoard() {
    await init();
    identifyId()
    updateHTML();
}


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
    let priority = detailTodo['priority']
    let user = detailTodo['user']

    let toDo = allTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, title, description, user, priority)
    }
}


// renders the Detail Window
function generateDetailTodoHTML(element, category, title, description, user, priority) {
    return /*html*/`
    
    <img class="CloseCross-DetailTask" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
    <div class="detail-category ${category}">${category}</div>
    <h2 class="detail-title">${title}</h2>
    <div class="detail-text">${description}</div>
    <div class="detail-dueDate">Due date:</div>
    
    <div class="detail-priority">
      Prio <img src="assets/img/detail-prio-${priority}.png" alt="">
    </div>
    <div class="detail-assignedTo">Assigned To:${user}</div>
    `;
}


//Closes the Detail Window
function closeDetailTask() {
    document.getElementById('detail-container').classList.add('d-none');
    updateHTML()
}


