// TODO: add reward

import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/selectors/index';
import { deleteTask, setContentTask } from '../store/slices/tasksSlice.js';
import { setLevel, setExp } from '../store/slices/userSlice.js';
import { Task, TaskFormProps, TaskBodyProps } from '../types/types';

const paper = require("../images/paper.png");
const seal = require("../images/seal.png");
const handWithPen = require("../images/handWithPen.png");

function TaskForm({ task, setStateTaskForm }: TaskFormProps) {
  const dispatch = useDispatch();
  const [newText, setText] = useState(task.text);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setContentTask({ id: task.id, property: 'text', value: newText }));
    axios.put('http://localhost:5000/changeTask', { id: task.id, property: 'text', value: newText })
    setStateTaskForm(false);
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea className="form-control" rows={15} style={{ resize: 'none' }} value={newText} onChange={(e) => setText(e.target.value)} />
      <button type="submit" className="button button-submit">Изменить</button>
      <button type="button" className="button" onClick={() => setStateTaskForm(false)}>Отменить</button>
    </form>
  );
}

function TaskBody({ task, setStateTaskForm, compliteTask }: TaskBodyProps) {
  return (
    <>
      <div className="task-text">{task.text}</div>
      <div className="task-reward" data-exp="100">
        <h2 className="task-reward-title">Награда</h2>
        <div className="task-reward-text">
          {task.reward} очков опыта
        </div>
      </div>
      {task.status === 'active' ? (
        <>
          <button type="button" className="button button-with-img img-complite" onClick={compliteTask}><img src={seal} alt="compliteNote" className="button-img" /></button>
          <button type="button" className="button button-with-img img-change" onClick={() => setStateTaskForm(true)}><img src={handWithPen} alt="changeNote" className="button-img" /></button>
        </>
      )
        : null}
    </>
  );
}

function TaskNote({ task }: { task: Task }) {
  const user = useSelector(userSelector);
  const [stateTaskForm, setStateTaskForm] = useState(false);
  const dispatch = useDispatch();


  const compliteTask = () => {
    let newExpUser = task.reward + user.exp;
    let expNextLvl = user.expNextLvl;
    let level = user.level;
  
    if (newExpUser >= user.expNextLvl) {
      while (expNextLvl <= newExpUser) {
        newExpUser -= expNextLvl;
        expNextLvl = Math.ceil(expNextLvl * 1.2);
        level += 1;
      }
      dispatch(setLevel({ expNextLvl, level }));
      dispatch(setExp(newExpUser));
    } else {
      dispatch(setExp(newExpUser));
    }
    
    dispatch(setContentTask({ id: task.id, property: 'status', value: 'complited' }));
    axios.put('http://localhost:5000/changeTask', { id: task.id, property: 'status', value: 'complited' })
  };


  const removeTask = (id: number) => () => {
    dispatch(deleteTask(id));
    axios.delete('http://localhost:5000/deleteTask/' + id);
  };

  return (
    <section className="task-note">
      <img src={String(paper)} alt="scroll" className="task-img" />
      <div className="task-header">
        <h2 className="task-name">{task.title}</h2>
        <button type="button" className="button" onClick={removeTask(task.id)}>Выкинуть квест</button>
      </div>
      <div className="task-body">
        {stateTaskForm
          ? <TaskForm task={task} setStateTaskForm={setStateTaskForm} />
          : (
            <TaskBody
              compliteTask={compliteTask}
              setStateTaskForm={setStateTaskForm}
              task={task}
            />
          )}
      </div>
    </section>
  );
}

export default TaskNote;
