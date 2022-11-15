let j = 0;



function openAddTaskMask() {
    document.getElementById('AddTaskMaskBg').classList.remove('d-none');

    document.getElementById('AddTaskMaskContainer').innerHTML = /*html*/`

<form class="addTaskForm" onsubmit="addToTask(); return false; ">
        <img class="CloseCross" onclick="closeAddTaskMask()" src="assets/img/group 11.png" alt="">
     <div>
        <h2>Add Task</h2>
        <button>Create Task</button>
    </div>
    
    <input placeholder ="Enter a title" type="text" name="" id="AddTitle">


    <select id="AddCategory" value="">
        <option name="" id="">Sales</option>
        <option name="" id="">Design</option>
        <option name="" id="">Backoffice</option>
        <option name="" id="">Media</option>
    </select>
    
    <select id="user" value="">
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


async function addToTask() {
    let title = document.getElementById('AddTitle');
    let description = document.getElementById('AddDescription');
    let category = document.getElementById('AddCategory')

    let currentTask = {
        "id": j,
        "title": title.value,
        "description": description.value,
        "category": category.value,
        'status': 'toDo'
    };

    allTasks.push(currentTask);

    await backend.setItem("allTasks", JSON.stringify(allTasks));
    updateHTML()


}

function setIdOneHigher() {
    if (j >= 0) {
        j++;
    }
}




function closeAddTaskMask() {
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
}
