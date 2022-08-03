import { configureStore } from '@reduxjs/toolkit';
// import axios from 'axios';
import tasksReducer from './slices/tasksSlice';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
/*
const updateConet = createListenerMiddleware();

middlewareTest.startListening({
  actionCreator: setContentTask,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    await axios.put('http://localhost/updateTask', { value: action.payload.text, id: action.payload.id });
  },
});
*/
const store = configureStore({
  reducer: {
    tasksInfo: tasksReducer,
    modalInfo: modalReducer,
    userInfo: userReducer,
  },
});

export default store;
