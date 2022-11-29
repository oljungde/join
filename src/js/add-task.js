let j = 0;


/**
 * init function will execute wenn page add-task.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
async function initAddTask() {
  await init();
  checkUserIsLoggedIn();
}


//defines the current task and pushes it to the Array alltasks and saves it in the backend 
async function addToTask() {
  let title = document.getElementById('AddTitle');
  let description = document.getElementById('AddDescription');
  let dueDate = document.getElementById('add-date');

  let currentTask = {
    "id": j,
    "category": categorySelect,
    "title": title.value,
    "description": description.value,
    "dueDate": dueDate.value,
    "priority": prioritySelect,
    "user": userSelect,
    'status': 'toDo'
  };

  // allTasks.push(currentTask);
  currentUserTasks.push(currentTask); // NEW BY OJ 29.11.2022
  console.log(currentUserTasks);
  updateProgressBar()
  saveToBackend()
  updateHTML()
  setIdOneHigher()

}


// adds 1 to the id for adding tasks
function setIdOneHigher() {
  if (j >= 0) {
    j++;
  }
}


//renders the AddTask Mask
function openAddTaskMask() {
  document.getElementById('AddTaskMaskBg').classList.remove('d-none');

  document.getElementById('AddTaskMaskContainer').innerHTML = /*html*/`
  <form class="addTaskForm" onsubmit="addToTask(); return false; ">
        <img class="CloseCross" onclick="closeAddTaskMask()" src="assets/img/group 11.png" alt="">
        <div class="addTask-top">
           <h2>Add Task</h2>
           <button class="btn">Create Task <img src="assets/img/white-check.png" alt=""></button>
         </div>
    
        <div class="input-title">
            <input id="AddTitle" type="text" placeholder="Enter a title" autocomplete="off" required>
        </div>

        <div id="user_selector">
             <div class="selector-header" onclick="showUsers()">
                Select contacts to assign
                <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
              </div>
        </div>
        <div class="selector-user-dropdown" id="selector_user_dropdown">  </div>

        <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
           <h4>Due Date</h4>
           <div class= "input-date" id="input-date">
             <input id="add-date" class="add-date" placeholder="dd/mm/yy" type="date">
             <img src="assets/img/dateSelect-img.png" alt="">
           </div>
        </div>

        <h4>Category</h4>        
        <div id="category_selector">
           <div id="selected_category" class="selector-header" onclick="showTaskCategories()">
              Select task category
              <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
           </div>
        </div>
        <div class="selector-Category-Dropdown" id="selector_Category_Dropdown">  </div>

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
       <div>
         <h4>Description</h4>
         <input class="add-description" id="AddDescription" type="text" placeholder="Enter a Description">
       </div>
       <h4>Subtasks</h4>
       <div class="input-subtasks pointer" id="newSubtask_select">
       <div class="inputUser">
       <div class="inputfield-new-user">
         <input class="input border-bottom" id="subtaskText" type="text" placeholder="Add new subtask">
         <div class="checkAndCrossIconsCategory">
          <img src="./assets/img/blue-cross.png" onclick="clearSubTasks()" class="blue-cross pointer">
          <img src="./assets/img/devider.png">
          <img src="./assets/img/blue-check.png" onclick="pushSubtaskLocalStorage()" class="blue-check pointer">
       </div>
    </div>
       </div>
       <div class="new-Subtasks" id="addSubtaskCheckbox">

       </div>
  </form>
    `;
}


//  subTasks in the AddTaskMask

//Rendering the subtasks checkboxes when generating a new subtask

function renderSubTask() {
  subTasks = JSON.parse(localStorage.getItem("subtasks")) || [];
  document.getElementById("addSubtaskCheckbox").innerHTML = ``;
  for (let i = 0; i < subTasks.length; i++) {
    subTasks = subTasks[i];
    document.getElementById("addSubtaskCheckbox").innerHTML += `
        <div class="subtaskList" id="subtaskValue">  
        <input id="subTask_checkBox" value="${subTasks}" class="subtaskCheckbox pointer" type="checkbox">
        <p>${subTasks}</p>
        </div>`;
  }
}


//gettin the checked subtask
function getSelectedSubtask() {
  let subtaskCheckboxes = document.querySelectorAll("subTask_checkBox");
  subtaskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        checkedSubtaskValue = event.target.value;
      }
    });
  });
}


//pushing new subtask in the Localstorage
function pushSubtaskLocalStorage() {
  if (document.getElementById("subtaskText").value) {

    subTasks.push(document.getElementById("subtaskText").value);
    document.getElementById("subtaskText").value = ``;
    localStorage.setItem("subtasks", JSON.stringify(subTasks));
    renderSubTask();
  }
}


//clear subtask input
function clearSubTasks() {
  document.getElementById("subtaskText").value = ``;
}


//closes the AddTaskMask
function closeAddTaskMask() {
  document.getElementById('AddTaskMaskBg').classList.add('d-none');
}


//renders the Drop Down Menu for the User selection
function showUsers() {
  let staticUsers = [
    { statUser: 'You', cagtegoryID: 0 },
    { statUser: 'Maximillian Vogel', categoryID: 1 },
    { statUser: 'Invite new contact', categoryID: 2 },
  ];

  document.getElementById('selector_user_dropdown').innerHTML = ``;
  document.getElementById('selector_user_dropdown').innerHTML += /*html*/`  
  <div onclick="selectedUser('${staticUsers[2].statUser}')" class="selectorCell pointer" >
      ${staticUsers[2].statUser}
      <img src="./assets/img/newContact-img.png">
  </div>
  `;

  for (let y = 0; y < 2; y++) {
    document.getElementById('selector_user_dropdown').innerHTML += /*html*/`
    <div onclick="selectedUser('${staticUsers[y].statUser}')" class="selectorCell pointer">
        <div>${staticUsers[y].statUser}</div>
        <div><img id="user_select" src="./assets/img/userSelect-img.png"></div>
    </div>
    `;
  }
}


