// Lấy element
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");
const clearAllBtn = document.getElementById("clearAll");

// Load từ localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Render task
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    // Text
    const span = document.createElement("span");
    span.textContent = task.text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "auto";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Thêm task
function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

// Toggle completed
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Xoá 1 task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Xoá tất cả
clearAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

// Filter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderTasks();
  });
});

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Khởi tạo
renderTasks();
