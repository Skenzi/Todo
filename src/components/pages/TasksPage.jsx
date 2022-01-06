import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListTasks from '../ListTasks.jsx';
import TaskNote from '../TaskNote.jsx';
import { currentTask } from '../../store/selectors/index.js';

function TasksButtons({ setTypeTasks }) {
  return (
    <div className="f-row buttons-group">
      <button type="button" onClick={() => setTypeTasks('active')} className="button button-task">Active</button>
      <button type="button" onClick={() => setTypeTasks('succefull')} className="button button-task">Complited</button>
      <button type="button" onClick={() => setTypeTasks('failed')} className="button button-task">Failed</button>
    </div>
  );
}

function TasksPage() {
  const [typeTasks, setTypeTasks] = useState('active');
  const task = useSelector(currentTask);
  return (
    <>
      <TasksButtons setTypeTasks={setTypeTasks} />
      <div className="f-row">
        <ListTasks currentTasksStatus={typeTasks} />
        {task && task.status === typeTasks ? <TaskNote /> : null}
      </div>
    </>
  );
}

export default TasksPage;
