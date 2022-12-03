/**
 * init function will execute wenn page summary.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
async function initsummary() {
    checkUserIsLoggedIn();
    await init();
    showCurrentUserName();
    greetingUser();
    showNumberOfTasksUrgent();
    showNumberOfTasksToDo();
    showNumberOfTasks();
    showNumberOfTasksInProgress();
    showNumberOfTasksAwaitingFeedback();
    showNumberOfTasksDone();
}


/**
 * shows the name of logged in user after the greeting
 */
function showCurrentUserName() {
    let currentUserNameBox = document.getElementById('current_user_name');
    currentUserNameBox.innerHTML = currentUser.name;
}


/**
 * shows the greeting by time of day 
 */
function greetingUser() {
    let userGreetingBox = document.getElementById('user_greeting');
    let hour = new Date().getHours();
    let welcomeTimes = ['Good morning,', 'Good afternoon,', 'Good evening,'];
    let welcomeMessage;
    if (hour < 12) {
        welcomeMessage = welcomeTimes[0];
    } else if (hour < 18) {
        welcomeMessage = welcomeTimes[1];
    } else {
        welcomeMessage = welcomeTimes[2];
    }
    userGreetingBox.innerHTML = welcomeMessage;
}


function showNumberOfTasks() {
    let numberOfTasksContainer = document.getElementById('number_of_tasks');
    let numberOfTasks = currentUser.tasks.length;
    numberOfTasksContainer.innerHTML = numberOfTasks;
}


function showNumberOfTasksUrgent() {
    let numberOfTasksUrgentContainer = document.getElementById('number_of_tasks_urgent');
    let numberOfTasksUrgent = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].priority;
        if (taskStatus == 'urgent') {
            numberOfTasksUrgent = numberOfTasksUrgent + 1;
        }
    }
    numberOfTasksUrgentContainer.innerHTML = numberOfTasksUrgent;
}


function showNumberOfTasksToDo() {
    let numberOfTasksToDoContainer = document.getElementById('number_of_tasks_todo');
    let numberOfTasksToDo = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].status;
        if (taskStatus == 'toDo') {
            numberOfTasksToDo = numberOfTasksToDo + 1;
        }
    }
    numberOfTasksToDoContainer.innerHTML = numberOfTasksToDo;
}


function showNumberOfTasksInProgress() {
    let numberOfTasksInProgressContainer = document.getElementById('number_of_tasks_in_progress');
    let numberOfTasksInProgress = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].status;
        if (taskStatus == 'inProgress') {
            numberOfTasksInProgress = numberOfTasksInProgress + 1;
        }
    }
    numberOfTasksInProgressContainer.innerHTML = numberOfTasksInProgress;
}


function showNumberOfTasksAwaitingFeedback() {
    let numberOfTasksAwaitingFeedbackContainer = document.getElementById('number_of_tasks_awaiting_feedback');
    let numberOfTasksAwaitingFeedback = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].status;
        if (taskStatus == 'awaitingFeedback') {
            numberOfTasksAwaitingFeedback = numberOfTasksAwaitingFeedback + 1;
        }
    }
    numberOfTasksAwaitingFeedbackContainer.innerHTML = numberOfTasksAwaitingFeedback;
}


function showNumberOfTasksDone() {
    let numberOfTasksAwaitingFeedbackContainer = document.getElementById('number_of_tasks_done');
    let numberOfTasksDone = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].status;
        if (taskStatus == 'done') {
            numberOfTasksDone = numberOfTasksDone + 1;
        }
    }
    numberOfTasksAwaitingFeedbackContainer.innerHTML = numberOfTasksDone;
}