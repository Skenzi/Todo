import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksActiveSelector, tasksSuccefullSelector, tasksFailedSelector } from "../store/selectors";
import { setCurrentTaskId } from '../store/slices/tasksSlice.js';

const tasksSelectors = {
    active: tasksActiveSelector,
    succefull: tasksSuccefullSelector,
    failed: tasksFailedSelector,
}

const ListTasks = ({ currentTasksStatus }) => {
    const tasks = useSelector(tasksSelectors[currentTasksStatus]);
    const dispatch = useDispatch();
    const changeCurrentId = (id) => () => {
        dispatch(setCurrentTaskId(id));
    }
    return <ol className="tasks-list">
    {tasks.map((task) => {
        return <li key={task.id}>
            <button type="button" className="button" onClick={changeCurrentId(task.id)}>
                <h2>{task.name}</h2>
                <div>{task.description}</div>
            </button>
        </li>
    })}
</ol>;
};

export default ListTasks;