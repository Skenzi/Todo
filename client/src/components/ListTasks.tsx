import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentTasks, statusTasks } from '../store/selectors';
import { setCurrentTaskId } from '../store/slices/tasksSlice';
import { setStateModal } from '../store/slices/modalSlice';
import apiContext from '../context/index';
import { Task } from '../types/types';

function ListTasks() {
  const tasks = useSelector(currentTasks);
  const currentTasksStatus = useSelector(statusTasks);
  console.log(currentTasksStatus, 'status')
  const dispatch = useDispatch();
  const { elements } = useContext(apiContext);
  const setModal = () => {
    dispatch(setStateModal(true));
    elements.body.classList.add('modal-open');
  };
  return (
    <div className="tasks bg-main">
      {currentTasksStatus === 'active' ? <button type="button" className="button" onClick={setModal}>Add quest</button> : null}
      <ol className="tasks__list">
        {tasks.map((task: Task) => {
          return (
            <li key={task.id}>
              <button className='button' onClick={() => setCurrentTaskId(task.id)}>
                <h3>{task.title}</h3>
                <p>{task.text}</p>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default ListTasks;
