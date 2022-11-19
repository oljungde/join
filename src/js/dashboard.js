/**
 * init function will execute wenn page dashboard.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
async function initDashboard() {
    checkUserIsLoggedIn();
    await init();
}