setURL('https://gruppe-377.developerakademie.net/smallest_backend_ever');
let users = [];
let allTasks = []

async function init() {
    await includeHTML();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}


function checkUserIsLoggedIn() {
    let loginStatus = localStorage.getItem('loggedIn');
    if (loginStatus != 'true') {
        window.location.href = "./index.html";
    }
}


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