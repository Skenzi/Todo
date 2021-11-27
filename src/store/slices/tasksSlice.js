import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [
            { name: 'task1', description: 'taskText', id: 1, status: 'active'},
            { name: 'task2', description: 'taskText', id: 2, status: 'failed'},
            { name: 'task3', description: 'taskText', id: 3, status: 'active'},
            { name: 'task4', description: 'taskText', id: 4, status: 'succefull'}
        ],
        currentTaskId: 1,
        currentTask: null,
    },
    reducers: {
        addTask: (state, { payload }) => {
            const newTask = { ...payload, id: _.uniqueId()};
            state.tasks.push(newTask);
        },
        deleteTask: (state, { id }) => {
            state = state.tasks.filter(({ idTask }) => idTask !== id);
        }
    }
});

export const { addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;