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
  
          <h4>Category</h4>  <span class="d-none" id="chooseCategory">Please choose a Category</span>      
          <div id="category_selector">
             <div id="selected_category" class="selector-header" onclick="showTaskCategories()">
                Select task category
                <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
             </div>
          </div>
          <div class="selector-Category-Dropdown" id="selector_Category_Dropdown">  </div>
            <span id="chossePriority" class="d-none">Please choose a Priority</span>
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
            <img src="./assets/img/blue-check.png" onclick="pushSubtasks()" class="blue-check pointer">
         </div>
      </div>
         </div>
         <div class="new-Subtasks" id="addSubtaskCheckbox">
  
         </div>
    </form>
      `;
  }


function showSelectCategory(category, color){
    return /*html*/`
    <div class="selector-header pointer" onclick="showTaskCategories()" id="selected_category">
    <div class="selected">
    ${category}
    <img src="./assets/img/${color}.png" />
    </div>
    <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt=""></div>
    `;  
  }


  function showNewCategory(){
    return `
    <div onclick="changeInputCategory()" class="selectorCell pointer">
       <div>New category</div>
         <div class="selectorCellColor"><img src=""></div>
       </div>
    </div>
    `;
  }


  function showExistingCategories(staticCategorys){
    return `  
    <div onclick="selectedCategory('${staticCategorys['taskCategory']}','${staticCategorys['taskColor']}')" class="selectorCell pointer">
      <div>${staticCategorys['taskCategory']}</div>
      <div><img src="./assets/img/${staticCategorys['taskColor']}.png" </div>
    </div>
    `;
  }
  

  function showChangeInputCategory(){
    return /*html*/`
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
    <img onclick="addCategoryColor('lightblueCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/lightblueCategory.png">
    <img onclick="addCategoryColor('redCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/redCategory.png">
    <img onclick="addCategoryColor('greenCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/greenCategory.png">
    <img onclick="addCategoryColor('orangeCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/orangeCategory.png">
    <img onclick="addCategoryColor('purpleCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/purpleCategory.png">
    <img onclick="addCategoryColor('blueCategory')" class="categoryColor pointer" src="./assets/img/blueCategory.png">
    </div>
    <div id="alert_message"></div>
    </div>`;
  }
  