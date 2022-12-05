setURL('https://gruppe-377.developerakademie.net/smallest_backend_ever');
let currentUserEmail = localStorage.getItem('userLoggedInEmail');
let users = [];
let currentUser;
let currentUserTasks = [];
let allTasks = [];
let subTasks = [];;


/**
 * init function will be executed when loading the page, includes heder an sidebar navigation, and get several arrays from the backend
 */
async function init() {
    await includeHTML();
    await downloadFromServer();
    users = await JSON.parse(backend.getItem('users')) || [];
    getCurrentUser();
}


/**
 * checks if the user is logged in
 */
function checkUserIsLoggedIn() {
    checkRememberMeStatus();
    let loginStatus = sessionStorage.getItem('loggedIn');
    if (loginStatus == 'true' && (window.location.pathname == '/src/index.html' || window.location.pathname == '/src/')) {
        window.location.href = './summary.html';
    } else if (loginStatus == 'true' && window.location.pathname == '/sign-up.html') {
        window.location.href = './summary.html';
    } else if (loginStatus == null && window.location.pathname == '/src/sign-up.html') {
        // window.location.href = './sign-up.html';
    }
    else if (loginStatus == null && window.location.pathname != '/src/index.html') {
        window.location.href = './index.html';
    }
}


/**
 * get the data from the user who is logged in
 */
function getCurrentUser() {
    currentUser = users.find(user => user.email == currentUserEmail);
    console.log(currentUser);
}


/**
 * logs the user out, deletes the session storage key loggedIn and the local storage key remeberMe
 * user will redirect to log in page index.html
 */
function logout() {
    localStorage.removeItem('userLoggedInEmail', '');
    localStorage.removeItem('userLoggedInName', '');
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
 * shows the popup menu to log out and change the user image
 */
function showMenu() {
    let noMenuShow = document.getElementById('no_menu_show');
    let menuShow = document.getElementById('menu_show');
    let menu = document.getElementById('header_nav_popup');
    noMenuShow.classList.add('display-none');
    menuShow.classList.remove('display-none');
    menu.classList.add('show-menu')
}


/**
 * show aktive page in sidebar navigation
 */
function setNavLinkActive() {
    let navLinks = document.getElementById('sidebar-navigation').getElementsByTagName('a');
    for (let i = 0; i < navLinks.length; i++)
        if (document.location.href.indexOf(navLinks[i].href) >= 0) {
            navLinks[i].classList.add('active');
        }
}


/**
 * hides the popup Menu to log out an change the user image
 */
function hideMenu() {
    let noMenuShow = document.getElementById('no_menu_show');
    let menuShow = document.getElementById('menu_show');
    let menu = document.getElementById('header_nav_popup');
    noMenuShow.classList.remove('display-none');
    menuShow.classList.add('display-none');
    menu.classList.remove('show-menu')
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
        document.getElementById('navigation_summary').classList.add('bg-blue')
        document.getElementById('navigation_board').classList.remove('bg-blue')
        document.getElementById('navigation_addTask').classList.remove('bg-blue')
        document.getElementById('navigation_contacts').classList.remove('bg-blue')
        document.getElementById('navigation_legal').classList.remove('bg-blue')
    }
    if (bar == 2) {
        document.getElementById('navigation_summary').classList.remove('bg-blue')
        document.getElementById('navigation_board').classList.add('bg-blue')
        document.getElementById('navigation_addTask').classList.remove('bg-blue')
        document.getElementById('navigation_contacts').classList.remove('bg-blue')
        document.getElementById('navigation_legal').classList.remove('bg-blue')
    }
    if (bar == 3) {
        document.getElementById('navigation_summary').classList.remove('bg-blue')
        document.getElementById('navigation_board').classList.remove('bg-blue')
        document.getElementById('navigation_addTask').classList.add('bg-blue')
        document.getElementById('navigation_contacts').classList.remove('bg-blue')
        document.getElementById('navigation_legal').classList.remove('bg-blue')
    }
    if (bar == 4) {
        document.getElementById('navigation_summary').classList.remove('bg-blue')
        document.getElementById('navigation_board').classList.remove('bg-blue')
        document.getElementById('navigation_addTask').classList.remove('bg-blue')
        document.getElementById('navigation_contacts').classList.add('bg-blue')
        document.getElementById('navigation_legal').classList.remove('bg-blue')
    }
    if (bar == 5) {
        document.getElementById('navigation_summary').classList.remove('bg-blue')
        document.getElementById('navigation_board').classList.remove('bg-blue')
        document.getElementById('navigation_addTask').classList.remove('bg-blue')
        document.getElementById('navigation_contacts').classList.remove('bg-blue')
        document.getElementById('navigation_legal').classList.add('bg-blue')
    }
}
// adding class bg-blue to the selected link
function BgSelectedNav(element) {
    document.getElementById(`${element}`).classList.add('bg-blue');
}

