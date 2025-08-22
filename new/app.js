// Select elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

// Add new todo
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveAndRender();
    todoInput.value = '';
    todoInput.focus();
  }
});

// Handle enter key
todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'todo-text' + (todo.completed ? ' completed' : '');
    span.addEventListener('click', () => toggleTodo(idx));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => deleteTodo(idx));

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// Toggle complete
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

// Save and re-render
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}