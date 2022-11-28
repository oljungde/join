let addTasks = [];


async function initContacts() {
    checkUserIsLoggedIn();
    await init();
    renderAllContact()
}



function renderAllContact(){
    createContactBar();
    contactChild();
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
    addNewContact(contactTask);
    checkEmailInArray(contactTask, contactName);
    
}

async function addNewContact(contactTask){
    currentUser.contacts.push(contactTask);
    currentUser.contacts.sort((a, b) => a.contactName.localeCompare(b.contactName));
    await backend.setItem('users', JSON.stringify(users));
}

function checkEmailInArray(contactTask, contactName) {
    let email = contactTask['contactEmail'];
    for (i = 0; i < addTasks.length; i++) {
        if (addTasks[i]['contactEmail'].toLowerCase() == email.toLowerCase()) {
            checkEmail();     
        } 
           
    }
    fillAllTasks(contactName);
}



function checkEmail(){
    let emaildone = document.getElementById('emailDone');
    emaildone.classList.remove('d-none');
    
}

/**
 * pushes the json into an array
 * 
 * @param {*} contactTask 
 */
function fillAllTasks(contactName,) {
    let letter = contactName.charAt(0);
    closeAddContact();
    if (currentUser.lettertask.includes(letter)) {
        clearContactBar();
    }
    else {
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML = '';
        currentUser.lettertask.push(letter);
        currentUser.lettertask.sort();
        backend.setItem('users', JSON.stringify(users));
        createContactBar();
        contactChild();
    }
}

function clearContactBar() {
    for (let i = 0; i < currentUser.lettertask.length; i++) {
        let clear = currentUser.lettertask[i];
        let contactSmall = document.getElementById(clear)
        while (contactSmall.lastChild) {
            contactSmall.removeChild(contactSmall.lastChild);
        }
    }

    contactChild();
}

function contactChild() {
    for (let index = 0; index < currentUser.contacts.length; index++) {
        let i = currentUser.contacts[index];
        let n = currentUser.contacts[index]['contactName'];
        let l = currentUser.contacts[index]['contactletter'];
        let lettersFB = n.match(/\b(\w)/g).join('');
        let contactchilds = document.getElementById(l);
        
        contactchilds.innerHTML += contactChildHtml(i, lettersFB, index);

    }

}

function createContactBar() {
    for (let i = 0; i < currentUser.lettertask.length; i++) {
        let l = currentUser.lettertask[i];
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML += contactBarHtml(l);
    }
}

function openDetailContact(index, lettersFB) {
    let contact = currentUser.contacts[index];
    let contactdetails = document.getElementById('contactdetails');
    contactdetails.innerHTML = '';
    
    contactdetails.innerHTML = contactDetailHtml(contact, lettersFB, index);
}

function editContact(index, lettersFB) {
    let contact = currentUser.contacts[index];
    let editcontact = document.getElementById('opencontact');
    editcontact.classList.remove('d-none');

    editcontact.innerHTML = '';
    editcontact.innerHTML = editContactHtml(contact, lettersFB);
    document.getElementById('contactEditName').value = contact['contactName'];
    document.getElementById('contactEditEmail').value = contact['contactEmail'];
    document.getElementById('contactEditNumber').value = contact['contactNumber'];
}

function invEditContact(oldEmail) {

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
        'oldEmail': oldEmail
    };
    
    changeUser(contactTask);
}

function renderContacts(letter){
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

function changeUser(object) {
    let oldEmail = object['oldEmail']; 
    let index = getUserIndexForEmail(oldEmail);
  
    currentUser.contacts[index]['contactName'] = object['contactName'];
    currentUser.contacts[index]['contactletter'] = object['contactletter'];
    currentUser.contacts[index]['contactEmail'] = object['contactEmail'];
    currentUser.contacts[index]['contactNumber'] = object['contactNumber'];
    let letter = currentUser.contacts[index]['contactletter'];
    savesInBackEnd();
    renderContacts(letter);
    closeAddContact();
    clearContactDetails();
}

async function savesInBackEnd(){
    await backend.setItem('users', JSON.stringify(users));
}

function clearContactDetails(){
    let addcontact = document.getElementById('contactdetails');
    addcontact.innerHTML = '';

}

function getUserIndexForEmail(email) {
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        if (currentUser.contacts[i]['contactEmail'].toLowerCase() == email.toLowerCase()) {
         userindex = i; //Email found
        }
    }
    return userindex;
}

    


function contactDetailHtml(contact, lettersFB, index) {
    return `
    <div class="contact-detail-main-side animationFadeInRight">
                        <div class="contact-detail-head">
                            <div style="background-color: ${contact['contactcolor']}" class="contact-detail-big-letter">${lettersFB}</div>
                            <div class="contact-detail-name-task">
                                <p class="contact-detail-big-name">${contact['contactName']}</p>
                                <p class="contact-detail-add-task"><img src="./assets/img/blue-plus.png" alt="">Add Task</p>
                            </div>
                        </div>
                        <div class="contact-detail-info-main">
                            <p class="contact-detail-info">Contact Information</p>
                            <p class="contact-detail-edit" onclick="editContact('${index}', '${lettersFB}')">Edit Contact</p>
                        </div>
                        <div>
                            <div>
                                <p class="contact-detail-email-number">Email</p>
                                <a href="${contact['contactEmail']}">${contact['contactEmail']}</a>
                            </div>
                            <div>
                                <p class="contact-detail-email-number">Mobile</p>
                                <p>${contact['contactNumber']}</p>
                            </div>
                        </div>
                    </div>
    `
}

function contactChildHtml(i, lettersFB, index) {
    return `
    <div class="contact-child-div" onclick="openDetailContact('${index}', '${lettersFB}' )">
        <div style="background-color: ${i['contactcolor']}" class="contact-child">
            <p>${lettersFB}</p>
        </div>
        <div>
            <p class="contact-child-name">${i['contactName']}</p>
            <p class="contact-child-email">${i['contactEmail']}</p>
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
        <form onsubmit="createContact(); return false">
            <div>
                <div class="input-contact"><input placeholder="Name" required  type="text" id="contactName" class="input-contact-name">
                    <img src="/src/assets/img/signup-user.png" alt="">
                </div>
                <div class="input-contact"><input placeholder="Email" required type="email" id="contactEmail" class="input-contact-name">
                    <img src="/src/assets/img/login-email.png" alt="">
                </div>
                <div  id="emailDone" class="d-none"> Email bereits vorhanden</div>
                <div class="input-contact"><input placeholder="Phone" required type="text" id="contactNumber" class="input-contact-name">
                    <img src="/src/assets/img/phone.png" alt="">
                </div>
            </div>
            <div class="button-container">
              
                <button class="button-cancel" type="reset" >Cancel <img src="/src/assets/img/cancel.png" alt=""></button>
                <button class="button-create" type="submit">Create contact <img src="/src/assets/img/rithe.png" alt=""></button>
                
            </div>
        </form>
    </div>
</div>
    `
}

function editContactHtml(contact, lettersFB ) {
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
    <div style="background-color: ${contact['contactcolor']}" class="contact-detail-big-letter">
        <p>${lettersFB}</p>
        </div>
        <form onsubmit="invEditContact('${contact['contactEmail']}'); return false">
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
                <button class="button-create" type="submit">Save <img src="/src/assets/img/rithe.png" alt=""></button>
                
            </div>
        </form>
    </div>
</div>
    `
}