async function initLogin() {
    await init();
    // checkUserIsLoggedIn()
    passwordInputIconChange();
}


async function initResetPassword() {
    await init();
    passwordInputIconChange();
    passwordConfirmIconChange();
}


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
 * guest user login
 */
function guestLogin() {
    let loginForm = document.getElementById('login_form')
    let dataCheck = document.getElementById('data_check');
    loginForm.setAttribute('novalidate', 'true');
    dataCheck.innerHTML = '';
    localStorage.setItem('userLoggedInName', 'Guest User');
    localStorage.setItem('userLoggedInEmail', '');
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = './dashboard.html';
}


async function resetPassword() {
    let resetUrl = new URL(window.location.href);
    let resetEmail = resetUrl.searchParams.get('email');
    let resetTimestamp = resetUrl.searchParams.get('timestamp');
    let resetTimestampMinutes = resetTimestamp / 60;
    let timestampNowMinutes = Date.now() / 1000 / 60;
    let timeout = timestampNowMinutes - resetTimestampMinutes;
    console.log(resetEmail);
    if (timeout < 1440) {
        let checkMail = users.find(user => user.email == resetEmail);
        console.log(checkMail);
        if (checkMail) {
            let newPassword = document.getElementById('user_password').value;
            let newPasswordConfirm = document.getElementById('new_password_confirm').value;
            if (newPassword === newPasswordConfirm) {
                checkMail.password = newPasswordConfirm;
                console.log(checkMail.password);
            }
            let resetPasswordContainer = document.getElementById('reset_password_container');
            resetPasswordContainer.innerHTML = passwordResetedTemplate();
            await backend.setItem('users', JSON.stringify(users));
        } else {
            let emailCheck = document.getElementById('email_check');
            emailCheck.classList.remove('display-none');
        }
    } else {
        let resetPasswordContainer = document.getElementById('reset_password_container');
        resetPasswordContainer.innerHTML = passwordTimeoutTemplate();
    }
}


/**
 * Message text when password changed
 * @returns the html code to render the success message when password is chenged
 */
function passwordResetedTemplate() {
    return /*html*/ `
        <a href="./index.html"><img src="./assets/img/arrow-back.png" alt="back to login" class="signup-back"></a>
        <div class="headline-container">
            <h1 class="headline">Password reseted</h1>
            <div class="login-headline-border"></div>
        </div>

        <div class="signup-complete-text">
            Your password has been successfully changed.<br> You can log in <a href="./index.html">here</a>.
        </div>
    `;
}


/**
 * render message if the link in the "new password" email has expired. The expiration time is 24 hours
 * @returns the html code to show the message
 */
function passwordTimeoutTemplate() {
    return /*html*/ `
        <a href="./forgot-password.html"><img src="./assets/img/arrow-back.png" alt="back to login" class="signup-back"></a>
        <div class="headline-container">
            <h1 class="headline">Password reseted</h1>
            <div class="login-headline-border"></div>
        </div>

        <div class="signup-complete-text">
            Unfortunately, the link has expired. You have a maximum of 24 hours to reset a password after requesting the link.<br> You can request the link again <a href="./forgot-password.html">here</a>.
        </div>
    `;
}


/**
 * check if the input field length with the id user_password on index.html is longer as 0 letters and change the icon on end of input
 */
function passwordInputIconChange() {
    let userPasswordInput = document.getElementById('user_password');
    let passwordIcon = document.getElementById('user_password_icon');
    let passwordIconHidden = document.getElementById('user_password_hidden');
    userPasswordInput.addEventListener('input', function () {
        console.log('geändert');
        if (userPasswordInput.value.length > 0) {
            passwordIcon.classList.add('display-none');
            passwordIconHidden.classList.remove('display-none');
        } else {
            passwordIcon.classList.remove('display-none');
            passwordIconHidden.classList.add('display-none');
        }
    })
}


function passwordConfirmIconChange() {
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    let passwordConfirmIcon = document.getElementById('user_password_confirm_icon');
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    userPasswordConfirmInput.addEventListener('input', function () {
        console.log('geändert');
        if (userPasswordConfirmInput.value.length > 0) {
            passwordConfirmIcon.classList.add('display-none');
            passwordConfirmIconHidden.classList.remove('display-none');
        } else {
            passwordConfirmIcon.classList.remove('display-none');
            passwordConfirmIconHidden.classList.add('display-none');
        }
    })
}


/**
 * makes the password input readable
 */
function makePasswordVisible() {
    let passwordIconHidden = document.getElementById('user_password_hidden');
    let passwordIconVisible = document.getElementById('user_password_visible');
    let userPasswordInput = document.getElementById('user_password');
    passwordIconHidden.classList.add('display-none');
    passwordIconVisible.classList.remove('display-none');
    userPasswordInput.type = 'text';
}


/**
 * makes the password input unreadable
 */
function makePasswordUnvisible() {
    let passwordIconHidden = document.getElementById('user_password_hidden');
    let passwordIconVisible = document.getElementById('user_password_visible');
    let userPasswordInput = document.getElementById('user_password');
    passwordIconHidden.classList.remove('display-none');
    passwordIconVisible.classList.add('display-none');
    userPasswordInput.type = 'password';
}


/**
 * makes the password confirm
  input readable
 */
function makePasswordConfirmVisible() {
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    let passwordConfirmIconVisible = document.getElementById('user_password_confirm_visible');
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    passwordConfirmIconHidden.classList.add('display-none');
    passwordConfirmIconVisible.classList.remove('display-none');
    userPasswordConfirmInput.type = 'text';
}


/**
 * makes the password confirm input unreadable
 */
function makePasswordConfirmUnvisible() {
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    let passwordConfirmIconVisible = document.getElementById('user_password_confirm_visible');
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    passwordConfirmIconHidden.classList.remove('display-none');
    passwordConfirmIconVisible.classList.add('display-none');
    userPasswordConfirmInput.type = 'password';
}