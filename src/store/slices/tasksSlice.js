import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const tasksSlice = createSlice({
    name: 'tasksInfo',
    initialState: {
        tasks: [],
        currentTaskId: 1,
        currentTask: null,
    },
    reducers: {
        addTask: (state, { payload }) => {
            const date = new Date();
            const newTask = { ...payload, status: 'active', id: _.uniqueId(), dateStart: date.getTime()};
            state.tasks.push(newTask);
        },
        deleteTask: (state, { payload }) => {
            state = state.tasks.filter(({ idTask }) => idTask !== payload);
        },
        setCurrentTaskId: (state, { payload }) => {
            state.currentTaskId = payload;
        }
    }
});

export const { addTask, deleteTask, setCurrentTaskId } = tasksSlice.actions;

export default tasksSlice.reducer;