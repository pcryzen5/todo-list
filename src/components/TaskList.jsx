import React, { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const fetchTasks = () => {
    fetch('http://localhost:3000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id || task.id);
    setNewTitle(task.title);
  };

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle })
    });

    setEditingTaskId(null);
    setNewTitle('');
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id || task.id}>
            {editingTaskId === (task._id || task.id) ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(task._id || task.id)}>✅</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => handleEdit(task)}>✏️</button>
                <button onClick={() => handleDelete(task._id || task.id)}>❌</button>
              </>
              
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
  