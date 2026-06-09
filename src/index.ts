crypto.randomUUID();
console.log(crypto.randomUUID());

type Task = {id: string, title: string, completed: boolean, createdAt: Date};

const list = document.querySelector<HTMLUListElement>("#list") as HTMLUListElement | null;
const form = document.querySelector<HTMLFormElement>("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title") as HTMLInputElement | null;

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if(input?.value == "" || input?.value == null) return; //Check if empty or null
  
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  addListItem(task);
});

function addListItem(task: Task) {
    const item = document.createElement("li");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}
