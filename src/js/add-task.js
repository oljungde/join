let j = 0;
let selectorCategoryIndex = 0;
let taskCategorySelector = [];
let categorySelectedColor;
let selectorcontactIndex = 0;
let userSelect = [];


/**
 * init function will execute wenn page add-task.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
async function initAddTask() {
  await init();
  setNavLinkActive();
  checkUserIsLoggedIn();
  imgheader();
}

//defines the current task and pushes it to the Array alltasks and saves it in the backend 
async function addToTask(i) {
  let title = document.getElementById('AddTitle');
  let description = document.getElementById('AddDescription');
  let dueDate = document.getElementById('add-date');
  selectorcontactIndex--;

  let currentTask = {
    "id": (new Date().getTime() * Math.random()).toFixed(0),
    "category": {
      Category: taskCategoryFinaly,
      TaskColor: taskCategoryColorFinaly,
    },
    "title": title.value,
    "description": description.value,
    "dueDate": dueDate.value,
    "priority": prioritySelect,
    "user": userSelect,
    'status': 'toDo'
  };
  currentUserTasks.push(currentTask);
  await backend.setItem('users', JSON.stringify(users));
  setIdOneHigher();
  if (i == 0) {
    window.location.href = './board.html';
    filterTasksByStatus();
  }
  else if (i == 1) {
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
    ShowTaskAddedPopUp();
    filterTasksByStatus();
  }
}

// adds 1 to the id for adding tasks
function setIdOneHigher() {
  if (j >= 0) {
    j++;
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
  userSelect = [];
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
             <div class="selector-header"  onclick="showUsers(${i})">
                Select contacts to assign
                <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
              </div>
        </div>
        <div class="selector-user-dropdown" id="selector_user_dropdown">  </div>

        <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
           <h4>Due Date</h4>
           <div class= "input-date" id="input-date">
             <input id="add-date" background: url(./assets/img/data.png) no-repeat scroll 7px 7px; class="add-date" placeholder="dd/mm/yy" type="date"   required>
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


//closes the AddTaskMask new by Seb 30.11
function closeAddTaskMask(i) {
  if (i == 1) {
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
  }
  else if (i == 0) {
    document.getElementById('openContactAddtaskBG').classList.add('d-none');
    LFContact();
  }
}


//renders the Drop Down Menu for the User selection
function showUsers(contact) {
  userSelect = [];
  
  let activUserContact = currentUser.contacts;
  document.getElementById('selector_user_dropdown').innerHTML = ``;
  if (selectorcontactIndex == 0) {
    for (let i = 0; i < activUserContact.length; i++) {
      document.getElementById('selector_user_dropdown').innerHTML += /*html*/`
      <div onclick="selectedUser('${currentUser.contacts[i]['contactInitials']}', '${currentUser.contacts[i]['contactcolor']}', '${i}')" class="selectorCell pointer">
          <div>${activUserContact[i].contactName}</div>
          <div><img id="user_select${currentUser.contacts[i]['contactInitials']}${currentUser.contacts[i]['contactcolor']}${i}" src="./assets/img/userSelect-img.png"></div>
      </div>
      `;
    }
    for (let filteredTasksIndex = 0; filteredTasksIndex < filteredTasks.length; filteredTasksIndex++) {
    let currentTask = filteredTasks[filteredTasksIndex];
    if (contact == 0) {
      let f = savecontactforaddtask;
      let contactintask = currentUser.contacts[f];
      let contactInitials = contactintask['contactInitials'];
      let contactcolor = contactintask['contactcolor'];
      selectedUser(contactInitials, contactcolor, f)
    }
    if (currentTask.id == contact) {
      for (let u = 0; u < currentTask.user.length; u++) {
          let user = currentTask.user[u];
          let contactInitials = user['contactInitials'];
          let contactcolor = user['concolor'];
          let id = user['id'];
          selectedUser(contactInitials, contactcolor, id);
      }
    }
    
  }
  selectorcontactIndex++;
  }
  else {
    document.getElementById('selector_user_dropdown').innerHTML = ``;
    selectorcontactIndex--;
  }

}

function LFContact() {
  let f = savecontactforaddtask;
  let contactintask = currentUser.contacts[f];

  let contactcolor = contactintask['contactcolor'];
  let index = findeContactIndex(contactcolor);
  userSelect.splice(index, 1);
  document.getElementById('selector_user_dropdown').innerHTML = ``;
}

// getting selected User
function selectedUser(contactInitials, contactcolor, i) {
  let index = findeContactIndex(contactcolor);
  if (document.getElementById('user_select' + contactInitials + contactcolor + i).classList.contains('checked')) {
    userSelect.splice(index, 1)
    document.getElementById('user_select' + contactInitials + contactcolor + i).classList.remove('checked');
    document.getElementById('user_select' + contactInitials + contactcolor + i).src = 'assets/img/userSelect-img.png';
  }
  else {
    userSelect.push({
      'id': i,
      'contactInitials': contactInitials,
      'concolor': contactcolor
    });
    document.getElementById('user_select' + contactInitials + contactcolor + i).classList.add('checked');
    document.getElementById('user_select' + contactInitials + contactcolor + i).src = 'assets/img/userSelect-selected.png';
  }
}



function findeContactIndex(contactcolor) {
  let index;
  for (let i = 0; i < userSelect.length; i++) {
    if (userSelect[i].concolor == contactcolor)
      index = i;
  }
  return index;
}



// renders the Drop Down Menu for the categories
function showTaskCategories() {
  if (selectorCategoryIndex == 0) {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    document.getElementById('selector_Category_Dropdown').innerHTML += `
    <div onclick="changeInputCategory()" class="selectorCell pointer">
            <div>New category</div>
            <div class="selectorCellColor"><img src=""></div>
            </div>
          </div>
    `;
    for (let n = 0; n < currentUser.category.length; n++) {
        let staticCategorys = currentUser.category[n];
      
      document.getElementById('selector_Category_Dropdown').innerHTML += `  
      <div onclick="selectedCategory('${staticCategorys['taskCategory']}','${staticCategorys['taskColor']}')" class="selectorCell pointer">
      <div>${staticCategorys['taskCategory']}</div>
      <div><img src="./assets/img/${staticCategorys['taskColor']}.png" </div>
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
  
    taskCategoryFinaly = category;
    taskCategoryColorFinaly = color;
    document.getElementById("category_selector").innerHTML = /*html*/`
    <div class="selector-header pointer" onclick="showTaskCategories()" id="selected_category">
    <div class="selected">
    ${category}
    <img src="./assets/img/${color}.png" />
    </div>
    <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt=""></div>
    `;
    document.getElementById('selector_Category_Dropdown').innerHTML = '';
    selectorCategoryIndex--;
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
  <div id="selected_category" class="selector-header pointer" onclick="showTaskCategories()">Select task category <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png"></div>
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
async function addCategory() {
  newCategory = document.getElementById("input-new-category").value;
  if (categorySelectedColor && newCategory) {
    currentUser.category.push({
      'taskCategory': newCategory,
      'taskColor': categorySelectedColor
    });
    await backend.setItem('users', JSON.stringify(users));
    console.log(currentUser);
    exitCategoryInput();
    showTaskCategories();
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