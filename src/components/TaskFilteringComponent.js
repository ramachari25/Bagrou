import React from 'react';
const TaskFilteringComponent = ({ filter, setFilter,styles }) => {
return (
    <div className={styles.status_btn_container}>
      
      <button className={`${styles.status_btn} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>All</button>
      <button className={`${styles.status_btn} ${filter === 'completed' ? styles.active : ''}`} onClick={() => setFilter('completed')}>Completed</button>
      <button className={`${styles.status_btn} ${filter === 'incomplete' ? styles.active : ''}`} onClick={() => setFilter('incomplete')}>Incomplete</button>
    </div>
  );
};

export default TaskFilteringComponent;
