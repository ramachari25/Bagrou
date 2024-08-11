import React, { useState } from 'react';

const TaskInputComponent = ({ onAddTask,styles}) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName('');
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <button onClick={handleAddTask} className={styles.add_task_btn}>Add Task</button>
    </div>
  );
};

export default TaskInputComponent;
