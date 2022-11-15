let j = 0;



function openAddTaskMask() {
    document.getElementById('AddTaskMaskBg').classList.remove('d-none');

    document.getElementById('AddTaskMaskContainer').innerHTML = /*html*/`

<form class="addTaskForm" onsubmit="addToTask(); return false; ">
        <img class="CloseCross" onclick="closeAddTaskMask()" src="assets/img/group 11.png" alt="">
     <div class="addTask-top">
        <h2>Add Task</h2>
        <button class="btn">Create Task</button>
    </div>
    
    <div class="input border-bottom">
                    <input id="AddTitle" type="text" placeholder="Ener a title" autocomplete="off" required>
                </div>

                <div class="input border-bottom">
    <select id="AddUser" value="">
        <option name="" id="">Martin Schmidt</option>
        <option name="" id="">Ulf Kirsten</option>
    </select>
    </div>


    <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
        <p>Due Date</p>
        <input type="date">
                </div>




    <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
        <p>Category</p>
    <select id="AddCategory" value="">
        <option name="" id="">Sales</option>
        <option name="" id="">Design</option>
        <option name="" id="">Backoffice</option>
        <option name="" id="">Media</option>
    </select>
                </div>


  

    
   
    
    <div>
        <img src="assets/img/Prio_urgent.png" alt="">
        <img src="assets/img/Prio_medium.png" alt="">
        <img src="assets/img/Prio_low.png" alt="">
    
    </div>

    <div>
    <p>Description</p>
    <input id="AddDescription" type="text" placeholder="Enter a Description">
    </div>
    
    <input type="text" placeholder="Add a new subtask">
    
</form>

    `;

}


async function addToTask() {
    let title = document.getElementById('AddTitle');
    let description = document.getElementById('AddDescription');
    let category = document.getElementById('AddCategory')
    let user = document.getElementById('AddUser')


    let currentTask = {
        "id": j,
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "user": user.value,
        'status': 'toDo'
    };

    allTasks.push(currentTask);

    await backend.setItem("allTasks", JSON.stringify(allTasks));
    updateHTML()
    setIdOneHigher()


}

function setIdOneHigher() {
    if (j >= 0) {
        j++;
    }
}




function closeAddTaskMask() {
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
}
