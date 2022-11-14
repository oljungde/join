/**
 * get user data from html5 form and push it to backend json
 */
function addUser() {
    let userName = document.getElementById('user_name');
    let userEmail = document.getElementById('user_email');
    let userPassword = document.getElementById('user_password');
    users.push({
        'name': userName.value,
        'email': userEmail.value,
        'password': userPassword.value,
        'image': null
    });
    backend.setItem('users', JSON.stringify(users));
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
}