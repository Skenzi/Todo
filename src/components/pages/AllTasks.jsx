import React from "react";
import { useSelector } from "react-redux";
import ListTasks from "../ListTasks.jsx";
import { currentTask } from "../../store/selectors/index.js";

const AllTasks = () => {
    const task = useSelector(currentTask);
    return <div>
        <ListTasks currentTasksStatus="active" />
        <div className="task-container">
        <section className="task">
            <h2 className="task-name">{task.name}</h2>
            <div className="task-text">{task.description}</div>
            <div className="buttons-group">
                <button type="button">Завершить</button>
                <button type="button">Изменить</button>
                <button type="button">Удалить</button>
            </div>
        </section>
        </div>
    </div>;
}

export default AllTasks;