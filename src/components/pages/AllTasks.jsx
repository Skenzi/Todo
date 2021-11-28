import React from "react";
import { useSelector } from "react-redux";
import ListTasks from "../ListTasks.jsx";
import TaskNote from "../TaskNote.jsx";

const AllTasks = () => {
    return <>
        <ListTasks currentTasksStatus="active" />
        <TaskNote />
    </>;
}

export default AllTasks;