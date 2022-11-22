let addTasks = [];
let lettertask = [];

async function initContacts() {
    // checkUserIsLoggedIn();
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

    let contactName = document.getElementById('contactName').value;
    let contactEmail = document.getElementById('contactEmail').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let firstName = contactName.charAt(0);
    let contactTask = {
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactNumber': contactNumber,
        'contactletter': firstName
    };
    fillAllTasks(contactTask, contactName, );
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

function clearContactBar(){
    for (let i = 0; i < lettertask.length; i++) {
        let clear = lettertask[i];
        let contactSmall = document.getElementById(clear)
        while(contactSmall.lastChild){
        contactSmall.removeChild(contactSmall.lastChild);
        }
    }
    contactChild();
}

function contactChild() {
    for (let index = 0; index < addTasks.length; index++) {
        let l = addTasks[index]['contactletter'];
        let n = addTasks[index]['contactName'];
        let e = addTasks[index]['contactEmail'];       
        let contactchilds = document.getElementById(l);
        contactchilds.innerHTML += contactChildHtml(n, e);
    }

}

function createContactBar() {
    for (let i = 0; i < lettertask.length; i++) {
        let l = lettertask[i];
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML += contactBarHtml(l);
    }
}

function contactChildHtml(n, e) {
    return `
    <div class="contact-child-div">
        <div class="contact-child">
            <p></p>
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
        <div class="add-contact-cross">
            <img class="img-cross" src="/src/assets/img/pngegg.png" alt="">
        </div>
        <div class="add-contact-header-info" >
            <div>
                <img onclick="closeAddContact()" src="/src/assets/img/Capa 1.png" alt="">
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
                <div><input required pattern="[A-Z]{1,} type="text" id="contactName" class="input-contact-name">
                    <img src="/src/assets/img/signup-user.png" alt="">
                </div>
                <div><input required type="email" id="contactEmail">
                    <img src="/src/assets/img/login-email.png" alt="">
                </div>
                <div><input required type="text" id="contactNumber">
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