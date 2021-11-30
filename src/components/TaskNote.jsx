import React from "react";
import { useSelector } from "react-redux";
import { currentTask } from "../store/selectors/index.js";
import paper from '../images/paper.png';
import seal from '../images/seal.png';
import handWithPen from '../images/handWithPen.png';

const TaskNote = () => {
    const task = useSelector(currentTask);
    return <section className="task-note">
            <img src={paper} className="task-img" />
            <div className="task-header">
                <h2 className="task-name">{task.name}</h2>
                <button type="button" className="button">Отменить квест</button>
            </div>
            <div className="task-body">
                <div className="task-text">{task.text}</div>
                <div className="buttons-group">
                    {task.status === 'active' ? <>
                    <button type="button" className="button button-with-img"><img src={seal} alt="compliteNote" className="button-img" /></button>
                    <button type="button" className="button button-with-img"><img src={handWithPen} alt="changeNote" className="button-img" /></button></> : null}
                </div>
            </div>
        </section>;
}

export default TaskNote;