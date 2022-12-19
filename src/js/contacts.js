let savecontactforaddtask;


async function initContacts() {
    await init();
    setNavLinkActive();
    checkUserIsLoggedIn();
    renderAllContact()
    getTasksOfCurrentUser();
    imgheader();
}


function renderAllContact() {
    createContactBar();
    contactChild();
}


/**
 * opens a window to add contacts
 */
function openAddContact() {
    let addcontact = document.getElementById('opencontact');
    addcontact.classList.remove('d-none');
    addcontact.innerHTML = '';
    addcontact.innerHTML = addNewContactHtml();
}


/**
 * close a window to add contacts
 */
function closeAddContact() {
    let addcontact = document.getElementById('opencontact');
    addcontact.classList.add('d-none');
    addcontact.innerHTML = '';

}


/**
 * pulls them out of the input and puts them in a json
 */
function createContact() {
    let smallName = document.getElementById('contactName').value;
    let contactEmail = document.getElementById('contactEmail').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let contactName = smallName.charAt(0).toUpperCase() + smallName.slice(1);
    let firstName = contactName.charAt(0);
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let letterFB = contactName.match(/\b(\w)/g).join('');
    let lettersFB = letterFB.toUpperCase();
    let contactTask = {
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactNumber': contactNumber,
        'contactletter': firstName,
        'contactcolor': randomColor,
        'contactInitials': lettersFB
    };
    let look = checkEmailInArray(contactTask);
    checkOrLoad(look, contactName, contactTask)
}


/**
 * Check e-mail or create a contact
 * @param {*} look 
 * @param {*} contactName 
 * @param {*} contactTask 
 */
function checkOrLoad(look, contactName, contactTask) {
    if (look == -1) {
        addNewContact(contactTask);
        fillAllTasks(contactName,);
    }
    else {
        checkEmail();
    }
}


/**
 * Pusht ContactTask in CurrentUser and Save it in Backend
 * @param {*} contactTask 
 */
async function addNewContact(contactTask) {
    currentUser.contacts.push(contactTask);
    currentUser.contacts.sort((a, b) => a.contactName.localeCompare(b.contactName));
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * Checks if e-mail is assigned in array
 * @param {*} contactTask 
 * @returns 
 */
function checkEmailInArray(contactTask,) {
    let email = contactTask['contactEmail'];
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        if (currentUser.contacts[i]['contactEmail'].toLowerCase() == email.toLowerCase()) {
            userindex = i; //Email found
        }
    }
    return userindex;
}


// email already taken appears
function checkEmail() {
    let emaildone = document.getElementById('emailDone');
    emaildone.classList.remove('d-none');
}


/**
 * pushes the json into an array
 * @param {*} contactTask 
 */
function fillAllTasks(contactName,) {
    let letter = contactName.charAt(0);
    closeAddContact();
    popupContactSave();
    if (currentUser.lettertask.includes(letter)) {
        clearContactBar();
    }
    else {
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML = '';
        saveLetterContact(letter);
        createContactBar();
        contactChild();
    }
}


// push letter in currentUser
function saveLetterContact(letter) {
    currentUser.lettertask.push(letter);
    currentUser.lettertask.sort();
    backend.setItem('users', JSON.stringify(users));
}

// save contact popup
function popupContactSave() {
    document.getElementById('popup-ContactBar').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('popup-ContactBar').classList.add('d-none');
    }, 2000);
}


// Clear Contact Letter Bar
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


// for loop for contact child
function contactChild() {
    for (let index = 0; index < currentUser.contacts.length; index++) {
        let i = currentUser.contacts[index];
        let lettersFB = currentUser.contacts[index]['contactInitials'];
        let l = currentUser.contacts[index]['contactletter'];
        let contactchilds = document.getElementById(l);
        contactchilds.innerHTML += contactChildHtml(i, lettersFB, index);
    }
}


// Create a Contact Letter Bar
function createContactBar() {
    for (let i = 0; i < currentUser.lettertask.length; i++) {
        let l = currentUser.lettertask[i];
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML += contactBarHtml(l);
    }
}


/**
 * opens detail view of contact
 * @param {*} index 
 * @param {*} lettersFB 
 */
function openDetailContact(index, lettersFB) {
    changeColorInContact(index);
    let contact = currentUser.contacts[index];
    let contactMedia = window.matchMedia('(max-width: 1120px)')
    if (contactMedia.matches) {
        document.getElementById('contactbar').classList.add('display-contact-none');
        document.getElementById('contact-detail-in-main').classList.remove('display-contact-none');
    }
    let contactdetailsinmedia = document.getElementById('contact-detail-in-main');
    contactdetailsinmedia.innerHTML = '';
    contactdetailsinmedia.innerHTML = contactDetailHtml(contact, lettersFB, index);
    let contactdetails = document.getElementById('contactdetails');
    contactdetails.innerHTML = '';
    contactdetails.innerHTML = contactDetailHtml(contact, lettersFB, index);
}


