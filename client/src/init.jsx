import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './components/App.jsx';
import { checkTasks } from './store/slices/tasksSlice.js';

const init = () => {
    store.dispatch(checkTasks());
    return <Provider store={store}>
        <App />
    </Provider>
};

export default init;