let tasks = []; //lista de tarefas

const counterTasks = document.getElementById("counter-tasks");
const form = document.getElementById("form-inputs");
const taskContainer = document.getElementById("tasks-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  newtask();
});

function getDateFormatted(date) {
  const dateTimeFormatted = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return dateTimeFormatted;
}

function newtask(event) {
  const dateNow = new Date();
  const dateTimeFormatted = getDateFormatted(dateNow);

  const task = {
    nome: document.getElementById("nome").value,
    etiqueta: document.getElementById("etiqueta").value,
    dataHora: dateTimeFormatted,
    concluido: false,
  };
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  clearform();
  addTask(task, tasks.length - 1);
}

function clearform() {
  document.getElementById("nome").value = "";
  document.getElementById("etiqueta").value = "";
}

function addTask(task, index) {
  const dateTimeFormatted = getDateFormatted(task.dataHora);

  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
    <div class="task-text">
         <h3>${task.nome}</h3>
         <div class="task-etiqueta">
         <p>${task.etiqueta}</p>
         <small>Criado em: ${dateTimeFormatted}</small>
         </div>
     </div>
     <button class="concluir-btn">Concluir</button>
 `;

  taskContainer.appendChild(taskElement);
  const concluirBtn = taskElement.querySelector(".concluir-btn");

  if (task.concluido) {
    taskElement.classList.toggle("concluida");
    concluirBtn.innerHTML = "✔";
  }

  concluirBtn.addEventListener("click", () => {
    taskElement.classList.toggle("concluida");

    if (taskElement.classList.contains("concluida")) {
      tasks[index].concluido = true;
      concluirBtn.innerHTML = "✔";
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      tasks[index].concluido = false;
      concluirBtn.innerHTML = "Concluir";
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    updateCompletedCounter();
  });
}

function loadTasks() {
  const tasksInStorage = JSON.parse(localStorage.getItem("tasks"));
  tasks = [...tasksInStorage];

  for (let i = 0; i < tasksInStorage.length; i++) {
    addTask(tasksInStorage[i], i);
  }

  updateCompletedCounter();
}

function updateCompletedCounter() {
  let completedTasks = 0; //quantidade de tarefas concluidas

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].concluido === true) {
      completedTasks++;
    }
  }

  counterTasks.textContent = `${completedTasks} tarefas concluídas`;
}
