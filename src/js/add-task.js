let selectorCategoryIndex = 0;
let taskCategorySelector = [];
let categorySelectedColor;
let selectorcontactIndex = 0;
let userSelect = [];
let taskCategoryFinaly = [];
let prioritySelect = [];
let subTasks = [];
let userSelected = [];

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
  getTasksOfCurrentUser();
}


/**
 * defines the current task and pushes it to the Array alltasks and saves it in the backend
 * @param {*} i - idintifies from where the task is created
 */
async function addToTask(i, taskStatus) {
  if (taskCategoryFinaly.length == 0) {
    document.getElementById('chooseCategory').classList.remove('d-none');
  }
  else if (prioritySelect.length == 0) {
    document.getElementById('chossePriority').classList.remove('d-none');
  }
  else {
    let title = document.getElementById('AddTitle');
    let description = document.getElementById('AddDescription');
    let dueDate = document.getElementById('add-date');

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
      "subTasks": subTasks,
      'status': taskStatus
    };
    currentUserTasks.push(currentTask);
    await backend.setItem('users', JSON.stringify(users));
    prioritySelect = [];
    taskCategoryFinaly = [];
    subTasks = [];
    userSelect = [];
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
  selectorcontactIndex = 0;
}


/**
 * generates the pop up ater a task is created
 */
function ShowTaskAddedPopUp() {
  document.getElementById('task_added_to_board_img').classList.remove('d-none');

  setTimeout(() => {
    document.getElementById('task_added_to_board_img').classList.add('d-none');
  }, 1000);

}


/**
 * renders the AddTask Mask
 * @param {*} i - idintifies from where the task is created
 */
function openAddTaskMask(i, taskStatus) {
  document.getElementById('AddTaskMaskBg').classList.remove('d-none');
  document.getElementById('AddTaskMaskContainer').classList.remove('d-none');
  userSelect = [];
  selectedSubtasks = [];
  let openaddtask = document.getElementById('AddTaskMaskContainer');
  openaddtask.innerHTML = openAddTaskHtml(i, taskStatus);
}


/**
 * renders the subTask in the add task mask
 */
function renderSubTask() {
  document.getElementById("addSubtaskCheckbox").innerHTML = ``;
  for (let subTaskIndex = 0; subTaskIndex < subTasks.length; subTaskIndex++) {
    subTask = subTasks[subTaskIndex];
    document.getElementById("addSubtaskCheckbox").innerHTML += `
      <div id="subTask_${subTaskIndex}" class="subtasks">
        <span>${subTask.title}</span> 
        <img src="./assets/img/trash-blue.png" onclick="deleteSubTaskAdd(${subTaskIndex})" class="subtasks-trash" alt="trash"> 
      </div>
    `;
  }
}


/**
 * deletes the subtask
 * @param {number} subTaskIndex is the index of the subtask in the array subtasks
 */
function deleteSubTaskAdd(subTaskIndex) {
  document.getElementById(`subTask_${subTaskIndex}`).innerHTML = ``;
  subTasks.splice(subTaskIndex, 1);
}


/**
 * pushing new subTask in to the task array
 */
function pushSubtasks() {
  let newSubTaskText = document.getElementById('new_subtask_text').value;
  let emptySubTaskText = document.getElementById('empty_subtask_text');
  emptySubTaskText.innerHTML = '';
  isNewSubTask(newSubTaskText, emptySubTaskText);
}


/**
 * get the content from the new subtask an push it to the array of the task
 * @param {string} newSubTaskText is the content of the new subtask
 * @param {string } emptySubTaskText is the text to show if the con from the new subtask is empty
 */
function isNewSubTask(newSubTaskText, emptySubTaskText) {
  if (newSubTaskText.length > 0) {
    newSubTask = {
      'title': newSubTaskText,
      'done': false
    }
    subTasks.push(newSubTask)
    renderSubTask(newSubTask);
    document.getElementById('new_subtask_text').value = ``
  } else {
    emptySubTaskText.innerHTML = 'Please enter a title for the subtask';
  }
}


