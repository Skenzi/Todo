import React from "react";
import { useSelector } from "react-redux";
import ListTasks from "../ListTasks.jsx";
import TaskNote from "../TaskNote.jsx";
import { currentTask } from '../../store/selectors/index.js';

const SuccefullTasks = () => {
    const task = useSelector(currentTask);
    return <>
        <ListTasks currentTasksStatus="succefull" />
        {task && task.status === 'succefull' ? <TaskNote /> : null}
    </>;
}

export default SuccefullTasks;