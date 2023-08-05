
const dateSection = document.getElementById('dateSection');
const taskDateInput = document.getElementById('taskDate');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const completedTasksSection = document.getElementById('completedTasksSection');
const wuhooMessage = document.getElementById('wuhooMessage');


// Function to display the selected date
function displayDate() {
    const selectedDate = new Date(taskDateInput.value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    dateSection.textContent = formattedDate;
}


// Function to create a new task element
function createTaskElement(taskText) {
    const taskElement = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    taskElement.appendChild(checkbox);
    taskElement.appendChild(document.createTextNode(taskText));
    taskList.appendChild(taskElement);

    // Add event listener for checking/unchecking the task
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskElement.classList.add('completed-task');
            moveTaskToCompletedSection(taskElement);
            checkForCompletion();
        } else {
            taskElement.classList.remove('completed-task');
            moveTaskBackToTodoList(taskElement);
            checkForCompletion();
        }
    });
}

// Function to move a completed task to the completed tasks section
function moveTaskToCompletedSection(taskElement) {
    completedTasksSection.appendChild(taskElement);
    completedTasksSection.style.display = 'block';
}

// Function to move a task back to the to-do list
function moveTaskBackToTodoList(taskElement) {
    taskList.appendChild(taskElement);
}

// Function to check if all tasks are completed and show the "wuhoo" message
function checkForCompletion() {
    const allTasks = document.querySelectorAll('li');
    const completedTasks = document.querySelectorAll('.completed-task');

    if (allTasks.length === completedTasks.length) {
        wuhooMessage.textContent = 'Wuhoo! Great Job!';
    } else {
        wuhooMessage.textContent = '';
    }
}


// Add event listener for the "Add" button
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        taskInput.value = '';
        checkForCompletion();
    }
});


displayDate();
