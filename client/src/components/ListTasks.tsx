import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentTasks, currentTab } from '../store/selectors';
import { setCurrentTaskId } from '../store/slices/tasksSlice';
import { setStateModal } from '../store/slices/modalSlice';
import apiContext from '../context/index';
import { Task } from '../types/types';

function ListTasks() {
  const tasks = useSelector(currentTasks);
  const currentTasksStatus = useSelector(currentTab);
  const dispatch = useDispatch();
  const { elements } = useContext(apiContext);
  const openModal = () => {
    dispatch(setStateModal(true));
    elements.body.classList.add('modal-open');
  };
  return (
    <div className="tasks bg-main">
      {currentTasksStatus === 'active' ? <button type="button" className="button tasks__list-button" onClick={openModal}>Add quest</button> : null}
      <ol className="tasks__list">
        {tasks.map((task: Task) => {
          const date = new Date(task.dateEnd);
          return (
            <li key={task.id}>
              <button className='button tasks__list-button' onClick={() => dispatch(setCurrentTaskId(task.id))}>
                <h3>{task.title}</h3>
                <p>{task.text}</p>
                <p>До: {date.toLocaleDateString()}</p>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default ListTasks;
