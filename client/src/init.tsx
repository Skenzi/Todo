import React, { useEffect} from 'react';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './components/App';

const connectionHandler = (socket: WebSocket) => {
  socket.onopen = () => {
    console.log('connected!')
    socket.send(JSON.stringify({
      event: 'getUser',
    }))
  }
  socket.onmessage = function(this: WebSocket, ev: MessageEvent<any>) {
    console.log(JSON.parse(ev))
  }
}

const init = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000/');
    connectionHandler(socket);
  }, [])
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
