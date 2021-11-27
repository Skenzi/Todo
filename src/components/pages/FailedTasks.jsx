import React from "react";
import ListTasks from "../ListTasks.jsx";

const FailedTasks = () => {
    return <div>
        <ListTasks currentTasksStatus="failed" />
    </div>;
}

export default FailedTasks;