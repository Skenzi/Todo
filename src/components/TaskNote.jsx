import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentTask } from "../store/selectors/index.js";
import paper from '../images/paper.png';
import seal from '../images/seal.png';
import handWithPen from '../images/handWithPen.png';
import { setTaskStatus, deleteTask, setTaskText } from "../store/slices/tasksSlice.js";
import { useContext } from "react";
import apiContext from "../context/index.js";

const TaskForm = ({ task, setStateTaskForm }) => {
    const dispatch = useDispatch();
    const [newText, setText] = useState(task.text);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setTaskText({id: task.id, newText}))
        setStateTaskForm(false);
    };
    return <form onSubmit={onSubmit}>
        <textarea className="form-control" rows="15" style={{resize: 'none'}} value={newText} onChange={(e) => setText(e.target.value)}></textarea>
        <button type="submit" className="button button-submit">Изменить</button>
        <button type="button" className="button" onClick={() => setStateTaskForm(false)}>Отменить</button>
    </form>
};

const TaskBody = ({ task, compliteTask, setStateTaskForm }) => {
    return <>
        <div className="task-text">{task.text}</div>
        <div className="task-reward" data-exp="100">
            <h2 className="task-reward-title">Награда</h2>
            <div className="task-reward-text">{task.reward} опыта</div>
        </div>
        {task.status === 'active' ? <>
            <button type="button" className="button button-with-img img-complite" onClick={compliteTask(task.id)}><img src={seal} alt="compliteNote" className="button-img" /></button>
            <button type="button" className="button button-with-img img-change" onClick={() => setStateTaskForm(true)}><img src={handWithPen} alt="changeNote" className="button-img" /></button></>
            : null
        }
    </>
};

const TaskNote = () => {
    const { user, setUser } = useContext(apiContext);
    const task = useSelector(currentTask);
    const [stateTaskForm, setStateTaskForm] = useState(false);
    const dispatch = useDispatch();
    const compliteTask = (id) => () => {
        const newExpUser = task.reward + user.exp;
        if (newExpUser >= user.expNextLvl) {
            setUser({...user, expNextLvl: Math.ceil(user.expNextLvl * 1.2), exp: newExpUser - user.expNextLvl, level: user.level + 1});
        } else {
            setUser({...user, exp: newExpUser});
        };
        dispatch(setTaskStatus({id, status: 'succefull'}));
    };
    const removeTask = (id) => () => {
        dispatch(deleteTask(id));
    }
    return <section className="task-note">
            <img src={paper} className="task-img" />
            <div className="task-header">
                <h2 className="task-name">{task.name}</h2>
                <button type="button" className="button" onClick={removeTask(task.id)}>Выкинуть квест</button>
            </div>
            <div className="task-body">
                {stateTaskForm ? <TaskForm task={task} setStateTaskForm={setStateTaskForm}  /> : <TaskBody setStateTaskForm={setStateTaskForm} task={task} compliteTask={compliteTask} />}
            </div>
        </section>;
}

export default TaskNote;