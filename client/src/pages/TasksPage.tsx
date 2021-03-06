import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ListTasks from '../components/ListTasks';
import TaskNote from '../components/TaskNote';
import { currentTask, userSelector } from '../store/selectors/index.js';
import { useEffect, useContext } from 'react';
import apiContext from '../context/index';
import { useNavigate } from 'react-router-dom';
import { setTasks, setStatusTasks } from '../store/slices/tasksSlice';
import { Task } from '../types/types';

function TasksButtons() {
  const dispatch = useDispatch();
  return (
    <div className="f-row buttons-group">
      <button type="button" onClick={() => dispatch(setStatusTasks('active'))} className="button button-bar button-lg">Active</button>
      <button type="button" onClick={() => dispatch(setStatusTasks('complited'))} className="button button-bar button-lg">Complited</button>
      <button type="button" onClick={() => dispatch(setStatusTasks('failed'))} className="button button-bar button-lg">Failed</button>
    </div>
  );
}

function TasksPage() {
  const dispatch = useDispatch();
  const api = useContext(apiContext);
  const task = useSelector(currentTask);
  const navigation = useNavigate();
  const {user} = useSelector(userSelector)

  useEffect(() => {
    const response = axios.get('http://localhost:5000/data', {
      headers: api.getAutorizedHeader(),
    });

    response.then(({ data }) => {
      dispatch(setTasks(data));
    })
    .catch(err => {
      navigation('/loginPage', { replace: true })
    })
  }, [user])
  return (
    <>
      <TasksButtons />
      <div className="f-row">
        <ListTasks />
        {task ? <TaskNote task={task} /> : null}
      </div>
    </>
  );
}

export default TasksPage;
