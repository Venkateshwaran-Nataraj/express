const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
];


app.get('/api/v1/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/v1/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

app.post('/api/v1/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).send('Title is required');
  
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/v1/tasks/:id', (req, res) => {
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  
  if (title) task.title = title;
  if (completed !== undefined) task.completed = completed;
  
  res.json(task);
console.log(req.body);

});

app.delete('/api/v1/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
