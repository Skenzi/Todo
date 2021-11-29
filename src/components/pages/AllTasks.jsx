import React from "react";
import { useSelector } from "react-redux";
import ListTasks from "../ListTasks.jsx";
import TaskNote from "../TaskNote.jsx";
import { currentTask } from '../../store/selectors/index.js';

const AllTasks = () => {
    const task = useSelector(currentTask);
    return <>
        <ListTasks currentTasksStatus="active" />
        {task.status === 'active' ? <TaskNote /> : null}
    </>;
}

export default AllTasks;