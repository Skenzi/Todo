import React from "react";
import { useSelector } from "react-redux";
import { tasksActiveSelector, tasksSuccefullSelector, tasksFailedSelector } from "../store/selectors";

const tasksSelectors = {
    active: tasksActiveSelector,
    succefull: tasksSuccefullSelector,
    failed: tasksFailedSelector,
}

const ListTasks = ({ currentTasksStatus }) => {
    const tasks = useSelector(tasksSelectors[currentTasksStatus]);
    return <ol>
    {tasks.map((task) => {
        return <li key={task.id}>
            <h2>{task.name}</h2>
            <div>{task.description}</div>
        </li>
    })}
</ol>;
};

export default ListTasks;