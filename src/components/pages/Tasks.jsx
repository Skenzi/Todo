import React from 'react';
import { useSelector } from 'react-redux';
import ListTasks from '../ListTasks.jsx';
import TaskNote from '../TaskNote.jsx';
import { currentTask } from '../../store/selectors/index.js';

function Tasks({ typeTasks }) {
  const task = useSelector(currentTask);
  return (
    <>
      <ListTasks currentTasksStatus={typeTasks} />
      {task && task.status === typeTasks ? <TaskNote /> : null}
    </>
  );
}

export default Tasks;
