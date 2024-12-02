import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoPage.css';

function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/task-list/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to toggle the completion status of a task
  const toggleCompletion = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`http://127.0.0.1:8000/api/task-update/${task.id}/`, updatedTask);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/task-delete/${id}/`);
      fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditTask(task);
    setNewTask(task.title);
  };

  // Update a task with a new title
  const updateTask = async () => {
    try {
      if (!editTask || !newTask.trim()) return;
      await axios.put(`http://127.0.0.1:8000/api/task-update/${editTask.id}/`, {
        title: newTask,
        completed: editTask.completed,
      });
      setEditTask(null);
      setNewTask('');
      fetchTasks(); // Refresh the task list after updating
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      if (!newTask.trim()) return;
      const newTaskData = {
        title: newTask,
        completed: false,
      };
      await axios.post('http://127.0.0.1:8000/api/task-create/', newTaskData);
      setNewTask('');
      fetchTasks(); // Refresh the task list after creating
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Run fetchTasks on component mount to load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-page">
      <h1>Todo List</h1>
      <div className="create-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={createTask} className="btn-primary">
          Add Task
        </button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <div className="task-content">
              <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            </div>
            <div className="task-buttons">
              {task.completed ? (
                <button onClick={() => toggleCompletion(task)} className="btn-warning">
                  Mark Uncompleted
                </button>
              ) : (
                <>
                  <button onClick={() => startEditing(task)} className="btn-secondary">
                    Update
                  </button>
                  <button onClick={() => toggleCompletion(task)} className="btn-success">
                    Complete
                  </button>
                </>
              )}
              <button onClick={() => deleteTask(task.id)} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editTask && (
        <div className="update-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Update task"
          />
          <button onClick={updateTask} className="btn-primary">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoPage;
