import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
    currentTaskId: 1,
    currentTask: null,
    statusTasks: 'active',
  },
  reducers: {
    addTask: (state, { payload }) => {
      const newTask = {
        ...payload, reward: +payload.reward, status: 'active', id: Date.now(), dateStart: Date.now(),
      };
      state.tasks.push(newTask);
    },
    setTasks: (state, { payload }) => {
      state.tasks = payload;
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
