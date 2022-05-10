import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
    currentTaskId: 0,
    currentTask: null,
  },
  reducers: {
    addTask: (state, { payload }) => {
      const date = new Date();
      const day = date.getTime();
      const dateStart = `${date.getFullYear()}-${date.getMonth()}-${day < 10 ? `0${day}` : day}`;
      const newTask = {
        ...payload, reward: +payload.reward, status: 'active', id: _.uniqueId(), dateStart,
      };
      state.tasks.push(newTask);
    },
    checkTasks: (state) => {
      const filtredTasks = state.tasks.filter((task) => task.status !== 'succefull');
      state.tasks = filtredTasks.map((task) => {
        const dateNow = new Date();
        const taskDateEnd = new Date(task.dateEnd);
        return dateNow > taskDateEnd ? { ...task, status: 'failed' } : task;
      });
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
  addTask, deleteTask, setCurrentTaskId, checkTasks, setTaskProperty,
} = tasksSlice.actions;

export default tasksSlice.reducer;
