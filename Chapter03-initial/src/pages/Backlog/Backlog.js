import React, { useState, useEffect } from 'react';
import useDataFetching from '../../hooks/useDataFetching';
import './Backlog.css';
import Task from '../../components/Task/Task';

export default function Backlog({ onDropToBoard }) {
  const [loading, error, tasks] = useDataFetching(
    `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks`
  );
  const [backlogTasks, setBacklogTasks] = useState([]);

  useEffect(() => {
    setBacklogTasks(tasks);
  }, [tasks]);

  function onDragStart(e, id) {
    e.dataTransfer.setData('id', id);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    const id = e.dataTransfer.getData('id');
    const draggedTask = backlogTasks.find((task) => task.id.toString() === id);

    // Remove the dragged task from the Backlog tasks
    const updatedTasks = backlogTasks.filter((task) => task.id.toString() !== id);

    // Notify the Board component about the drop
    onDropToBoard(draggedTask);

    // Update the Backlog tasks without the dragged task
    setBacklogTasks(updatedTasks);
  }

  return (
    <div className='Backlog-Wrapper' onDragOver={onDragOver} onDrop={onDrop}>
      <h2>Backlog</h2>
      <div className='Tasks-Wrapper'>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          backlogTasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              body={task.body}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
