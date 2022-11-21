setURL('https://gruppe-377.developerakademie.net/smallest_backend_ever');
let users = [];
let allTasks = []


/**
 * init function will be executed when loading the page, includes heder an sidebar navigation, and get several arrays from the backend
 */
async function init() {
    await includeHTML();
    await downloadFromServer();
    users = await JSON.parse(backend.getItem('users')) || [];
    allTasks = await JSON.parse(backend.getItem('allTasks')) || [];
    passwordInputFocus();
    passwordInputUnfocus();
}


/**
 * checks if the user is logged in
 */
function checkUserIsLoggedIn() {
    checkRememberMeStatus();
    let loginStatus = sessionStorage.getItem('loggedIn');
    if (loginStatus != 'true') {
        window.location.href = "./index.html";
    }
}


/**
 * check if the input field with the id user_password on index.html ist focused to change the icon on end of input
 */
function passwordInputFocus() {
    document.getElementById('user_password').addEventListener('focus', function () {
        console.log('focus');
        let passwordIcon = document.getElementById('user_password_icon');
        passwordIcon.src = './assets//img/password-hidden.png'
    })
}


/**
 * check if the input field with the id user_password on index.html ist unfocused to change the icon on end of input
 */
function passwordInputUnfocus() {
    document.getElementById('user_password').addEventListener('focusout', function () {
        console.log('unfocus');
        let passwordIcon = document.getElementById('user_password_icon');
        passwordIcon.src = './assets//img/login-password.png'
    })
}


/**
 * logs the out, deletes the session storage key loggedIn and the local storage key remeberMe
 * user will redirect to log in page index.html
 */
function logout() {
    sessionStorage.removeItem('loggedIn');
    localStorage.removeItem('rememberMe');
    window.location.href = './index.html';
}


/**
 * checks the remember me status of the user and log the in if the remember me status true
 */
function checkRememberMeStatus() {
    let rememberMeStatus = localStorage.getItem('rememberMe');
    if (rememberMeStatus == 'true') {
        sessionStorage.setItem('loggedIn', 'true')
    }
}


/**
 * function to include html files e.g. header.html and sidebar-navigation.html
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


// defining which link was clicked and giving the function BgSelectedNav the matching id
function changeNavbarBgColor(bar) {

    if (bar == 1) {
        BgSelectedNav('navigation_summary');
    }
    if (bar == 2) {
        BgSelectedNav('navigation_board');
    }
    if (bar == 3) {
        BgSelectedNav('navigation_addTask');
    }
    if (bar == 4) {
        BgSelectedNav('navigation_contacts');
    }
    if (bar == 5) {
        BgSelectedNav('navigation_legal');
    }
}


// adding class bg-blue to the selected link
function BgSelectedNav(element) {
    document.getElementById(`${element}`).classList.add('bg-blue');
}