/**
 * change coler of background in letterTask
 * @param {*} index 
 */
function changeColorInContact(index) {
    for (let i = 0; i < currentUser.contacts.length; i++) {
        document.getElementById(i).classList.remove('contact-child-div-klick')
    }
    document.getElementById(index).classList.add('contact-child-div-klick');
}


/**
 * opens Edit view of Contact
 * @param {*} index 
 * @param {*} lettersFB 
 */
function editContact(index, lettersFB) {
    let contact = currentUser.contacts[index];
    let editcontact = document.getElementById('opencontact');
    editcontact.classList.remove('d-none');
    editcontact.innerHTML = '';
    editcontact.innerHTML = editContactHtml(contact, lettersFB, index);
    document.getElementById('contactEditName').value = contact['contactName'];
    document.getElementById('contactEditEmail').value = contact['contactEmail'];
    document.getElementById('contactEditNumber').value = contact['contactNumber'];
}


/**
 * Changes a contact
 * @param {*} oldEmail 
 * @param {*} index 
 * @param {*} lettersFB 
 */
function invEditContact(oldEmail, index, lettersFB) {
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
    changeUser(contactTask, index, lettersFB);
}


/**
 * Changes a contact
 * @param {*} object 
 * @param {*} id 
 * @param {*} lettersFB 
 */
function changeUser(object, id, lettersFB) {
    let oldEmail = object['oldEmail'];
    let index = getUserIndexForEmail(oldEmail);
    let letter = currentUser.contacts[index]['contactletter'];
    changeContact(object, index);
    savesInBackEnd();
    renderContacts(letter);
    closeAddContact();
    openDetailContact(id, lettersFB);
}


/**
 * change new name, email, Number, in old contact
 * @param {*} object 
 * @param {*} index 
 */
function changeContact(object, index) {
    currentUser.contacts[index]['contactName'] = object['contactName'];
    currentUser.contacts[index]['contactletter'] = object['contactletter'];
    currentUser.contacts[index]['contactEmail'] = object['contactEmail'];
    currentUser.contacts[index]['contactNumber'] = object['contactNumber'];
}


/**
 * Render a Contact
 * @param {*} letter 
 */
function renderContacts(letter) {
    if (currentUser.lettertask.includes(letter)) {
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


// Save in Backend
async function savesInBackEnd() {
    await backend.setItem('users', JSON.stringify(users));
}


// close contact detail
function clearContactDetails() {
    let addcontact = document.getElementById('contactdetails');
    addcontact.innerHTML = '';

}


// close window under 1160px
function closeMediaContact() {
    document.getElementById('contact-detail-in-main').classList.add('display-contact-none');
    document.getElementById('contactbar').classList.remove('display-contact-none');
}


/**
 * Lokking for index in array
 * @param {*} email 
 * @returns 
 */
function getUserIndexForEmail(email) {
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        if (currentUser.contacts[i]['contactEmail'].toLowerCase() == email.toLowerCase()) {
            userindex = i; //Email found
        }
    }
    return userindex;
}


/**
 * Open AddTask in contact
 * @param {*} i 
 */
function OpenContactAddTask(i, index) {
    savecontactforaddtask = index;
    console.log(savecontactforaddtask);
    let openaddtask = document.getElementById('openContactAddtask');
    document.getElementById('openContactAddtaskBG').classList.remove('d-none');
    openaddtask.innerHTML = openAddTaskHtml(i);

}


/**
 * Delete a Contact
 * @param {*} index 
 */
function deleteContacts(index) {
    closeAddContact();
    let letter = currentUser.contacts[index]['contactletter'];
    currentUser.contacts.splice(index, 1);
    let indexofletter = deleteContactletter(letter);
    if (indexofletter == -1) {
        for (let l = 0; l < currentUser.lettertask.length; l++) {
            let element = currentUser.lettertask[l];
            if (element == letter) {
                currentUser.lettertask.splice(l, 1);
                let clear = document.getElementById(letter);
                clear.remove();
            }
        }
    }
    document.getElementById('contactbar').innerHTML = '';
    clearContactDetails();
    createContactBar();
    contactChild();
    savesInBackEnd();
}


/**
 * Delete Contact Letter Bar
 * @param {*} letter 
 * @returns 
 */
function deleteContactletter(letter) {
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        let lettersFB = currentUser.contacts[i]['contactName'].charAt(0);
        if (lettersFB == letter) {
            userindex = i;
        }
    }
    return userindex;
}