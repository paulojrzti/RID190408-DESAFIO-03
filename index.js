let tasks = []; //lista de tarefas
let completedTasks = 0; //quantidade de tarefas concluidas

const counterTasks = document.getElementById("counter-tasks");
const form = document.getElementById("form-inputs");
const taskContainer = document.getElementById("tasks-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  newtask();
});

function newtask(event) {
  const task = {
    nome: document.getElementById("nome").value,
    etiqueta: document.getElementById("etiqueta").value,
    dataHora: new Date(),
  };
  tasks.push(task);
  clearform();
  addtask(task);
}

function clearform() {
  document.getElementById("nome").value = "";
  document.getElementById("etiqueta").value = "";
}

function addtask(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const dateTimeFormatted = task.dataHora.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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
  concluirBtn.addEventListener("click", () => {
    taskElement.classList.toggle("concluida");

    if (taskElement.classList.contains("concluida")) {
      completedTasks++;
      concluirBtn.innerHTML = "✔";
    } else {
      completedTasks--;
      concluirBtn.innerHTML = "Concluir";
    }
    updateCompletedCounter();
  });
}

function updateCompletedCounter() {
  counterTasks.textContent = `${completedTasks} tarefas concluídas`;
}
