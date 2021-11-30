import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksActiveSelector, tasksSuccefullSelector, tasksFailedSelector } from "../store/selectors";
import { setCurrentTaskId } from '../store/slices/tasksSlice.js';
import { setStateModal } from "../store/slices/modalSlice";

const tasksSelectors = {
    active: tasksActiveSelector,
    succefull: tasksSuccefullSelector,
    failed: tasksFailedSelector,
}

const ListTasks = ({ currentTasksStatus }) => {
    const tasks = useSelector(tasksSelectors[currentTasksStatus]);
    const dispatch = useDispatch();
    const setCurrentId = (id) => () => {
        dispatch(setCurrentTaskId(id));
    }
    const setModal = () => {
        dispatch(setStateModal(true));
    };
    return <div className="tasks">
        {currentTasksStatus === 'active' ? <button type="button" className="button" onClick={setModal}>Add quest</button> : null}
        <ol className="tasks-list">
    {tasks.map((task) => {
        return <li key={task.id}>
            <button type="button" className="button" onClick={setCurrentId(task.id)}>
                <h2>{task.name}</h2>
                <div>{task.dateEnd}</div>
            </button>
        </li>
    })}
</ol>
    </div>
};

export default ListTasks;