function addUser() {
    let userName = document.getElementById('user_name');
    let userEmail = document.getElementById('user_email');
    let userPassword = document.getElementById('user_password');
    users.push({
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    });
    backend.setItem('users', JSON.stringify(users));
}