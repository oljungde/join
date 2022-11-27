async function initSignUp() {
    await init();
    checkUserIsLoggedIn();
    passwordInputIconChange();
}


/**
 * get user data from html5 form and check if user is registered
 */
function addUser() {
    let nameAssign = document.getElementById('name_assign');
    let emailAssign = document.getElementById('email_assign');
    nameAssign.classList.add('display-none');
    emailAssign.classList.add('display-none');
    let userName = document.getElementById('user_name').value;
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    checkIsUserRegistered(userName, userEmail, userPassword);
}


/**
 * checks the array users contains name and email adress in lower case 
 * @param {string} userName is the name of the user who wants to register
 * @param {string} userEmail ist the email adress of the user who wants to register
 * @param {string} userPassword password of the user who wants to register
 */
function checkIsUserRegistered(userName, userEmail, userPassword) {
    let indexOfName = users.findIndex(user => user.nameMatchCode == userName.toLowerCase());
    let indexOfEmail = users.findIndex(user => user.emailMatchCode == userEmail.toLowerCase());
    checkRegistrationData(indexOfName, indexOfEmail);
}


/**
 * Shows the user a error message if the choosen name oder email adress is registered
 * @param {number} indexOfName is the index of the users name in the array users, if the array don't contains this name the value is -1
 * @param {string} indexOfEmail is the index of the users email adress in the array users, if the array don't contains this email adress the value is -1
 */
function checkRegistrationData(indexOfName, indexOfEmail) {
    let userName = document.getElementById('user_name').value;
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    if (indexOfName == -1 && indexOfEmail == -1) {
        userRegister(userName, userEmail, userPassword);
    }
    userNameIsRegistered(indexOfName);
    userEmailIsRegistered(indexOfEmail);
}


function userNameIsRegistered(indexOfName) {
    let nameAssign = document.getElementById('name_assign');
    if (indexOfName != -1) {
        nameAssign.classList.remove('display-none');
    }
}


function userEmailIsRegistered(indexOfEmail) {
    let emailAssign = document.getElementById('email_assign');
    if (indexOfEmail != -1) {
        emailAssign.classList.remove('display-none');
    }
}


/**
 * register the user and added the user data in the array users and save this array in the backend
 * @param {string} userName is the choosen user name to register
 * @param {string} userEmail is the choosen email adress to register
 * @param {string} userPassword ist the choosen password string to register
 */
function userRegister(userName, userEmail, userPassword) {
    users.push({
        'name': userName,
        'nameMatchCode': userName.toLowerCase(),
        'email': userEmail,
        'emailMatchCode': userEmail.toLowerCase(),
        'password': userPassword,
        'tasks': [],
        'contacts': []
    });
    backend.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('loggedIn', 'false');
    localStorage.setItem('rememberMe', 'false');
    registrationComplete();
}


/**
 * reders a success message, when user completed registration
 */
function registrationComplete() {
    let signupContent = document.getElementById('sign_up');
    signupContent.innerHTML = registrationCompleteTemplate();
}


/**
 * @returns html code for registration success message
 */
function registrationCompleteTemplate() {
    return /*html*/ `
        <a href="./index.html"><img src="./assets/img/arrow-back.png" alt="back to login" class="signup-back"></a>
        <div class="headline-container">
            <h1 class="headline">Registration complete</h1>
            <div class="login-headline-border"></div>
        </div>

        <div class="signup-complete-text">
            Thank you for your registration.<br> You can log in <a href="./index.html">here</a>.
        </div>
    `;
};