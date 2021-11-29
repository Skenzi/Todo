import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice.js';
import modalReducer from './slices/modalSlice.js';

const store = configureStore({
    reducer: {
        tasksInfo: tasksReducer,
        modalInfo: modalReducer,
    },
});

export default store;