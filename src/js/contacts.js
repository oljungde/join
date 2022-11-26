let addTasks = [];
let lettertask = [];

async function initContacts() {
    checkUserIsLoggedIn();
    await init();
}


/**
 * opens a window to add contacts
 * 
 */
function openAddContact() {
    let addcontact = document.getElementById('opencontact');
    addcontact.classList.remove('d-none');
    addcontact.innerHTML = '';
    addcontact.innerHTML = addNewContactHtml();
}

/**
 * close a window to add contacts
 * 
 */
function closeAddContact() {
    let addcontact = document.getElementById('opencontact');
    addcontact.classList.add('d-none');
    addcontact.innerHTML = '';

}

/**
 * pulls them out of the input and puts them in a json
 * 
 */
function createContact() {
    let smallName = document.getElementById('contactName').value;
    let contactEmail = document.getElementById('contactEmail').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let contactName = smallName.charAt(0).toUpperCase() + smallName.slice(1);
    let firstName = contactName.charAt(0);
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let contactTask = {
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactNumber': contactNumber,
        'contactletter': firstName,
        'contactcolor': randomColor
    };
    fillAllTasks(contactTask, contactName,);
}

/**
 * pushes the json into an array
 * 
 * @param {*} contactTask 
 */
function fillAllTasks(contactTask, contactName,) {
    addTasks.push(contactTask);
    addTasks.sort((a, b) => a.contactName.localeCompare(b.contactName));
    let letter = contactName.charAt(0);
    closeAddContact();
    if (lettertask.includes(letter)) {
        clearContactBar();
    }
    else {
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML = '';
        lettertask.push(letter);
        lettertask.sort();
        createContactBar();
        contactChild();
    }
}

function clearContactBar() {
    for (let i = 0; i < lettertask.length; i++) {
        let clear = lettertask[i];
        let contactSmall = document.getElementById(clear)
        while (contactSmall.lastChild) {
            contactSmall.removeChild(contactSmall.lastChild);
        }
    }
    contactChild();
}

function contactChild() {
    for (let index = 0; index < addTasks.length; index++) {
        let i = addTasks[index];
        let l = addTasks[index]['contactletter'];
        let n = addTasks[index]['contactName'];
        let e = addTasks[index]['contactEmail'];
        let m = addTasks[index]['contactNumber'];
        let c = addTasks[index]['contactcolor'];
        let lettersFB = n.match(/\b(\w)/g).join('');
        let contactchilds = document.getElementById(l);
        contactchilds.innerHTML += contactChildHtml(n, e, m, c, lettersFB, i);




    }

}

function createContactBar() {
    for (let i = 0; i < lettertask.length; i++) {
        let l = lettertask[i];
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML += contactBarHtml(l);
    }
}

function openDetailContact(lettersFB, n, e, m, c) {
    let contactdetails = document.getElementById('contactdetails');
    contactdetails.innerHTML = '';
    contactdetails.innerHTML = contactDetailHtml(lettersFB, n, e, m, c);
}

function editContact(lettersFB, n, e, m, c) {
    let editcontact = document.getElementById('opencontact');
    editcontact.classList.remove('d-none');

    editcontact.innerHTML = '';
    editcontact.innerHTML = editContactHtml(lettersFB, n, e, m, c);
    document.getElementById('contactEditName').value = n;
    document.getElementById('contactEditEmail').value = e;
    document.getElementById('contactEditNumber').value = m;
}

function invEditContact() {

    let smallName = document.getElementById('contactEditName').value;
    let contactEmail = document.getElementById('contactEditEmail').value;
    let contactNumber = document.getElementById('contactEditNumber').value;
    let contactName = smallName.charAt(0).toUpperCase() + smallName.slice(1);
    let firstName = contactName.charAt(0);

    let contactTask = {
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactNumber': contactNumber,
        'contactletter': firstName,

    };
    console.log(contactTask);
    // changeEditContact();
}

function changeEditContact(contactTask) {
    let addcontact = document.getElementById('opencontact');
    addcontact.classList.add('d-none');

    contactChild();
}

