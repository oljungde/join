/**
 * init function will execute wenn page contacts.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
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

function addNewContactHtml() {
    return `
    <div class="add-contact animationFadeIn">
    <div class="add-contact-head">
        <div class="add-contact-cross">
            <img class="img-cross" src="/src/assets/img/pngegg.png" alt="">
        </div>
        <div class="add-contact-header-info">
            <div >
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
        <div>
            <div><input type="text">
                <img src="/src/assets/img/signup-user.png" alt="">
            </div>
            <div><input type="e-mail">
                <img src="/src/assets/img/login-email.png" alt="">
            </div>
            <div><input type="text">
                <img src="/src/assets/img/phone.png" alt="">
            </div>
        </div>
        <div class="button-container">
            <div class="button-cancel" onclick="closeAddContact()">
                <div>Cancel</div>
                <img src="/src/assets/img/cancel.png" alt="">
            </div>
            <div class="button-create">
                <div> Create contact</div>
                <img src="/src/assets/img/rithe.png" alt="">
            </div>
        </div>
    </div>
</div>
    `
}