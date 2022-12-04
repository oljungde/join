let j = 0;
let selectorCategoryIndex = 0;
let taskCategorySelector = [];
let categorySelectedColor;


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
async function addToTask(i) {
  let title = document.getElementById('AddTitle');
  let description = document.getElementById('AddDescription');
  let dueDate = document.getElementById('add-date');

  let currentTask = {
    "id": currentUserTasks.length,
    "category": {
      Category: taskCategoryFinaly,
      TaskColor: taskCategoryColorFinaly,
    },
    "title": title.value,
    "description": description.value,
    "dueDate": dueDate.value,
    "priority": prioritySelect,
    "user": userSelect,
    'usercolor': concolor,
    'status': 'toDo'
  };
  currentUserTasks.push(currentTask);
  await backend.setItem('users', JSON.stringify(users));
  if (i == 0) {

    ShowTaskAddedPopUp()

    setTimeout(() => {
      window.location.href = './board.html';
    }, 2000);

    filterTasksByStatus();
    // updateHTML();

  }
  else if (i == 1) {

    ShowTaskAddedPopUp()


    setTimeout(() => {
      let close = document.getElementById('AddTaskMaskBg');
      close.classList.add('d-none');
    }, 2000);

    filterTasksByStatus();
    // updateHTML();

  }
}

function ShowTaskAddedPopUp() {
  document.getElementById('task_added_to_board_img').classList.remove('d-none');

  setTimeout(() => {
    document.getElementById('task_added_to_board_img').classList.add('d-none');
  }, 1000);

}


//renders the AddTask Mask new by Seb 30.11!!
function openAddTaskMask(i) {
  document.getElementById('AddTaskMaskBg').classList.remove('d-none');
  document.getElementById('AddTaskMaskContainer').classList.remove('d-none');

  let openaddtask = document.getElementById('AddTaskMaskContainer');
  openaddtask.innerHTML = openAddTaskHtml(i);
}
// new by Seb 30.11!!
function openAddTaskHtml(i) {
  return /*html*/`
  <form class="addTaskForm" onsubmit="addToTask(${i}); return false; ">
        <img class="CloseCross" onclick="closeAddTaskMask(${i})" src="assets/img/group 11.png" alt="">
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


function showDropdown() {
  document.getElementById('selected_category').classList.toggle("option-wrapper");
  document.getElementById('selected_category').classList.toggle("d-none");

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


//closes the AddTaskMask new by Seb 30.11
function closeAddTaskMask(i) {
  if (i == 1) {
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
  }
  else if (i == 0) {
    document.getElementById('openContactAddtaskBG').classList.add('d-none');
  }
}


//renders the Drop Down Menu for the User selection
function showUsers() {
  let activUserContact = currentUser.contacts;
  document.getElementById('selector_user_dropdown').innerHTML = ``;
  for (let i = 0; i < activUserContact.length; i++) {
    document.getElementById('selector_user_dropdown').innerHTML += /*html*/`
    <div onclick="selectedUser('${currentUser.contacts[i]['contactInitials']}', '${currentUser.contacts[i]['contactcolor']}', '${i}')" class="selectorCell pointer">
        <div>${activUserContact[i].contactName}</div>
        <div><img id="user_select${i}${currentUser.contacts[i]['contactInitials']}" src="./assets/img/userSelect-img.png"></div>
    </div>
    `;

  }
  document.getElementById('selector_user_dropdown').innerHTML += /*html*/`  
  <div onclick="selectedUser()" class="selectorCell pointer" >
      <div>Invite new contact</div>
      <img src="./assets/img/newContact-img.png">
  </div>
  `;




}


// getting selected User
function selectedUser(contactInitials, contactcolor, i) {
  userSelect = contactInitials;
  concolor = contactcolor;
  document.getElementById('user_select' + i + contactInitials).src = 'assets/img/userSelect-selected.png';
  // if (user == "Invite new contact") {
  //   document.getElementById('selector_user_dropdown').classList.add('d-none');
  //   document.getElementById("user_selector").innerHTML = /*html*/`
  //   <div class="inputUser">
  //      <div class="inputfield-new-user">
  //        <input class="input border-bottom" id="newUserText" type="text" placeholder="Contact email" required>
  //        <div class="checkAndCrossIconsCategory">
  //         <img src="./assets/img/blue-cross.png" onclick="exitCategorySelector()" class="blue-cross pointer">
  //         <img src="./assets/img/devider.png">
  //         <img src="./assets/img/blue-check.png" onclick="addCategory()" class="blue-check pointer">
  //      </div>
  //   </div>
  //   `;
  // }
  // if (user == "Maximillian Vogel") {
  //   userSelect = "Maximillian Vogel";

  // }
  // if (user == "You") {
  //   userSelect = "You";
  //   document.getElementById('user_select').src = 'assets/img/userSelect-selected.png';
  // }
}


