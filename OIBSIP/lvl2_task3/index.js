const saveButton = document.querySelector('.save-btn')
const priorityInput = document.querySelector('.priority-input')
const dropDownLists = document.querySelectorAll('.drop-down-list')

function toggleActive() {
    const dropDownIndicator = document.querySelector('.caret-down')
    const dropDownMenu = document.querySelector('.drop-down-menu')

    dropDownIndicator.classList.toggle('active')
    dropDownMenu.classList.toggle('active')
}

priorityInput.addEventListener('click', toggleActive)

dropDownLists.forEach((dropDownList) => {
    dropDownList.addEventListener('click', () => {
        priorityInput.value = dropDownList.value

        toggleActive()
    })
})  

function alterTasks() {
    const tasks = document.querySelectorAll('.task')
    const deleteButtons = document.querySelectorAll('.delete-btn')
    const editButtons = document.querySelectorAll('.edit-btn')
    const taskTitles = document.querySelectorAll('.task-title')
    const taskDescriptions = document.querySelectorAll('.task-description')
    const completedButtons = document.querySelectorAll('.finished-btn')
    const completedSection = document.querySelector('.completed')
    const alteredContentTimes = document.querySelectorAll('.alter-time')

    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()

    deleteButtons.forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            tasks[index].remove()
        })
    })

    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', () => {
            if(editButton.innerHTML === 'save') {
                editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

                taskTitles[index].classList.remove('editable')
                taskDescriptions[index].classList.remove('editable')

                taskTitles[index].contentEditable = 'false';
                taskDescriptions[index].contentEditable = 'false';

                alteredContentTimes[index].innerHTML = currentHour + ':' + currentMinute
            } else {
                editButton.innerHTML = 'save'

                taskTitles[index].classList.add('editable')
                taskDescriptions[index].classList.add('editable')

                taskTitles[index].contentEditable = 'true';
                taskDescriptions[index].contentEditable = 'true';
            }
        })
    })

    completedButtons.forEach((completedButton, index) => {
        completedButton.addEventListener('click', () => {
            completedButton.style.display = 'none'
            completedSection.appendChild(tasks[index])

            alteredContentTimes[index].innerHTML = currentHour + ':' + currentMinute
        })
    })
}

alterTasks()

saveButton.addEventListener('click', (e) => {
    const inputs = document.querySelectorAll('.input')
    e.preventDefault()

    let valid = true;

    inputs.forEach((input) => {
        if(input.value.trim() === '') {
            valid = false;

            input.classList.remove('success')
            input.classList.add('error')
        } else {
            input.classList.remove('error')
            input.classList.add('success')
        }
    })

    if(valid) {
        let titleInput = document.querySelector('.title-input').value
        let priorityInput = document.querySelector('.priority-input').value
        let descriptionInput = document.getElementById('description').value

        createNewTask(titleInput, priorityInput, descriptionInput)

        inputs.forEach((input) => {
            input.value = ''
            input.classList.remove('success')
            input.classList.remove('error')
        })
    }
})

function deleteTask(element) {
    var taskElement = element.closest('.task')
    taskElement.remove()
}

function editTask(editButton) {
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    const currentDay = currentDate.getDay()
    const currentMonth = currentDate.getMonth()

    const formattedHour = currentHour < 10 ? "0" + currentHour : currentHour
    const formattedMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute
    const formattedDay = currentDay < 10 ? "0" + currentDay : currentDay
    const formattedMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth
    

    var task = editButton.closest('.task')
    var taskTitle = task.querySelector('.task-title')
    var taskDescription = task.querySelector('.task-description')
    var alteredContentTime = task.querySelector('.alter-time')

    if(editButton.innerHTML === 'save') {
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

        taskTitle.classList.remove('editable')
        taskDescription.classList.remove('editable')

        taskTitle.contentEditable = 'false';
        taskDescription.contentEditable = 'false';

        alteredContentTime.innerHTML = formattedHour + ':' + formattedMinute + ' ' + formattedDay + '/' + formattedMonth
    } else {
        editButton.innerHTML = 'save'

        taskTitle.classList.add('editable')
        taskDescription.classList.add('editable')

        taskTitle.contentEditable = 'true';
        taskDescription.contentEditable = 'true';
    }
}

function completeTask(completeButton) {
    const completedSection = document.querySelector('.completed-task-ctn')

    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    const currentDay = currentDate.getDay()
    const currentMonth = currentDate.getMonth()

    const formattedHour = currentHour < 10 ? "0" + currentHour : currentHour
    const formattedMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute
    const formattedDay = currentDay < 10 ? "0" + currentDay : currentDay
    const formattedMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth

    var task = completeButton.closest('.task')
    var alteredContentTime = task.querySelector('.alter-time')

    alteredContentTime.innerHTML = formattedHour + ':' + formattedMinute + ' ' + formattedDay + '/' + formattedMonth

    completeButton.style.display = 'none'

    completedSection.appendChild(task)
}

function createNewTask(titleInput, priorityInput, descriptionInput) {
    const pendingSection = document.querySelector('.pending-task-ctn')

    //const finishedButtonContainer = document.querySelector('.finished-btn-ctn')

    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    const currentDay = currentDate.getDay()
    const currentMonth = currentDate.getMonth()

    const formattedHour = currentHour < 10 ? "0" + currentHour : currentHour
    const formattedMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute
    const formattedDay = currentDay < 10 ? "0" + currentDay : currentDay
    const formattedMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth

    var newTask = document.createElement('div')
    newTask.className = 'task' 

    newTask.innerHTML = 
    `<img src="img/Frame 1216400387.png" alt="Task Illustration">

    <div class="task-det-ctn">
        <span>
            <p class="priority-level ${priorityInput}">${priorityInput}</p>

            <div class="other-details">
                <p class="alter-time">${formattedHour + ':' + formattedMinute + ' ' + formattedDay + '/' + formattedMonth}</p>
                <img src="img/Rectangle 7.png" alt="User profile picture">
            </div>
        </span>
        <p class="task-title">${titleInput}</p>
        <p class="task-description">${descriptionInput}</p>
    </div>

    <div class="button-ctn">
        <div class="finished-btn-ctn">
            <button class="finished-btn" onclick="completeTask(this)">Finished</button>
        </div>

       <div class="other-btn">
            <button class="edit-btn" onclick ="editTask(this)"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn" onclick ="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
       </div>
    </div>`

    pendingSection.appendChild(newTask)
}