/**
 * clear subtask input
 */
function clearSubTasks() {
  if (document.getElementById('new_subtask_text').value != null) {
    document.getElementById("new_subtask_text").value = '';
  }
}


//closes the AddTaskMask new by Seb 30.11
/**
 * closes the AddTaskMask
 * @param {*} i 
 */
function closeAddTaskMask(i) {
  userSelect = [];
  if (i == 1) {
    document.getElementById('AddTaskMaskBg').classList.add('d-none');
    selectorcontactIndex = 0;
  }
  else if (i == 0) {
    document.getElementById('openContactAddtaskBG').classList.add('d-none');
    selectorcontactIndex = 0;
    LFContact();
  }
}


//renders the Drop Down Menu for the User selection
function showUsers(contact) {
  
  let activUserContact = currentUser.contacts;
  document.getElementById('selector_user_dropdown').innerHTML = ``;
  if (selectorcontactIndex == 0) {
    document.getElementById('selector_user_dropdown_contact').innerHTML = ``;
    selectorcontactIndex++;
    for (let i = 0; i < activUserContact.length; i++) {
      document.getElementById('selector_user_dropdown').innerHTML += /*html*/`
      <div onclick="selectedUser('${currentUser.contacts[i]['contactInitials']}', '${currentUser.contacts[i]['contactcolor']}', '${i}', '${currentUser.contacts[i]['contactName']}')" class="selectorCell pointer">
          <div>${activUserContact[i].contactName}</div>
          <div><img id="user_select${currentUser.contacts[i]['contactInitials']}${currentUser.contacts[i]['contactcolor']}${i}${currentUser.contacts[i]['contactName']}" src="./assets/img/userSelect-img.png"></div>
      </div>
      `;
    }
    if (!(contact == 0)) {
    document.getElementById('selector_user_dropdown').innerHTML += `
      <div class="selectorCell pointer" onclick="openAddContact(1)">
        <div>Invite new contact</div>
        <div><img src="./assets/img/newContact-img.png"></div>
      </div>
    `;
    }
    if (contact == 0) {
      let f = savecontactforaddtask;
      let contactintask = currentUser.contacts[f];
      let contactInitials = contactintask['contactInitials'];
      let contactcolor = contactintask['contactcolor'];
      let contactname = contactintask['contactName'];
      
      selectedUser(contactInitials, contactcolor, f, contactname);
  }

    if(userSelect.length > 0){
      for (let o = 0; o < userSelect.length; o++) {
        let contactInitials = userSelect[o]['contactInitials'];
        let contactcolor = userSelect[o]['concolor'];
        let contactname = userSelect[o]['contactname'];
        let id = userSelect[o]['id'];
        selectedUserAdd(contactInitials, contactcolor, id, contactname);
      }
      
    }
    
    
  }
  else {
    document.getElementById('selector_user_dropdown').innerHTML = ``;
    for (let i = 0; i < userSelect.length; i++) {
      document.getElementById('selector_user_dropdown_contact').innerHTML += `
        <div style="background-color:${userSelect[i]['concolor']}" class="user">${userSelect[i]['contactInitials']}</div>
      `;
      
    }
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

function selectedUserAdd(contactInitials, contactcolor, i, contactname){
  document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).classList.add('checked');
    document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).src = 'assets/img/userSelect-selected.png';
}

// getting selected User
function selectedUser(contactInitials, contactcolor, i, contactname) {

  let index = findeContactIndex(contactcolor);
  if (document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).classList.contains('checked')) {
    userSelect.splice(index, 1)
    document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).classList.remove('checked');
    document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).src = 'assets/img/userSelect-img.png';
  }
  else {
    userSelect.push({
      'id': i,
      'contactInitials': contactInitials,
      'concolor': contactcolor,
      'contactname': contactname
    });
    document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).classList.add('checked');
    document.getElementById('user_select' + contactInitials + contactcolor + i + contactname).src = 'assets/img/userSelect-selected.png';
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


