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
    passwordInputIconChange();
    passwordConfirmIconChange();
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
 * check if the input field length with the id user_password on index.html is longer as 0 letters and change the icon on end of input
 */
function passwordInputIconChange() {
    let userPasswordInput = document.getElementById('user_password');
    let passwordIcon = document.getElementById('user_password_icon');
    let passwordIconHidden = document.getElementById('user_password_hidden');
    userPasswordInput.addEventListener('input', function () {
        console.log('geändert');
        if (userPasswordInput.value.length > 0) {
            passwordIcon.classList.add('display-none');
            passwordIconHidden.classList.remove('display-none');
        } else {
            passwordIcon.classList.remove('display-none');
            passwordIconHidden.classList.add('display-none');
        }
    })
}


function passwordConfirmIconChange() {
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    let passwordConfirmIcon = document.getElementById('user_password_confirm_icon');
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    userPasswordConfirmInput.addEventListener('input', function () {
        console.log('geändert');
        if (userPasswordConfirmInput.value.length > 0) {
            passwordConfirmIcon.classList.add('display-none');
            passwordConfirmIconHidden.classList.remove('display-none');
        } else {
            passwordConfirmIcon.classList.remove('display-none');
            passwordConfirmIconHidden.classList.add('display-none');
        }
    })
}


/**
 * makes the password input readable
 */
function makePasswordVisible() {
    let passwordIconHidden = document.getElementById('user_password_hidden');
    let passwordIconVisible = document.getElementById('user_password_visible');
    let userPasswordInput = document.getElementById('user_password');
    passwordIconHidden.classList.add('display-none');
    passwordIconVisible.classList.remove('display-none');
    userPasswordInput.type = 'text';
}


/**
 * makes the password input unreadable
 */
function makePasswordUnvisible() {
    let passwordIconHidden = document.getElementById('user_password_hidden');
    let passwordIconVisible = document.getElementById('user_password_visible');
    let userPasswordInput = document.getElementById('user_password');
    passwordIconHidden.classList.remove('display-none');
    passwordIconVisible.classList.add('display-none');
    userPasswordInput.type = 'password';
}


function makePasswordConfirmVisible() {
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    let passwordConfirmIconVisible = document.getElementById('user_password_confirm_visible');
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    passwordConfirmIconHidden.classList.add('display-none');
    passwordConfirmIconVisible.classList.remove('display-none');
    userPasswordConfirmInput.type = 'text';
}


/**
 * makes the password input unreadable
 */
function makePasswordConfirmUnvisible() {
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    let passwordConfirmIconVisible = document.getElementById('user_password_confirm_visible');
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    passwordConfirmIconHidden.classList.remove('display-none');
    passwordConfirmIconVisible.classList.add('display-none');
    userPasswordConfirmInput.type = 'password';
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