import React, { useState, useEffect } from 'react'
import TaskList from '../components/TaskListComponent'
import TaskInput from '../components/TaskInputComponent'
import TaskFiltering from '../components/TaskFilteringComponent'
import styles from './TaskListPage.module.scss'
import { fetchTasks, addTask as addTaskApi, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from '../api';
const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const initialTasks = await fetchTasks()
        console.log(initialTasks)
        setTasks(initialTasks.slice(-5))
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const addTask =async (name) => {
    const newTask = { title: name, completed: false };
    try {
      const addedTask = await addTaskApi(newTask);
      console.log(addedTask)
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(task => task.id === id);
    try {
      const updatedTask = await updateTaskApi(id, { ...task, completed: !task.completed });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
 const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.container_heading}>Task Management</h2>
      <TaskInput onAddTask={addTask} styles={styles} />
      <TaskFiltering filter={filter} setFilter={setFilter} styles={styles} />
      <TaskList tasks={filteredTasks} onToggleComplete={toggleComplete} onDelete={deleteTask} styles={styles} />
    </div>
  );
};

export default TaskListPage;

