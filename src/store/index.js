import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice.js';
import modalReducer from './slices/modalSlice.js';
import userReducer from './slices/userSlice.js';

const store = configureStore({
    reducer: {
        tasksInfo: tasksReducer,
        modalInfo: modalReducer,
        userInfo: userReducer,
    },
});

export default store;