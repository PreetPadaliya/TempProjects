// Import required packages
const express = require("express");
const path = require("path");
const router = express.Router();

// Simple array to store todos (resets when server restarts)
let todos = [];
let nextId = 1;

// Route 1: Show the home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
});

// Route 2: Get all todos
router.get("/todos", (req, res) => {
  res.json(todos); // Send todos as JSON
});

// Route 3: Add a new todo
router.post("/add", (req, res) => {
  const title = req.body.title; // Get title from request
  
  if (title) {
    // Create new todo object
    const newTodo = {
      id: nextId,
      title: title,
      completed: false
    };
    
    todos.push(newTodo); // Add to array
    nextId++; // Increase ID for next todo
    
    res.json(newTodo); // Send back the new todo
  } else {
    res.json({ error: 'Please enter a todo' });
  }
});

// Route 4: Mark todo as complete/incomplete
router.post("/toggle/:id", (req, res) => {
  const id = Number(req.params.id); // Get ID from URL
  
  // Find the todo in array
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // Flip the completed status
      todos[i].completed = !todos[i].completed;
      res.json(todos[i]); // Send back updated todo
      return;
    }
  }
  
  res.json({ error: 'Todo not found' });
});

// Route 5: Delete a todo
router.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id); // Get ID from URL
  
  // Remove todo from array
  todos = todos.filter(todo => todo.id !== id);
  
  res.json({ message: 'Todo deleted' });
});

// Export router so other files can use it
module.exports = router;
