import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    tasksInfo: tasksReducer,
    modalInfo: modalReducer,
    userInfo: userReducer,
  },
});

export default store;
