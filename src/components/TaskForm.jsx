import React from 'react';

const TaskForm = ({ task = {}, onChange, onSubmit }) => {
  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['To Do', 'In Progress', 'Completed'];

  return (
    <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create / Edit Task</h2>

      <label className="block mb-2">
        <span className="text-gray-700">Title</span>
        <input
          name="title"
          value={task.title || ''}
          onChange={onChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          placeholder="Task title"
          required
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Description</span>
        <textarea
          name="description"
          value={task.description || ''}
          onChange={onChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          placeholder="Task description"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Priority</span>
        <select
          name="priority"
          value={task.priority || 'Low'}
          onChange={onChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Status</span>
        <select
          name="status"
          value={task.status || 'To Do'}
          onChange={onChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
