/**
 * get data from login form an execute the function to check it
 */
function userLogin() {
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    checkUserData(userEmail, userPassword)
}


/**
 * checks user data and log the in or gives the user feedback that login is nor possible
 * @param {string} userEmail pecified e-mail address of the user from the login form
 * @param {string} userPassword pecified password of the user from the login form
 */
function checkUserData(userEmail, userPassword) {
    let indexOfEmail = users.findIndex(user => user.email == userEmail);
    let indexOfPassword = users.findIndex(user => user.password == userPassword);
    console.log(indexOfEmail);
    console.log(indexOfPassword);
    if (indexOfEmail == -1 || indexOfPassword == -1) {
        console.log('Einloggen nicht möglich!');
        let dataCheck = document.getElementById('data_check');
        dataCheck.classList.remove('display-none');
    } else {
        console.log('GLÜCKWUNSCH! Einloggen möglich');
        let rememberMe = document.getElementById('remember_me');
        if (rememberMe.checked) {
            localStorage.setItem('rememberMe', 'true');
        }
        localStorage.setItem('userLoggedInName', users[indexOfEmail].name);
        localStorage.setItem('userLoggedInEmail', users[indexOfEmail].email);
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = './dashboard.html';
    }
}


/**
 * logs a guest user in
 */
function guestLogin() {
    let loginForm = document.getElementById('login_form')
    loginForm.setAttribute('novalidate', 'true');
    checkUserData('noreply@nix.de', 'guest')
}