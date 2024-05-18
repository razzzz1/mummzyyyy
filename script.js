const taskList = document.getElementById('tasks-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const completionPercentage = document.getElementById('completion-percentage');
const name = document.getElementById('name2complain');


let tasks = getTasksFromStorage();

function getTasksFromStorage() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function setTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      setTasksToStorage(tasks);
      updateCompletionPercentage();
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        setTasksToStorage(tasks);
        renderTasks();
      }
    });
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task.text));
    taskList.appendChild(listItem);
  });
  updateCompletionPercentage();
}

function updateCompletionPercentage() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage = Math.floor((completedTasks / tasks.length) * 100);
  completionPercentage.textContent = `Completion Percentage: ${percentage}%`;
}

addTaskButton.addEventListener('click', function() {
  const newTaskText = newTaskInput.value.trim();
  if (newTaskText) {
    tasks.push({ text: newTaskText, completed: false });
    setTasksToStorage(tasks);
    renderTasks();
    newTaskInput.value = '';
  }
});

renderTasks();