/**
 * renders the Drop Down Menu for the categories
 */
function showTaskCategories() {
  if (selectorCategoryIndex == 0) {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    document.getElementById('selector_Category_Dropdown').innerHTML += showNewCategory();
    for (let n = 0; n < currentUser.category.length; n++) {
      let staticCategorys = currentUser.category[n];

      document.getElementById('selector_Category_Dropdown').innerHTML += showExistingCategories(staticCategorys);
    }
    selectorCategoryIndex++;
  } else {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    selectorCategoryIndex--;
  }
};


/**
 * getting selected Category
 * @param {*} category - the newly generated category
 * @param {*} color - the chosen color
 */
function selectedCategory(category, color) {
  taskCategoryFinaly = category;
  taskCategoryColorFinaly = color;
  document.getElementById("category_selector").innerHTML = showSelectCategory(category, color);
  document.getElementById('selector_Category_Dropdown').innerHTML = '';
  selectorCategoryIndex--;
}


/**
 * renders the Input field for categorys
 */
function changeInputCategory() {
  document.getElementById('selector_Category_Dropdown').innerHTML = '';
  document.getElementById('category_selector').innerHTML = showChangeInputCategory();
}


/**
 * renders the drop down field when exiting the category generator
 */
function exitCategoryInput() {
  document.getElementById('category_selector').innerHTML = showExitCategoryInput();
  showTaskCategories();
}


/**
 * adds a chosen color to the newly generated category
 * @param {*} value - defines the clicked color
 */
function addCategoryColor(value) {
  if (document.getElementById("input-new-category").value) {
    categorySelectedColor = value;
    document.getElementById("categoryColorCells").innerHTML = ``;
    document.getElementById("categoryColorCells").innerHTML = /*html*/` <img class="chosen-color" src="./assets/img/${categorySelectedColor}.png" alt="">`;
    document.getElementById('alert_message').innerHTML = '';
  } else {
    document.getElementById('chooseCategory').innerHTML = `Please enter category first!`;
  }
}


/**
 * adds a individual category to the task
 */
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
    document.getElementById("chooseCategory").innerHTML = `Please select color!`;
  }
};


/**
 * defines the Priority and shows the matching img
 * @param {*} i - identifies which priority is clicked
 */
function selectedPriority(i) {
  if (i == 1) {
    prioritySelect = "urgent";
    urgentPrioritySelected();
  }
  if (i == 2) {
    prioritySelect = "medium";
    mediumPrioritySelected()
  }
  if (i == 3) {
    prioritySelect = "low";
    lowPrioritySelected()
  }
}


/**
 * Highlights the button when urgent is selected
 */
function urgentPrioritySelected() {
  document.getElementById("priorityUrgent").classList.add('prio-urgent-selected');
  document.getElementById("priorityMedium").classList.remove('prio-medium-selected');
  document.getElementById("priorityLow").classList.remove('prio-low-selected');
  document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent-white.png';
  document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium.png';
  document.getElementById('priorityLowImg').src = 'assets/img/prio-low.png';
}


/**
 * Highlights the button when medium is selected
 */
function mediumPrioritySelected() {
  document.getElementById("priorityMedium").classList.add('prio-medium-selected');
  document.getElementById("priorityUrgent").classList.remove('prio-urgent-selected');
  document.getElementById("priorityLow").classList.remove('prio-low-selected');
  document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent.png';
  document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium-white.png';
  document.getElementById('priorityLowImg').src = 'assets/img/prio-low.png';
}

/**
 * Highlights the button when low is selected
 */
function lowPrioritySelected() {
  document.getElementById("priorityLow").classList.add('prio-low-selected');
  document.getElementById("priorityUrgent").classList.remove('prio-urgent-selected');
  document.getElementById("priorityMedium").classList.remove('prio-medium-selected');
  document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent.png';
  document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium.png';
  document.getElementById('priorityLowImg').src = 'assets/img/prio-low-white.png';
}