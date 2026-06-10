crypto.randomUUID();
console.log(crypto.randomUUID());

type Task = {id: string, title: string, completed: boolean, createdAt: Date};

const list = document.querySelector<HTMLUListElement>("#list") as HTMLUListElement | null;
const form = document.querySelector<HTMLFormElement>("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title") as HTMLInputElement | null;

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if(input?.value == "" || input?.value == null) return; //Check if empty or null
  
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(task);

  addListItem(task);

  input.value = ""; //Clear input after submit
});

function addListItem(task: Task) {
    const item = document.createElement("li");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks() : Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  
  if (taskJSON == null) return [];

  return JSON.parse(taskJSON)
}