function contactDetailHtml(lettersFB, n, e, m, c) {
    return `
    <div class="contact-detail-main-side animationFadeInRight">
                        <div class="contact-detail-head">
                            <div style="background-color: ${c}" class="contact-detail-big-letter">${lettersFB}</div>
                            <div class="contact-detail-name-task">
                                <p class="contact-detail-big-name">${n}</p>
                                <p class="contact-detail-add-task"><img src="./assets/img/blue-plus.png" alt="">Add Task</p>
                            </div>
                        </div>
                        <div class="contact-detail-info-main">
                            <p class="contact-detail-info">Contact Information</p>
                            <p class="contact-detail-edit" onclick="editContact('${lettersFB}', '${n}', '${e}', '${m}', '${c}')">Edit Contact</p>
                        </div>
                        <div>
                            <div>
                                <p class="contact-detail-email-number">Email</p>
                                <a href="${e}">${e}</a>
                            </div>
                            <div>
                                <p class="contact-detail-email-number">Mobile</p>
                                <p>${m}</p>
                            </div>
                        </div>
                    </div>
    `
}

function contactChildHtml(n, e, m, c, lettersFB) {
    return `
    <div class="contact-child-div" onclick="openDetailContact('${lettersFB}', '${n}', '${e}', '${m}', '${c}', )">
        <div style="background-color: ${c}" class="contact-child">
            <p>${lettersFB}</p>
        </div>
        <div>
            <p class="contact-child-name">${n}</p>
            <p class="contact-child-email">${e}</p>
        </div>
    </div>
    `
}

function contactBarHtml(letter) {
    return `
    <div class="contact-letter-main" >
        <h4  class="contact-letter">${letter}</h4>
        <div id="${letter}"></div>
    </div>
    `
}

function addNewContactHtml() {
    return `
    <div class="add-contact animationFadeIn">
    <div class="add-contact-head">
        <div class="add-contact-cross" onclick="closeAddContact()">
            <img class="img-cross" src="/src/assets/img/pngegg.png" alt="">
        </div>
        <div class="add-contact-header-info" >
            <div onclick="closeAddContact()>
                <img " src="/src/assets/img/Capa 1.png" alt="">
            </div>
            <div class="add-contact-h">
                Add contact
            </div>
            <div class="add-contact-text">
                Tasks are better with a team!
            </div>
        </div>
    </div>
    <div class="add-contact-main">
        <div class="contact-member"><img src="/src/assets/img/contact-member.png" alt="">
        </div>
        <form onsubmit="createContact()">
            <div>
                <div class="input-contact"><input placeholder="Name" required  type="text" id="contactName" class="input-contact-name">
                    <img src="/src/assets/img/signup-user.png" alt="">
                </div>
                <div class="input-contact"><input placeholder="Email" required type="email" id="contactEmail" class="input-contact-name">
                    <img src="/src/assets/img/login-email.png" alt="">
                </div>
                <div class="input-contact"><input placeholder="Phone" required type="text" id="contactNumber" class="input-contact-name">
                    <img src="/src/assets/img/phone.png" alt="">
                </div>
            </div>
            <div class="button-container">
              
                <button class="button-cancel" onclick="closeAddContact()">Cancel <img src="/src/assets/img/cancel.png" alt=""></button>
                <button class="button-create">Create contact <img src="/src/assets/img/rithe.png" alt=""></button>
                
            </div>
        </form>
    </div>
</div>
    `
}

function editContactHtml(lettersFB, n, e, m, c, i) {
    return `
    <div class="add-contact animationFadeIn">
    <div class="add-contact-head">
        <div class="add-contact-cross" onclick="closeAddContact()">
            <img class="img-cross" src="/src/assets/img/pngegg.png" alt="">
        </div>
        <div class="add-contact-header-info" >
            <div onclick="closeAddContact()>
                <img " src="/src/assets/img/Capa 1.png" alt="">
            </div>
            <div class="add-contact-h">
                Edit contact
            </div>
            
        </div>
    </div>
    <div class="add-contact-main">
    <div style="background-color: ${c}" class="contact-detail-big-letter">
        <p>${lettersFB}</p>
        </div>
        <form onsubmit="invEditContact(); return false">
            <div>
                <div class="input-contact"><input  required  type="text" id="contactEditName" class="input-contact-name">
                
                    <img src="/src/assets/img/signup-user.png" alt="">
                </div>
                <div class="input-contact"><input  required type="email" id="contactEditEmail" class="input-contact-name">
                    <img src="/src/assets/img/login-email.png" alt="">
                </div>
                <div class="input-contact"><input required type="text" id="contactEditNumber" class="input-contact-name">
                    <img src="/src/assets/img/phone.png" alt="">
                </div>
            </div>
            <div class="button-container">
              
                <button class="button-cancel" onclick="closeAddContact()">Delete <img src="/src/assets/img/cancel.png" alt=""></button>
                <button class="button-create">Save <img src="/src/assets/img/rithe.png" alt=""></button>
                
            </div>
        </form>
    </div>
</div>
    `
}