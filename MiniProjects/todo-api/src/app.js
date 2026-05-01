const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware to parse form data and JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'view')));

// Routes
app.use("/", todoRoutes);

module.exports = app;