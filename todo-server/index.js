const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Create new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    _id: new Date().getTime().toString(),
    title: req.body.title,
    description: req.body.description,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = {
    _id: todoId,
    title: req.body.title,
    description: req.body.description,
  };
  todos = todos.map((todo) => (todo._id === todoId ? updatedTodo : todo));
  res.json(updatedTodo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter((todo) => todo._id !== todoId);
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
