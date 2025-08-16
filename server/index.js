const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection failed:", err));

app.get('/', (req, res) => res.send('API is live.'));

// GET all tasks
app.get('/todos', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// GET task by ID
app.get('/todos/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// POST create task
app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title });
  await newTask.save();
  res.status(201).json(newTask);
});

// PUT update task
app.put('/todos/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title;
  await task.save();
  res.json(task);
});

// DELETE task
app.delete('/todos/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.json(task);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
