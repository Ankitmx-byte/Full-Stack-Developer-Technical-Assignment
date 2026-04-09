import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Could not load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Could not add task.');
    }
  };

  const toggleTask = async (id, completed) => {
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
      if (!res.ok) throw new Error('Failed to update task');
    } catch (err) {
      // Revert on failure
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
      setError('Could not update task.');
    }
  };

  const editTaskTitle = async (id, title) => {
    const originalTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t));
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!res.ok) throw new Error('Failed to update task title');
    } catch (err) {
      setTasks(originalTasks);
      setError('Could not update task title.');
    }
  };

  const deleteTask = async (id) => {
    const originalTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
    } catch (err) {
      setTasks(originalTasks);
      setError('Could not delete task.');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // all
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <TaskForm onAdd={addTask} />

      {error && <div className="status error">{error}</div>}
      
      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="status">Loading tasks...</div>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTaskTitle}
        />
      )}
    </div>
  );
}

export default App;
