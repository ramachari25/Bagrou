import React from 'react';
const TaskListComponent = ({ tasks, onToggleComplete, onDelete,styles }) => {
  return (
    <ul >
      {tasks.map(task => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          {task.title}
          <button className={styles.delete_btn} onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskListComponent;
