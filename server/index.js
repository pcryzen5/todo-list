const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json()); // Parse incoming JSON

// Connect to MongoDB
mongoose.connect('mongodb+srv://Shubham:shubham(56)@cluster0.nz6emhg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection failed:", err));

app.get('/', (req, res) => res.send('API is live.'));

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// GET task by ID
app.get('/api/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// POST create task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title });
  await newTask.save();
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title;
  await task.save();
  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.json(task);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/tasks`);
});
