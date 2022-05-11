import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
    currentTaskId: 0,
    currentTask: null,
    statusTasks: 'active',
  },
  reducers: {
    addTask: (state, { payload }) => {
      const date = new Date();
      const day = date.getTime();
      const dateStart = `${date.getFullYear()}-${date.getMonth()}-${day < 10 ? `0${day}` : day}`;
      const newTask = {
        ...payload, reward: +payload.reward, status: 'active', id: Date.now(), dateStart,
      };
      state.tasks.push(newTask);
    },
    setTasks: (state, { payload }) => {
      state.tasks.push(...payload);
    },
    setStatusTasks: (state, { payload }) => {
      state.statusTasks = payload;
    },
    deleteTask: (state, { payload }) => {
      const filtredTasks = state.tasks.filter(({ id }) => id !== payload);
      state.tasks = filtredTasks;
    },
    setCurrentTaskId: (state, { payload }) => {
      state.currentTaskId = payload;
    },
    setTaskProperty: (state, { payload }) => {
      const currentTask = state.tasks.find((task) => payload.id === task.id);
      currentTask[payload.property] = payload.value;
    },
  },
});

export const {
  addTask, deleteTask, setCurrentTaskId, setTaskProperty, setTasks, setStatusTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
