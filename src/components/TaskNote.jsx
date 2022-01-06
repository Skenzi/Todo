import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentTask, userSelector } from '../store/selectors/index';
import paper from '../images/paper.png';
import seal from '../images/seal.png';
import handWithPen from '../images/handWithPen.png';
import { setTaskStatus, deleteTask, setTaskText } from '../store/slices/tasksSlice.js';
import { setLevel, setExp } from '../store/slices/userSlice.js';

function TaskForm({ task, setStateTaskForm }) {
  const dispatch = useDispatch();
  const [newText, setText] = useState(task.text);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setTaskText({ id: task.id, newText }));
    setStateTaskForm(false);
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea className="form-control" rows="15" style={{ resize: 'none' }} value={newText} onChange={(e) => setText(e.target.value)} />
      <button type="submit" className="button button-submit">Изменить</button>
      <button type="button" className="button" onClick={() => setStateTaskForm(false)}>Отменить</button>
    </form>
  );
}

function TaskBody({ task, compliteTask, setStateTaskForm }) {
  return (
    <>
      <div className="task-text">{task.text}</div>
      <div className="task-reward" data-exp="100">
        <h2 className="task-reward-title">Награда</h2>
        <div className="task-reward-text">
          {task.reward}
          {' '}
          опыта
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

function TaskNote() {
  const user = useSelector(userSelector);
  const task = useSelector(currentTask);
  const [stateTaskForm, setStateTaskForm] = useState(false);
  const dispatch = useDispatch();
  const compliteTask = () => {
    const newExpUser = task.reward + user.exp;
    if (newExpUser >= user.expNextLvl) {
      dispatch(setLevel({ expNextLvl: Math.ceil(user.expNextLvl * 1.2), level: user.level + 1 }));
      dispatch(setExp(newExpUser - user.expNextLvl));
    } else {
      dispatch(setExp(newExpUser));
    }
    dispatch(setTaskStatus({ id: task.id, status: 'succefull' }));
  };
  const removeTask = (id) => () => {
    dispatch(deleteTask(id));
  };
  return (
    <section className="task-note">
      <img src={paper} alt="scroll" className="task-img" />
      <div className="task-header">
        <h2 className="task-name">{task.name}</h2>
        <button type="button" className="button" onClick={removeTask(task.id)}>Выкинуть квест</button>
      </div>
      <div className="task-body">
        {stateTaskForm
          ? <TaskForm task={task} setStateTaskForm={setStateTaskForm} />
          : (
            <TaskBody
              setStateTaskForm={setStateTaskForm}
              task={task}
              compliteTask={compliteTask}
            />
          )}
      </div>
    </section>
  );
}

export default TaskNote;
