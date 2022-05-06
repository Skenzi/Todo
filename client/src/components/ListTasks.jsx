import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tasksActiveSelector, tasksSuccefullSelector, tasksFailedSelector } from '../store/selectors';
import { checkTasks, setCurrentTaskId } from '../store/slices/tasksSlice';
import { setStateModal } from '../store/slices/modalSlice';
import apiContext from '../context/index';

const tasksSelectors = {
  active: tasksActiveSelector,
  succefull: tasksSuccefullSelector,
  failed: tasksFailedSelector,
};

function ListTasks({ currentTasksStatus }) {
  const dispatch = useDispatch();
  const { elements } = useContext(apiContext);
  useEffect(() => {
    dispatch(checkTasks());
  }, []);
  const tasks = useSelector(tasksSelectors[currentTasksStatus]);
  const setModal = () => {
    dispatch(setStateModal(true));
    elements.body.classList.add('modal-open');
  };
  return (
    <div className="tasks bg-main">
      {currentTasksStatus === 'active' ? <button type="button" className="button" onClick={setModal}>Add quest</button> : null}
      <ol className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <button type="button" className="button" onClick={() => dispatch(setCurrentTaskId(task.id))}>
              <h2 className="task-name">{task.name}</h2>
              <div>
                До:
                {task.dateEnd}
              </div>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ListTasks;
