let j = 0;


//defines the current task and pushes it to the Array alltasks and saves it in the backend 
async function addToTask() {
  let title = document.getElementById('AddTitle');
  let description = document.getElementById('AddDescription');
  let user = document.getElementById('AddUser');

  let currentTask = {
    "id": j,
    "title": title.value,
    "description": description.value,
    "priority": prioritySelect,
    'status': 'toDo'
  };

  allTasks.push(currentTask);
  await backend.setItem("allTasks", JSON.stringify(allTasks));
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
           <button class="btn">Create Task</button>
         </div>
    
        <div class="input border-bottom">
            <input id="AddTitle" type="text" placeholder="Ener a title" autocomplete="off" required>
        </div>

        <div id="category_selector">
             <div class="selector-header" onclick="showUsers()">
                Select contacts to assign
                <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
              </div>
        </div>

        <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
           <p>Due Date</p>
           <input type="date">
        </div>

        <h3>Category</h3>        
        <div id="category_selector">
           <div class="selector-header" onclick="showTaskCategories()">
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
         <h3>Description</h3>
         <input class="add-description" id="AddDescription" type="text" placeholder="Enter a Description">
       </div>
    
       <input type="text" placeholder="Add a new subtask">
  </form>
    `;
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
  <div onclick="selectedCategory('${staticCategorys[0].taskCategory}','${staticCategorys[0].taskColor}')" class="selectorCell">
  <div>${staticCategorys[0]['taskCategory']}</div>
    </div>
  `;

  for (let y = 1; y < staticCategorys.length; y++) {
    document.getElementById('selector_Category_Dropdown').innerHTML += `
    <div onclick="selectedCategory('${staticCategorys[y].taskCategory}','${staticCategorys[y].taskColor}')" class="selectorCell">
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
  } else {
    CategoryForTask = category;
    CategoryColorForTask = color;
    document.getElementById("selectorCategory").innerHTML = /*html*/`
    <div class="selectorHeader pointer" onclick="renderingTaskCategorySelector()">
       <div class="selected">
          ${category}
          <img src="./assets/img/categoryColors/${color}.png" />
       </div>
       <img class="selectorArrow" src="./assets/img/selectorArrow.png">
      </div>
      `;
  }
}


// renders the Input field for New tasks
function changeInputCategory() {
  document.getElementById('selector_Category_Dropdown').innerHTML = /*html*/`
  <div class="inputCategory">
  <input class="input border-bottom" id="newCategoryText" type="text" placeholder="New category name" required>
  <div class="checkAndCrossIconsCategory">
    <img src="./assets/img/blue-cross.png" onclick="rechangeCategoryInput()" class="blue-cross">
        <img src="./assets/img/devider.png">
        <img src="./assets/img/blue-check.png" onclick="addCategory()" class="blue-check">
      </div>
  
  <div id="categoryColorCells"style="margin-top: 10px; margin-left: 20px; ">
  <img onclick="addCategoryColor('grayCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/lightblueCategory.png">
  <img onclick="addCategoryColor('redCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/redCategory.png">
  <img onclick="addCategoryColor('greenCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/greenCategory.png">
  <img onclick="addCategoryColor('orangeCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/orangeCategory.png">
  <img onclick="addCategoryColor('purpleCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/purpleCategory.png">
  <img onclick="addCategoryColor('blueCategory')" class="categoryColor" src="./assets/img/blueCategory.png">
  </div>
  <div id="mistakeReportCategory"></div>
  </div>`;
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


//closes the AddTaskMask
function closeAddTaskMask() {
  document.getElementById('AddTaskMaskBg').classList.add('d-none');
}

