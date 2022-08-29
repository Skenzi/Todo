import { createSlice } from '@reduxjs/toolkit';
/*
const thunkTest = createAsyncThunk(
  'tasksInfo/setContentTask',
  async () => {
    console.log('thunkTest');
  },
);
*/
const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
    currentTaskId: 1,
    currentTask: null,
    currentTab: 'active',
  },
  reducers: {
    addTask: (state, { payload }) => {
      const newTask = {
        ...payload, reward: +payload.reward,
      };
      state.tasks.push(newTask);
    },
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    deleteTask: (state, { payload }) => {
      const filtredTasks = state.tasks.filter(({ id }) => id !== payload);
      state.tasks = filtredTasks;
    },
    setCurrentTaskId: (state, { payload }) => {
      state.currentTaskId = payload;
    },
    setContentTask: (state, { payload }) => {
      const currentTask = state.tasks.find((task) => payload.id === task.id);
      currentTask[payload.property] = payload.value;
    },
  },
});

export const {
  addTask, deleteTask, setCurrentTaskId, setContentTask, setTasks, setCurrentTab,
} = tasksSlice.actions;

export default tasksSlice.reducer;
