let currentDraggedElement;
let alreadyEmpty = true;
let currentUserTasks;

//Update the board
async function initBoard() {
    await init();
    checkUserIsLoggedIn();
    getTasksOfCurrentUser();
    identifyId();
    updateHTML();
}


/**
 * NEW BY OJ 29.11.2022
 * get the tasks of the current user
 */
function getTasksOfCurrentUser() {
    currentUserTasks = currentUser.tasks;
    console.log(currentUserTasks);
}

// Updates the individual Areas of the board
function updateHTML() {
    // updateToDoStatus();
    getCurrentUserTodos(); // NEW BY OJ 29.11.2022
    updateInProgressStatus();
    updateAwaitingFeedbackStatus();
    updateDoneStatus();
}


// Update the board
function identifyId() {
    let length = allTasks.length - 1;
    if (j > 0 || length >= 0) {
        j = length;
        j++;
    }
}


/**
 * NEW BY OJ 29.11.2022
 * get the tasks with status 'toDo' from current user and render it
 */
function getCurrentUserTodos() {
    let toDo = currentUserTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }
}


// // Drag and Drop Bereiche werden definiert und Tasks gerendert
// function updateToDoStatus() {
//     let toDo = allTasks.filter(t => t['status'] == 'toDo');
//     document.getElementById('toDo').innerHTML = '';

//     for (let index = 0; index < toDo.length; index++) {
//         const element = toDo[index];
//         document.getElementById('toDo').innerHTML += generateTodoHTML(element);
//     }
// }

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
function generateTodoHTML(element, i) {
    return /*html*/`
    <div onclick="showDetailWindow(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">   
      <div class="${element['category']}">${element['category']}</div>
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
        <div class="user">${element['user']}</div>
        <div class="priority"><img src="assets/img/prio-${element['priority']}.png" alt=""></div>
      </div>
    </div>`
}

// Progress-bar for the Tasks -- not working
function updateProgressBar(status, id) {
    let fill = document.getElementById("fill" + id);
    let filltext = document.getElementById("fill-text" + id);
    fillWhenToDo(status, fill, filltext);
    fillWhenInProgress(status, fill, filltext);
    fillWhenAwaitProgress(status, fill, filltext);
    fillWhenDone(status, fill, filltext);
}


// Fills the progress bar when in category ToDo
function fillWhenToDo(status, fill, filltext) {
    if (status == "toDo") {
        fill.style.width = "0%";
        filltext.innerHTML = `0/3 Done`;
    }
}


// Fills the progress bar when in category inProgress
function fillWhenInProgress(status, fill, filltext) {
    if (status == "inProgress") {
        fill.style.width = "33%";
        filltext.innerHTML = `1/3 Done`;
    }
}


// Fills the progress bar when in category awaitingFeedback
function fillWhenAwaitProgress(status, fill, filltext) {
    if (status == "awaitingFeedback") {
        fill.style.width = "66%";
        filltext.innerHTML = `2/3 Done`;
    }
}


// Fills the progress bar when in category Done
function fillWhenDone(status, fill, filltext) {
    if (status == "done") {
        fill.style.width = "100%";
        filltext.innerHTML = `3/3 Done`;
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
    allTasks[currentDraggedElement]['status'] = status;
    e.target.classList.remove('drag-over');

    updateHTML();
    updateProgressBar(status, currentDraggedElement)
    saveToBackend();
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

    let inProgress = allTasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, title, description, dueDate, user, priority)
    }

    let awaitingFeedback = allTasks.filter(t => t['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('Detail').innerHTML = generateDetailTodoHTML(element, category, title, description, dueDate, user, priority)
    }

    let done = allTasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
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
      <div>${user}</div> 
    </div>
    
    <img id="edit_button" class="edit-button pointer" src="assets/img/edit-button.png" onclick="changeTask()">
    `;
}

// renders the mask for editing an existing task
function changeTask() {
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

/*
// search function for tasks on the board --not working
function searchTasks() {
    let search = document.getElementById('search_input');
    search = search.value.toLowerCase();

    for (let i = 0; i < allTasks.length; i++) {
        let taskSearched = allTasks[i]['title'];
        if (taskSearched.toLowerCase().includes(search)) {
            updateHTML(taskSearched);
        }
    }
}
*/

function searchTasks() {
    let search = document.getElementById('search_input');
    let todo = document.getElementById('toDo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;
    if (search.value == '' && alreadyEmpty == true) {
        updateHTML();
        alreadyEmpty = false;
    } else {
        alreadyEmpty = true;
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i]['title'].includes(search.value)) {
                if (allTasks[i]['status'] == 'toDo') {
                    todo.innerHTML += updateToDoStatus(i);

                }
                if (allTasks[i]['status'] == 'inProgress') {
                    inProgress.innerHTML += updateInProgressStatus(i);

                }
                if (allTasks[i]['status'] == 'awaitingFeedback') {
                    awaitingFeedback.innerHTML += updateAwaitingFeedbackStatus(i);

                }
                if (allTasks[i]['status'] == 'done') {
                    done.innerHTML += updateDoneStatus(i);

                }
            }
        }
    }
}





//Closes the Detail Window
function closeDetailTask() {
    document.getElementById('detail-container').classList.add('d-none');
    updateHTML()
}


