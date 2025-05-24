// Get elements from HTML
const newTaskInput = document.getElementById("newTask");
const addButton = document.getElementById("Add");
const workPending = document.getElementById("workPending");
const workDone = document.getElementById("workDone");

// Get saved tasks or use empty array
let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

// Function to display tasks
function showTasks() {
  workPending.innerHTML = "";
  workDone.innerHTML = "";

  // Show pending tasks
  pendingTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✅";
    doneBtn.addEventListener("click", () => {
      // Move to done
      doneTasks.push(task);
      pendingTasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(span);
    li.appendChild(doneBtn);
    workPending.appendChild(li);
  });

  // Show done tasks
  doneTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      doneTasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    workDone.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

// Add task button click
addButton.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    pendingTasks.push(taskText);
    newTaskInput.value = "";
    saveTasks();
    showTasks();
  }
});

// Initial load
showTasks();