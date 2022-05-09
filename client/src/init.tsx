import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './components/App';

const init = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
