function userLogin() {
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    checkUserData(userEmail, userPassword)
}


function checkUserData(userEmail, userPassword) {
    let indexOfEmail = users.findIndex(user => user.email == userEmail);
    let indexOfPassword = users.findIndex(user => user.password == userPassword);
    console.log(indexOfEmail);
    console.log(indexOfPassword);
    if (indexOfEmail == -1 || indexOfPassword == -1) {
        console.log('Einloggen nicht möglich!');
        let loginContent = document.getElementById('login_content');
        loginContent.innerHTML = accessDeniedTemplate();
    } else {
        console.log('GLÜCKWUNSCH! Einloggen möglich');
        let rememberMee = document.getElementById('remember_me');
        if (rememberMee.checked) {
            localStorage.setItem('rememberMe', 'true');
        }
        localStorage.setItem('loggedIn', 'true');
        // window.location.href = "./dashboard.html";
    }
}


function accessDeniedTemplate() {
    return /*html*/ `
        <a href="./index.html"><img src="./assets/img/arrow-back.png" alt="back to login" class="signup-back"></a>
        <div class="headline-container">
            <h1 class="headline">Access Denied</h1>
            <div class="login-headline-border"></div>
        </div>

        <div class="access-denied-text">
            Sorry, either you entered a wrong email address or password.<br> You can try again <a href="./index.html">here</a>.
        </div>
    `;
}