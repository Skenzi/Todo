import React from "react";
import { useSelector } from "react-redux";
import ListTasks from "../ListTasks.jsx";
import TaskNote from "../TaskNote.jsx";
import { currentTask } from '../../store/selectors/index.js';

const FailedTasks = () => {
    const task = useSelector(currentTask);
    return <>
        <ListTasks currentTasksStatus="failed" />
        {task && task.status === 'failed' ? <TaskNote /> : null}
    </>;
}

export default FailedTasks;