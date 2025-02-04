/**
 * Array que armazena a lista de tarefas.
 * @type {Array<Object>}
 */
let tasks = [];

/**
 * @typedef {Object} Task
 * @property {string} nome - O nome da tarefa.
 * @property {string} etiqueta - A etiqueta associada à tarefa.
 * @property {string} dataHora - A data e hora formatadas da tarefa.
 * @property {boolean} concluido - Indica se a tarefa foi concluída.
 */

const counterTasks = document.getElementById("counter-tasks");
const form = document.getElementById("form-inputs");
const taskContainer = document.getElementById("tasks-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  newtask();
});

/**
 * Formata uma data para o padrão brasileiro (dd/mm/aaaa).
 * @param {Date} date - A data a ser formatada.
 * @returns {string} - A data formatada.
 */
function getDateFormatted(date) {
  const dateTimeFormatted = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return dateTimeFormatted;
}

/**
 * Cria uma nova tarefa com base nos valores do formulário e a adiciona à lista de tarefas.
 * e também adiciona a tarefa ao local storage.
 * @param {Event} event - O evento de submit do formulário.
 */
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

/**
 * Limpa os campos do formulário após a adição de uma nova tarefa.
 */
function clearform() {
  document.getElementById("nome").value = "";
  document.getElementById("etiqueta").value = "";
}

/**
 * Adiciona uma tarefa ao container de tarefas na interface do usuário.
 * @param {Task} task - A tarefa a ser adicionada.
 * @param {number} index - O índice da tarefa na lista de tarefas.
 */
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

/**
 * Carrega as tarefas salvas no localStorage e as exibe na interface do usuário.
 */
function loadTasks() {
  const tasksInStorage = JSON.parse(localStorage.getItem("tasks"));
  tasks = [...tasksInStorage];

  for (let i = 0; i < tasksInStorage.length; i++) {
    addTask(tasksInStorage[i], i);
  }

  updateCompletedCounter();
}

/**
 * Atualiza o contador de tarefas concluídas na interface do usuário.
 */
function updateCompletedCounter() {
  let completedTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].concluido === true) {
      completedTasks++;
    }
  }

  counterTasks.textContent = `${completedTasks} tarefas concluídas`;
}
