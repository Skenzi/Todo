import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentTask } from "../store/selectors/index.js";
import paper from '../images/paper.png';
import seal from '../images/seal.png';
import handWithPen from '../images/handWithPen.png';
import { setTaskStatus, deleteTask, setTaskText } from "../store/slices/tasksSlice.js";

const TaskForm = ({ task, setStateTaskForm }) => {
    const dispatch = useDispatch();
    const [newText, setText] = useState(task.text);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setTaskText({id: task.id, newText}))
        setStateTaskForm(false);
    };
    return <form onSubmit={onSubmit}>
        <textarea value={newText} onChange={(e) => setText(e.target.value)}></textarea>
        <button type="submit" className="button">Изменить</button>
    </form>
};

const TaskBody = ({ task, compliteTask, setStateTaskForm }) => {
    return <>
        <div className="task-text">{task.text}</div>
            <div className="buttons-group">
            {task.status === 'active' ? <>
            <button type="button" className="button button-with-img" onClick={compliteTask(task.id)}><img src={seal} alt="compliteNote" className="button-img" /></button>
            <button type="button" className="button button-with-img" onClick={() => setStateTaskForm(true)}><img src={handWithPen} alt="changeNote" className="button-img" /></button></> : null}
        </div>
    </>
};

const TaskNote = () => {
    const task = useSelector(currentTask);
    const [stateTaskForm, setStateTaskForm] = useState(false);
    const dispatch = useDispatch();
    const compliteTask = (id) => () => {
        dispatch(setTaskStatus({id, status: 'succefull'}))
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