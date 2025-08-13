import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList"; // Make sure this exists

const Home = () => {
  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tasks", task);
      const response = await axios.get("http://localhost:3000/api/tasks");
      setTasks(response.data);
      setTask({});
    } catch (error) {
      console.error("Error submitting task:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} />
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
