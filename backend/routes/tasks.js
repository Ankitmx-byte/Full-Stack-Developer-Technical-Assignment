const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataPath = path.join(__dirname, '../data.json');

// Helper to read data (or send empty array if file missing)
const readData = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// GET /tasks
router.get('/', (req, res) => {
  const tasks = readData();
  res.json(tasks);
});

// POST /tasks
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = readData();
  const newTask = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  
  const tasks = readData();
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update properties if provided
  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    tasks[taskIndex].title = title.trim();
  }
  
  if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }

  writeData(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const tasks = readData();
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  writeData(tasks);
  res.status(204).send();
});

module.exports = router;
