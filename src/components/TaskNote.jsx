import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentTask } from "../store/selectors/index.js";
import paper from '../images/paper.png';
import seal from '../images/seal.png';
import handWithPen from '../images/handWithPen.png';
import { setTaskStatus, deleteTask } from "../store/slices/tasksSlice.js";

const TaskNote = () => {
    const task = useSelector(currentTask);
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
                <div className="task-text">{task.text}</div>
                <div className="buttons-group">
                    {task.status === 'active' ? <>
                    <button type="button" className="button button-with-img" onClick={compliteTask(task.id)}><img src={seal} alt="compliteNote" className="button-img" /></button>
                    <button type="button" className="button button-with-img"><img src={handWithPen} alt="changeNote" className="button-img" /></button></> : null}
                </div>
            </div>
        </section>;
}

export default TaskNote;