import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from './Card';
import Button from './Button';
import styles from './TaskManager.module.css';

function TaskManager() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Active');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTitle('');
      setStatus('Active');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.taskManager}>
      <h1>Task Manager</h1>
      <form onSubmit={handleAddTask} >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <Button type="submit" className={styles.button}>Add Task</Button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task._id} className={styles.taskItem}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
      </div>
  );
}



export default TaskManager;