// getting selected User
function selectedUser(user) {
  if (user == "Invite new contact") {
    document.getElementById('selector_user_dropdown').classList.add('d-none');
    document.getElementById("user_selector").innerHTML = /*html*/`
    <div class="inputUser">
       <div class="inputfield-new-user">
         <input class="input border-bottom" id="newUserText" type="text" placeholder="Contact email" required>
         <div class="checkAndCrossIconsCategory">
          <img src="./assets/img/blue-cross.png" onclick="exitCategorySelector()" class="blue-cross pointer">
          <img src="./assets/img/devider.png">
          <img src="./assets/img/blue-check.png" onclick="addCategory()" class="blue-check pointer">
       </div>
    </div>
    `;
  }
  if (user == "Maximillian Vogel") {
    userSelect = "Maximillian Vogel";
    document.getElementById('user_select').src = 'assets/img/userSelect-selected.png';
  }
  if (user == "You") {
    userSelect = "You";
    document.getElementById('user_select').src = 'assets/img/userSelect-selected.png';
  }
}


// function for exting the categorySelector by clicking on the cross
function exitCategorySelector() {
  document.getElementById('user_selector').classList.add('d-none');
  document.getElementById('selector_user_dropdown').classList.remove('d-none');

}



// renders the Drop Down Menu for the categories
function showTaskCategories() {
  let staticCategorys = [
    { taskCategory: 'New category', taskColor: 'grayCategory', cagtegoryID: 0 },
    { taskCategory: 'Sales', taskColor: 'purpleCategory', cagtegoryID: 1 },
    { taskCategory: 'Backoffice', taskColor: 'blueCategory', cagtegoryID: 2 },
  ];

  document.getElementById('selector_Category_Dropdown').innerHTML = ``;
  document.getElementById('selector_Category_Dropdown').innerHTML += /*html*/`  
  <div onclick="selectedCategory('${staticCategorys[0].taskCategory}','${staticCategorys[0].taskColor}')" class="selectorCell pointer">
  <div>${staticCategorys[0]['taskCategory']}</div>
    </div>
  `;

  for (let y = 1; y < staticCategorys.length; y++) {
    document.getElementById('selector_Category_Dropdown').innerHTML += `
    <div onclick="selectedCategory('${staticCategorys[y].taskCategory}','${staticCategorys[y].taskColor}')" class="selectorCell pointer">
            <div>${staticCategorys[y].taskCategory}</div>
            <div><img src="./assets/img/${staticCategorys[y].taskColor}.png"</div>
          </div>
    `;
  }
};


// getting selected Category
function selectedCategory(category, color) {
  if (category == "New category") {
    changeInputCategory();
  }
  if (category == "Sales") {
    categorySelect = "Sales"
    document.getElementById('selector_Category_Dropdown').innerHTML = ``
    document.getElementById('selected_category').innerHTML = /*html*/`
    <div style="display: flex; align-itmens: center; gap: 10px;"> 
      ${category} 
      <img src="./assets/img/${color}.png"> 
    </div> 
    <img src="assets/img/blue-dropdown-arrow.png" alt="">
   `
  }
  if (category == "Backoffice") {
    categorySelect = "Backoffice"
    document.getElementById('selector_Category_Dropdown').innerHTML = ``
    document.getElementById('selected_category').innerHTML = /*html*/`
    <div style="display: flex; align-itmens: center; gap: 10px;"> 
      ${category} 
      <img src="./assets/img/${color}.png"> 
    </div>
    <img src="assets/img/blue-dropdown-arrow.png" alt="">
    `
  }
}



// renders the Input field for New tasks
function changeInputCategory() {
  document.getElementById('selector_Category_Dropdown').classList.add('d-none');
  document.getElementById('category_selector').innerHTML = /*html*/`
  <div class="inputCategory">
    <div class="inputfield-new-category">
       <input class="input border-bottom" id="newCategoryText" type="text" placeholder="New category name" required>
       <div class="checkAndCrossIconsCategory">
          <img src="./assets/img/blue-cross.png" onclick="exitCategoryInput()" class="blue-cross pointer">
          <img src="./assets/img/devider.png">
          <img src="./assets/img/blue-check.png" onclick="addCategory()" class="blue-check pointer">
       </div>
    </div>
  
  <div id="categoryColorCells"style="margin-top: 10px; margin-left: 20px; ">
  <img onclick="addCategoryColor('grayCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/lightblueCategory.png">
  <img onclick="addCategoryColor('redCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/redCategory.png">
  <img onclick="addCategoryColor('greenCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/greenCategory.png">
  <img onclick="addCategoryColor('orangeCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/orangeCategory.png">
  <img onclick="addCategoryColor('purpleCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/purpleCategory.png">
  <img onclick="addCategoryColor('blueCategory')" class="categoryColor pointer" src="./assets/img/blueCategory.png">
  </div>
  <div id="mistakeReportCategory"></div>
  </div>`;
}

// function for exting the categoryInput by clicking on the cross
function exitCategoryInput() {
  document.getElementById('category_selector').classList.add('d-none');
  document.getElementById('selector_Category_Dropdown').classList.remove('d-none');

}


// defines the Priority and shows the matching img
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



