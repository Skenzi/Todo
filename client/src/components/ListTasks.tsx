import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tasksActiveSelector, tasksSuccefullSelector, tasksFailedSelector } from '../store/selectors';
import { checkTasks, setCurrentTaskId } from '../store/slices/tasksSlice';
import { setStateModal } from '../store/slices/modalSlice';
import apiContext from '../context/index';

/*const tasksSelectors = {
  active: tasksActiveSelector,
  succefull: tasksSuccefullSelector,
  failed: tasksFailedSelector,
};*/

function ListTasks({ currentTasksStatus }: { currentTasksStatus: string }) {
  const dispatch = useDispatch();
  const { elements } = useContext(apiContext);
  const setModal = () => {
    dispatch(setStateModal(true));
    elements.body.classList.add('modal-open');
  };
  return (
    <div className="tasks bg-main">
      {currentTasksStatus === 'active' ? <button type="button" className="button" onClick={setModal}>Add quest</button> : null}
      <ol className="tasks-list">
      </ol>
    </div>
  );
}

export default ListTasks;
