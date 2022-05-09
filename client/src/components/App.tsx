import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import TasksPage from '../pages/TasksPage';
import NotFoundPage from '../pages/NotFoundPage';
import ModalTaskForm from './ModalTaskForm';
import apiContext from '../context/index';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import { useEffect } from 'react';

function Main() {
  return (
    <main className="flex-container main table-background flex-column">
      <Routes>
      <Route path="/" element={<TasksPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

const getUser = () => {
  const emptyUser = {
    username: null,
    token: null,
  };
  const token = localStorage.getItem('userToken');
  return token;
}

class SocketApi {
  socket
  constructor(socket: WebSocket) {
    this.socket = socket;
  }
  getUser() {
    this.socket.send(JSON.stringify({
      event: 'getUser',
      username: 'Dimas',
      password: '123456',
    }));
  }
}

function App() {
  const [socketApi, setSocketApi] = useState<SocketApi>();
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000/');
    socket.onopen = () => {
      console.log('connected!')
      socket.send(JSON.stringify({
        event: 'connection',
      }))
      setSocketApi(new SocketApi(socket));
    }
    socket.onmessage = function(this: WebSocket, ev: MessageEvent<any>) {
      const data = JSON.parse(ev.data);
      switch(data.event) {
        case 'getUser':
          console.log(data, 22);
      }
    }
  }, [])

  const elements = {
    body: document.querySelector('body'),
  };
  console.log(socketApi?.getUser())
  return !socketApi ? <div>Loading...</div> : (
    <apiContext.Provider value={{ socketApi }}>
      <Router>
        <Header />
        <Main />
      </Router>
      <ModalTaskForm />
    </apiContext.Provider>
);
}

export default App;
