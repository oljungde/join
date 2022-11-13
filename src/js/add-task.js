setURL('https://gruppe-377.developerakademie.net/smallest_backend_ever');

let AllTasks = [];

async function init() {
    await downloadFromServer();
    AllTasks = await backend.getItem('tasks') || [];
}


function openAddTaskMask() {
    document.getElementById('AddTaskMaskBg').classList.remove('d-none');

    document.getElementById('AddTaskMaskContainer').innerHTML = /*html*/`

<form class="addTaskForm" onsubmit="addToTask() ">
        <img class="CloseCross" onclick="closeAddTaskMask()" src="assets/img/group 11.png" alt="">
     <div>
        <h2>Add Task</h2>
        <button>Create Task</button>
    </div>
    
    <input placeholder ="Enter a title" type="text" name="" id="AddTitle">
    
    <select value="">
        <option name="" id="">Martin Schmidt</option>
        <option name="" id="">Ulf Kirsten</option>
    </select>
    
    <input type="date">
    
    <div>
        <img src="assets/img/Prio_urgent.png" alt="">
        <img src="assets/img/Prio_medium.png" alt="">
        <img src="assets/img/Prio_low.png" alt="">
    
    </div>
    
    <input id="AddDescription" type="text" placeholder="Enter a Description">
    
    <input type="text" placeholder="Add a new subtask">
    
</form>

    `;

}

function closeAddTaskMask(){
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
}

function addToTask(){
    let title = document.getElementById('AddTitle');
    let description = document.getElementById('AddDescription');

    let currentTask = {
        "title" : title.value,
        "description" : description.value
    };

    AllTasks.push(currentTask);
    backend.setItem('tasks', AllTasks)

    

}
