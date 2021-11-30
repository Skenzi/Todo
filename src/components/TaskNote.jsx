import React from "react";
import { useSelector } from "react-redux";
import { currentTask } from "../store/selectors/index.js";
import paper from '../images/paper.png';

const TaskNote = () => {
    const task = useSelector(currentTask);
    return <section className="task-note">
            <img src={paper} className="task-img" />
            <h2 className="task-name">{task.name}</h2>
            <div className="task-text">{task.text}</div>
            <div className="buttons-group">
                {task.status === 'active' ? <><button type="button" className="button">Завершить</button><button type="button" className="button">Изменить</button></> : null}
                <button type="button" className="button">Удалить</button>
            </div>
        </section>;
}

export default TaskNote;