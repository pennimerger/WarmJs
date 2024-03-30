const todoList = [];
renderTodoList()

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todo, i) => {
    if (todo.name === 'Check snapchat') {
      return; // no snapchat today.
    }
    const html = `
      <div>${todo.name}</div>
      <div>${todo.dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHTML += html;
  });
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, i) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(i, 1); // delete once at that index
      renderTodoList();
    });
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => { addTodo(); });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date');
  const dueDate = dateInputElement.value;

  todoList.push({
    name: name,
    dueDate: dueDate,
  });

  inputElement.value = '' // reset to empty

  renderTodoList();
}