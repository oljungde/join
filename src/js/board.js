

let allTasks = [{
    'id': 0,
    'chip': 'Design',
    'title': 'Website redesign',
    'text': 'Modify the contents of the main website',
    'progress': '',
    'user': ['SM', 'MV', 'EF'],
    'priority': 'low',
    'category': 'toDo'
}, {
    'id': 1,
    'chip': 'Sales',
    'title': 'Call potencial clients',
    'text': 'Make the product presen-tation to prospective buyers',
    'progress': '',
    'user': ['AS', 'DE', '+2'],
    'priority': 'high',
    'category': 'inProgress'

}, {
    'id': 2,
    'chip': 'Backoffice',
    'title': 'Accounting invoices',
    'text': 'Write open invoices for customer',
    'progress': '',
    'user': ['MB', 'AM', '+3'],
    'priority': 'middle',
    'category': 'awaitingFeedback'

}, {
    'id': 3,
    'chip': 'Media',
    'title': 'Video cut',
    'text': 'Develop an ad campaign for brand positioning',
    'progress': '',
    'user': ['HK'],
    'priority': 'middle',
    'category': 'awaitingFeedback'

}, {
    'id': 4,
    'chip': 'Marketing',
    'title': 'Social media strategy',
    'text': 'Edit the new company video',
    'progress': '',
    'user': ['BZ', 'RS'],
    'priority': 'low',
    'category': 'done'

}];

let currentDraggedElement;

function updateHTML() {

updateTodoCategory();
updateInprogressCategory();
updateAwaitingFeedbackCategory();
updateDoneCategory();
}

function updateTodoCategory(){

    let toDo = allTasks.filter(t => t['category'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }
}


function updateInprogressCategory(){
    
    let inProgress = allTasks.filter(p => p['category'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }
}


function updateAwaitingFeedbackCategory(){
    
    let awaitingFeedback = allTasks.filter(a => a['category'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element);
    }
}


function updateDoneCategory(){

    let done = allTasks.filter(d => d['category'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}



function showDetailWindow(id, ) {

    document.getElementById('DetailContainer').classList.remove('d-none');

    let detailTodo = allTasks[id];
    let chip = detailTodo['chip'];
    let title = detailTodo['title'];
    let text = detailTodo['text'];

    let toDo = allTasks.filter(t => t['category'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('Detail').innerHTML += generateDetailTodoHTML(element,chip, title, text)
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


function generateTodoHTML(element) {
    return `<div onclick="showDetailWindow(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">   

      <div class="${element['chip']}">${element['chip']}</div>
      
      <div class=titleAndText>
        
        <h4 class="title">${element['title']}</h4>
        <div class="text">${element['text']}</div>
      
      </div>

      <div class=UserAndPriority>
        <div class="user">${element['user']}</div>
        <div>${element['priority']}</div>
      </div>

    </div>`
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    allTasks[currentDraggedElement]['category'] = category;
    updateHTML();
}