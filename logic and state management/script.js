// ========================================
// JavaScript Logic & State Management
// ========================================

// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter-btn");


// ========================================
// Application State
// ========================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// ========================================
// Save Tasks to Local Storage
// ========================================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// ========================================
// Generate Unique ID
// ========================================

function generateId() {

    return Date.now() + Math.random();

}


// ========================================
// Create New Task
// ========================================

function addTask() {

    const taskText = taskInput.value.trim();

    // Prevent empty task
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }

    const newTask = {

        id: generateId(),

        text: taskText,

        completed: false

    };

    // Add task to state
    tasks.push(newTask);

    // Save data
    saveTasks();

    // Clear input
    taskInput.value = "";

    // Render tasks
    renderTasks();

    // Focus input
    taskInput.focus();
}


// ========================================
// Render Tasks
// ========================================

function renderTasks() {

    // Clear existing list
    taskList.innerHTML = "";

    // Filter tasks
    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(task => !task.completed);

    }

    else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }


    // Show empty message
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Create task elements dynamically
    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {

            li.classList.add("completed");

        }

        li.dataset.id = task.id;


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // Task text
        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Action container
        const actions = document.createElement("div");

        actions.className = "task-actions";


        // Edit button
        const editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.dataset.action = "edit";

        editButton.textContent = "Edit";


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.dataset.action = "delete";

        deleteButton.textContent = "Delete";


        // Add buttons
        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        // Add everything to li
        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(actions);


        // Add li to list
        taskList.appendChild(li);

    });


    updateTaskCount();

}


// ========================================
// Update Task Count
// ========================================

function updateTaskCount() {

    const activeTasks = tasks.filter(task => !task.completed).length;

    if (activeTasks === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent = `${activeTasks} tasks remaining`;

    }

}


// ========================================
// Toggle Task Completed
// ========================================

function toggleTask(id) {

    const task = tasks.find(task => task.id == id);

    if (!task) return;

    task.completed = !task.completed;

    saveTasks();

    renderTasks();

}


// ========================================
// Delete Task
// ========================================

function deleteTask(id) {

    tasks = tasks.filter(task => task.id != id);

    saveTasks();

    renderTasks();

}


// ========================================
// Edit Task
// ========================================

function editTask(id) {

    const task = tasks.find(task => task.id == id);

    if (!task) return;

    const newText = prompt("Edit your task:", task.text);

    if (newText === null) {

        return;

    }

    const updatedText = newText.trim();

    if (updatedText === "") {

        alert("Task cannot be empty.");

        return;

    }

    task.text = updatedText;

    saveTasks();

    renderTasks();

}


// ========================================
// Event Delegation
// ========================================

taskList.addEventListener("click", function(event) {

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) return;

    const id = taskItem.dataset.id;

    const action = event.target.dataset.action;


    if (action === "edit") {

        editTask(id);

    }


    if (action === "delete") {

        deleteTask(id);

    }

});


// ========================================
// Checkbox Event Delegation
// ========================================

taskList.addEventListener("change", function(event) {

    if (!event.target.classList.contains("task-checkbox")) {

        return;

    }

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) return;

    const id = taskItem.dataset.id;

    toggleTask(id);

});


// ========================================
// Add Task Button
// ========================================

addTaskBtn.addEventListener("click", addTask);


// ========================================
// Enter Key
// ========================================

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ========================================
// Filter Buttons
// ========================================

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class
        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        // Add active class
        this.classList.add("active");

        // Change filter
        currentFilter = this.dataset.filter;

        // Render
        renderTasks();

    });

});


// ========================================
// Clear Completed Tasks
// ========================================

clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

});


// ========================================
// Initial Application Load
// ========================================

renderTasks();