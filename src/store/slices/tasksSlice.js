import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const tasksSlice = createSlice({
    name: 'tasksInfo',
    initialState: {
        tasks: [],
        currentTaskId: 0,
        currentTask: null,
    },
    reducers: {
        fetchTasks: (state, { payload }) => {
            state.tasks = payload;
        },
        addTask: (state, { payload }) => {
            const date = new Date();
            const day = date.getTime();
            const dateStart = `${date.getFullYear()}-${date.getMonth()}-${day < 10 ? `0${day}` : day}`;
            const newTask = { ...payload, status: 'active', id: _.uniqueId(), dateStart};
            state.tasks.push(newTask);
        },
        checkTasks: (state) => {
            const filtredTasks = state.tasks.filter((task) => task.status !== 'succefull');
            state.tasks = filtredTasks.map((task) => {
                const dateNow = new Date();
                const taskDateEnd = new Date(task.dateEnd);
                return dateNow > taskDateEnd ? { ...task, status: 'failed'} : task;
            })
        },
        deleteTask: (state, { payload }) => {
            const filtredTasks = state.tasks.filter(({ id }) => id !== payload);
            state.tasks = filtredTasks;
        },
        setCurrentTaskId: (state, { payload }) => {
            state.currentTaskId = payload;
        },
        setTaskText: (state, { payload }) => {
            const currentTask = state.tasks.find(({ id }) => payload.id === id);
            const currentTaskId = state.tasks.indexOf(currentTask);
            state.tasks[currentTaskId] = {...currentTask, text: payload.newText};
        },
        setTaskStatus: (state, { payload }) => {
            const currentTask = state.tasks.find(({ id }) => payload.id === id);
            const currentTaskId = state.tasks.indexOf(currentTask);
            state.tasks[currentTaskId] = {...currentTask, status: payload.status};
        }
    }
});

export const { addTask, deleteTask, setCurrentTaskId, fetchTasks, setTaskStatus, checkTasks, setTaskText } = tasksSlice.actions;

export default tasksSlice.reducer;