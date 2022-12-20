// renders the Task-Card on the Board
function generateTodoHTML(element) {
    return /*html*/`
    <div onclick="showDetailWindow(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo" id="${element['id']}">   
      <div class="${element['category']['TaskColor']}">${element['category']['Category']}</div>
      <div class=titleAndText>
          <h4 class="title">${element['title']}</h4>
          <div class="text">${element['description']}</div>
      </div>

      <div class="task-progress">
        <div class="progress-bar">
            <div class="progress-bar-fill" id="fill${element["id"]}"></div>
        </div>
        <span id="fill-text${element["id"]}"> Done</span>
      </div>

      <div class=UserAndPriority>
        <div id="${element['id']}"></div>
        
        <div class="priority"><img src="assets/img/prio-${element['priority']}.png" alt=""></div>
      </div>
    </div>`
}


/**
 * @param {object} currentTask is the selected task to show the details window
 * @returns the html code for rendering the task details window
 */
function detailContentTemplate(currentTask) {
    return /*html*/`
        <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
        <div class="detail-category ${currentTask.category.TaskColor}">
            ${currentTask.category.Category}
        </div>
        <h2 class="detail-title">${currentTask.title}</h2>
        <div class="detail-text">
            ${currentTask.description}
        </div>
        <div class="detail-dueDate"> 
            <span>Due date:</span>  
            <p>${currentTask.dueDate}</p>
        </div>
        <div class="detail-priority">
            <p> Priority:</p> 
            <img src="assets/img/detail-prio-${currentTask.priority}.png" alt="">
        </div>
        <div class="detail-assignedTo"> 
            <p>Assigned To:</p> 
            <div id="detail_assigned_contacts">
                
            </div> 
        </div>
        <img id="edit_button" class="edit-button pointer" src="assets/img/edit-button.png" onclick="changeTask(${currentTask.id})">
        <div class="detail-subTasks" id="detail_subTasks">
        <p>Subtasks:</p>
        </div>
    `;
}


function changeTaskTemplate(currentTask) {
    return /*html*/`
        <form onsubmit="saveChangedTask(${currentTask.id}); return false;" class="editTask">
            <img class="CloseCross-DetailTask pointer" onclick="closeDetailTask()" src="assets/img/group 11.png" alt="">
        
            <div class="input-title">
                <input id="changed_title" type="text" value="${currentTask.title}" autocomplete="off" required>
            </div>

            <div>
                <h4>Description</h4>
                <input class="add-description" id="changed_description" type="text" value="${currentTask.description}">
            </div>

            <div class="input border-bottom" style="display:flex; flex-direction: column; align-items:flex-start;">
                <h4>Due Date</h4>
                <div class= "input-date" id="input-date">
                    <input id="changed_date" class="add-date" value="${currentTask.dueDate}" type="date">
                </div>
            </div>

            <div class="priorityContainer">
                    <div class="priority-urgent" onclick="editSelectedPriority(1)" id="editPriorityUrgent">
                        <p>Urgent</p> 
                        <img id="editPriorityUrgentImg" src="assets/img/prio-urgent.png" alt="">
                    </div>
                <div class="priority-medium" id="editPriorityMedium" onclick="editSelectedPriority(2)">
                    <p>Medium</p> 
                    <img id="editPriorityMediumImg" src="assets/img/prio-medium.png" alt="">
                </div>
                <div class="priority-low" id="editPriorityLow" onclick="editSelectedPriority(3)">
                    <p>Low</p> 
                    <img id="editPriorityLowImg" src="assets/img/prio-low.png" alt="">
                </div>
            </div>

            <div id="user_selector">
                <div class="selector-header" onclick="showUsers(${currentTask.id})">
                    Select contacts to assign
                    <img class="selectorArrow" src="assets/img/blue-dropdown-arrow.png" alt="">
                </div>
            </div>
            <div class="selector-user-dropdown" id="selector_user_dropdown">  
            </div>

            <div class="detail-subTasks" id="edit_subTasks">
              <h4>Subtasks:</h4> 
            </div>


            <div>
                <button class="btn ok">Ok <img src="assets/img/white-check.png" alt=""></button>
            </div>
        </form>
        <button onclick="deleteTask(${currentTask.id})" class="btn trash-button"><img class="trash" src="assets/img/trash.ico" alt=""></button>
    `
}




