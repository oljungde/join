let AllTasks = [{
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
    'category': 'toDo'

}];


let currentDraggedElement;

function updateHTML() {



    let tasks = AllTasks.filter(t => t['category'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(task);
    }




    let inProgress = AllTasks.filter(p => p['category'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const task = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(task);
    }




    let awaitingFeedback = AllTasks.filter(a => a['category'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let index = 0; index < awaitingFeedback.length; index++) {
        const task = awaitingFeedback[index];
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(task);
    }




    let done = AllTasks.filter(d => d['category'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const task = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(task);
    }



}

function showDetailWindow(id, ) {

    document.getElementById('DetailContainer').classList.remove('d-none');

    let detailTodo = AllTasks[id];
    let chip = detailTodo['chip'];
    let title = detailTodo['title'];
    let text = detailTodo['text'];



    let tasks = AllTasks.filter(t => t['category'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        document.getElementById('Detail').innerHTML += generateDetailTodoHTML(task,chip, title, text)
    }


}

function generateDetailTodoHTML(task, chip, title, text) {
    return `

    <div class="${chip}">${chip}</div>
    <h2 class="DetailTitle">${title}</h2>
    <div class="text">${text}</div>
    <div class="dueDate">Due date:</div>
    <div class="Priority">Priority:</div>
    <div class="assignedTo">Assigned To:</div>
    

      
    `;
}


function generateTodoHTML(task) {
    return `<div onclick="showDetailWindow(${task['id']})" draggable="true" ondragstart="startDragging(${task['id']})" class="todo">   

      <div class="${task['chip']}">${task['chip']}</div>
      
      <div class=titleAndText>
        
        <h4 class="title">${task['title']}</h4>
        <div class="text">${task['text']}</div>
      
      </div>

      <div class=UserAndPriority>
        <div class="user">${task['user']}</div>
        <div>${task['priority']}</div>
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
    AllTasks[currentDraggedElement]['category'] = category;
    updateHTML();
}