// function for exting the categorySelector by clicking on the cross
function exitCategorySelector() {
  document.getElementById('user_selector').classList.add('d-none');
  document.getElementById('selector_user_dropdown').classList.remove('d-none');

}



// renders the Drop Down Menu for the categories
function showTaskCategories() {
  let staticCategorys = [
    { taskCategory: 'New category', taskColor: 'lightblueCategory', cagtegoryID: 0 },
    { taskCategory: 'Sales', taskColor: 'purpleCategory', cagtegoryID: 1 },
    { taskCategory: 'Backoffice', taskColor: 'mintCategory', cagtegoryID: 2 },
  ];

  taskCategorySelector = JSON.parse(localStorage.getItem('taskCategory')) || [];

  if (selectorCategoryIndex == 0) {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    for (let n = 0; n < staticCategorys.length; n++) {

      document.getElementById('selector_Category_Dropdown').innerHTML += `  
      <div onclick="selectedCategory('${staticCategorys[n].taskCategory}','${staticCategorys[n].taskColor}')" class="selectorCell pointer">
      <div>${staticCategorys[n]['taskCategory']}</div>
      <div><img src="./assets/img/${staticCategorys[n].taskColor}.png" </div>
        </div>
      `;

    }


    for (let y = 0; y < taskCategorySelector.length; y++) {
      document.getElementById('selector_Category_Dropdown').innerHTML += `
    <div onclick="selectedCategory('${taskCategorySelector[y].taskCategory}','${taskCategorySelector[y].taskColor}')" class="selectorCell pointer">
            <div>${taskCategorySelector[y].taskCategory}</div>
            <div class="selectorCellColor"><img src="./assets/img/${taskCategorySelector[y].taskColor}.png"/></div>
            </div>
          </div>
    `;
    }
    selectorCategoryIndex++;
  } else {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    selectorCategoryIndex--;
  }
};


// getting selected Category
function selectedCategory(category, color) {
  if (category == "New category") {
    changeInputCategory();
  }
  else {
    taskCategoryFinaly = category;
    taskCategoryColorFinaly = color;
    document.getElementById("category_selector").innerHTML = /*html*/`
    <div class="selector-header pointer" onclick="showTaskCategories()" id="selected_category">
    <div class="selected">
    ${category}
    <img src="./assets/img/${color}.png" />
    </div>
    <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt=""></div>
    <div id="selector_Category_Dropdown">
      <!-- Rendering selector content here -->
    </div>`;


  }
}


// renders the Input field for New tasks
function changeInputCategory() {
  document.getElementById('selector_Category_Dropdown').innerHTML = '';
  document.getElementById('category_selector').innerHTML = /*html*/`
  <div class="inputCategory">
    <div class="inputfield-new-category">
       <input class="input border-bottom" id="input-new-category" type="text" placeholder="New category name" required>
       <div class="checkAndCrossIconsCategory">
          <img src="./assets/img/blue-cross.png" onclick="exitCategoryInput()" class="blue-cross pointer">
          <img src="./assets/img/devider.png">
          <img src="./assets/img/blue-check.png" onclick="addCategory()" id="input-new-category" class="blue-check pointer">
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
  <div id="alert_message"></div>
  </div>`;
}

function exitCategoryInput() {
  document.getElementById('category_selector').innerHTML = `
  <div id="selected_category" class="selector-header pointer" onclick="showTaskCategories()">Select task category <img class="selectorArrow" src="./assets/img/selectorArrow.png"></div>
  <div class="selector-Category-Dropdown" id="selector_Category_Dropdown">
    <!-- Rendering selector content here -->
  </div>`;
  showTaskCategories();
}

function addCategoryColor(value) {
  if (document.getElementById("input-new-category").value) {
    categorySelectedColor = value;
    document.getElementById("categoryColorCells").innerHTML = ``;
    document.getElementById("categoryColorCells").innerHTML = /*html*/`
    <img class="chosen-color" src="./assets/img/${categorySelectedColor}.png" alt="">
    `;
    document.getElementById('alert_message').innerHTML = '';
  } else {
    document.getElementById('alert_message').innerHTML = `Please enter category first!`;
  }
}



// adds a individual category to the task
function addCategory() {
  newCategory = document.getElementById("input-new-category").value;
  if (categorySelectedColor && newCategory) {
    taskCategorySelector = JSON.parse(localStorage.getItem("taskCategory")) || [];
    taskCategorySelector.push({
      taskCategory: newCategory,
      taskColor: categorySelectedColor,
    });
    localStorage.setItem("taskCategory", JSON.stringify(taskCategorySelector));
    exitCategoryInput()
    showTaskCategories()
  } else {
    document.getElementById("alert_message").innerHTML = `Please select color!`;
  }
};

/*
// function for exting the categoryInput by clicking on the cross
function exitCategoryInput() {
  document.getElementById('category_selector').classList.add('d-none');
  document.getElementById('selector_Category_Dropdown').classList.remove('d-none');

}
*/

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



