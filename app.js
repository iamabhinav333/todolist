const newTaskInput = document.getElementById("newTask");
const addButton = document.getElementById("Add");
const workPending = document.getElementById("workPending");
const workDone = document.getElementById("workDone");

// Store tasks only in memory
let pendingTasks = [];
let doneTasks = [];

// Show tasks
function showTasks() {
  workPending.innerHTML = "";
  workDone.innerHTML = "";

  pendingTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✅";
    doneBtn.onclick = () => {
      doneTasks.push(task);
      pendingTasks.splice(index, 1);
      showTasks();
    };

    li.appendChild(doneBtn);
    workPending.appendChild(li);
  });

  doneTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      doneTasks.splice(index, 1);
      showTasks();
    };

    li.appendChild(deleteBtn);
    workDone.appendChild(li);
  });
}

// Add new task
addButton.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    pendingTasks.push(taskText);
    newTaskInput.value = "";
    showTasks();
  }
});
