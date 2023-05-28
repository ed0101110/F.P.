
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateInput = document.getElementById("date-input");
const titleInput = document.getElementById("title-input");

function addTask() {
  const inputValue = inputBox.value.trim();
  const dateValue = dateInput.value.trim();
  const titleValue = titleInput.value.trim();

  if (!inputValue) {
    alert("You must write something!");
  } else if (!dateValue) {
    alert("Please enter a date!");
  } else {
    const list = getOrCreateList(dateValue);
    createTask(list, inputValue);
  }

  
  inputBox.value = "";
  saveData();
}

function getOrCreateList(date) {
  let list = listContainer.querySelector(`ul[data-date="${date}"]`);
  if (!list) {
    list = document.createElement("ul");
    list.setAttribute("data-date", date);
    listContainer.appendChild(list);

    const titleElement = document.createElement("h2");
    titleElement.innerHTML = `${titleInput.value} (${date}) <span class="delete-list" onclick="deleteList(event)">&times;</span>`;
    list.appendChild(titleElement);
  }
  return list;
}

function createTask(list, value) {
  const li = document.createElement("li");
  li.innerHTML = value + '<span class="delete-task" onclick="deleteTask(event)">&times;</span>';
  list.appendChild(li);
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("delete-task")) {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function deleteList(event) {
  const list = event.target.parentElement.parentElement;
  list.remove();
  saveData();
}

function deleteTask(event) {
  const task = event.target.parentElement;
  task.remove();
  saveData();
}

function saveData() {
  localStorage.setItem("todoData", listContainer.innerHTML);
}

function showTask() {
  const selectedDate = dateInput.value.trim();
  const allLists = listContainer.querySelectorAll("ul[data-date]");

  allLists.forEach(function (list) {
    list.style.display = list.getAttribute("data-date") === selectedDate ? "block" : "none";
  });

  saveData();
}

dateInput.addEventListener("change", showTask);

function loadSavedData() {
  const savedData = localStorage.getItem("todoData");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
}

loadSavedData();