let AllTasks = [];

let currentDraggedElement;

async function init() {
    await includeHTML();
    await downloadFromServer();
    AllTasks = JSON.parse(backend.getItem('Alltasks'));
}

function updateHTML() {
    updateToDoStatus()
    updateInProgressStatus()
    updateAwaitingFeedbackStatus()
    updateDoneStatus()
}

// Drag and Drop Bereiche werden definiert und Tasks gerendert


function updateToDoStatus() {
    let toDo = AllTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }
}

function updateInProgressStatus() {
    let inProgress = AllTasks.filter(p => p['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }
}

function updateAwaitingFeedbackStatus() {

    let awaitingFeedback = AllTasks.filter(a => a['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element);
    }

}

function updateDoneStatus() {
    let done = AllTasks.filter(d => d['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }

}



function generateTodoHTML(element) {
    return `<div onclick="showDetailWindow(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">   

      <div class="${element['category']}">${element['category']}</div>
      
      <div class=titleAndText>
        
        <h4 class="title">${element['title']}</h4>
        <div class="text">${element['description']}</div>
      
      </div>

      <div class=UserAndPriority>
        <div class="user">${element['user']}</div>
        <div>${element['priority']}</div>
      </div>
    </div>`
}


// Drag and Drop

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    AllTasks[currentDraggedElement]['status'] = status;
    updateHTML();
}






// Generate the Detail Window


function showDetailWindow(id) {

    document.getElementById('DetailContainer').classList.remove('d-none');

    let detailTodo = AllTasks[id];
    let chip = detailTodo['chip'];
    let title = detailTodo['title'];
    let text = detailTodo['text'];

    let toDo = AllTasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('Detail').innerHTML += generateDetailTodoHTML(element, chip, title, text)
    }


}

function generateDetailTodoHTML(element, chip, title, text) {
    return `
    <div class="${chip}">${chip}</div>
    <h2 class="DetailTitle">${title}</h2>
    <div class="text">${text}</div>
    <div class="dueDate">Due date:</div>
    <div class="Priority">Priority:</div>
    <div class="assignedTo">Assigned To:</div>
    `;
}
