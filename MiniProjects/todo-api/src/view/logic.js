// Load todos when page loads
window.addEventListener('DOMContentLoaded', loadTodos);

// Add todo when button clicked
document.getElementById('addBtn').addEventListener('click', addTodo);

// Add todo when Enter key pressed
document.getElementById('addItem').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Load all todos from server
async function loadTodos() {
  try {
    const response = await fetch('/todos');
    const todos = await response.json();
    displayTodos(todos);
  } catch (error) {
    console.error('Error loading todos:', error);
  }
}

// Display todos on the page
function displayTodos(todos) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  if (todos.length === 0) {
    taskList.innerHTML = '<li class="empty-message">No todos yet! Add one above.</li>';
    return;
  }
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }
    
    li.innerHTML = `
      <div class="todo-content" onclick="toggleTodo(${todo.id})">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onclick="event.stopPropagation(); toggleTodo(${todo.id})">
        <span class="todo-text">${todo.title}</span>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    
    taskList.appendChild(li);
  });
}

// Add a new todo
async function addTodo() {
  const input = document.getElementById('addItem');
  const title = input.value.trim();
  
  if (!title) {
    alert('Please enter a todo!');
    return;
  }
  
  try {
    const response = await fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    
    if (response.ok) {
      input.value = '';
      loadTodos();
    } else {
      alert('Failed to add todo');
    }
  } catch (error) {
    console.error('Error adding todo:', error);
    alert('Error adding todo');
  }
}

// Toggle todo completed status
async function toggleTodo(id) {
  try {
    const response = await fetch(`/toggle/${id}`, {
      method: 'POST'
    });
    
    if (response.ok) {
      loadTodos();
    }
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
}

// Delete a todo
async function deleteTodo(id) {
  if (!confirm('Delete this todo?')) {
    return;
  }
  
  try {
    const response = await fetch(`/delete/${id}`, {
      method: 'POST'
    });
    
    if (response.ok) {
      loadTodos();
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}
