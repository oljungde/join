setURL('https://gruppe-377.developerakademie.net/smallest_backend_ever');

function openAddTaskMask(){
    document.getElementById('AddTaskMaskBg').classList.remove('d-none');
    document.getElementById('AddTaskMaskContainer').innerHTML += /*html*/`

    <div>
        <h2>Add Task</h2>
        <button>Create Task</button>
    </div>
    <input placeholder ="Enter a title" type="text" name="" id="">
    <select value="">
        <option name="" id="">Martin Schmidt</option>
        <option name="" id="">Ulf Kirsten</option>
</select>
    <input type="date">
    <div>
        <img src="assets/img/Prio_urgent.png" alt="">
        <img src="assets/img/Prio_medium.png" alt="">
        <img src="assets/img/Prio_low.png" alt="">
    </div>
    <input type="text" placeholder="Enter a Description">
    <input type="text" placeholder="Add a new subtask">

    `;

}