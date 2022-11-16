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


    
    <div class="priorityContainer">
        <div class="priority-urgent" onclick="selectedPriority(1)" id="priorityUrgent">
        <p>Urgent</p> <img id="priorityUrgentImg" src="assets/img/prio-urgent.png" alt="">
        </div>

        <div class="priority-medium" id="priorityMedium" onclick="selectedPriority(2)">
        <p>Medium</p> <img id="priorityMediumImg" src="assets/img/prio-medium.png" alt="">
        </div>

        <div class="priority-low" id="priorityLow" onclick="selectedPriority(3)">
        <p>Low</p> <img id="priorityLowImg" src="assets/img/prio-low.png" alt="">
        </div>
    
    </div>

    <div>
    <p>Description</p>
    <input class="add-description" id="AddDescription" type="text" placeholder="Enter a Description">
    </div>
    
    <input type="text" placeholder="Add a new subtask">
    
</form>
    `;

}


async function addToTask() {
    let title = document.getElementById('AddTitle');
    let description = document.getElementById('AddDescription');
    let category = document.getElementById('AddCategory');
    let user = document.getElementById('AddUser');
    


    let currentTask = {
        "id": j,
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "user": user.value,
        "priority": prioritySelect,
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

function selectedPriority(i) {
    if (i == 1) {
      prioritySelect = "urgent";
      document.getElementById("priorityUrgent").classList.add('prio-urgent-selected');
      document.getElementById("priorityMedium").classList.remove('prio-medium-selected');
      document.getElementById("priorityLow").classList.remove('prio-low-selected');

      document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent-white.png';
      document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium.png';
      document.getElementById('priorityLowImg').src = 'assets/img/prio-low.png';


    }
    if (i == 2) {
      prioritySelect = "medium";
      document.getElementById("priorityMedium").classList.add('prio-medium-selected');
      document.getElementById("priorityUrgent").classList.remove('prio-urgent-selected');
      document.getElementById("priorityLow").classList.remove('prio-low-selected');

      document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent.png';
      document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium-white.png';
      document.getElementById('priorityLowImg').src = 'assets/img/prio-low.png';


    }
    if (i == 3) {
      prioritySelect = "low";
      document.getElementById("priorityLow").classList.add('prio-low-selected');
      document.getElementById("priorityUrgent").classList.remove('prio-urgent-selected');
      document.getElementById("priorityMedium").classList.remove('prio-medium-selected');

      document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent.png';
      document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium.png';
      document.getElementById('priorityLowImg').src = 'assets/img/prio-low-white.png';

    }
  }
