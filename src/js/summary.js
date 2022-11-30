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