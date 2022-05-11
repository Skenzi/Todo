import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import TasksPage from '../pages/TasksPage';
import NotFoundPage from '../pages/NotFoundPage';
import ModalTaskForm from './ModalTaskForm';
import apiContext from '../context/index';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

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
  const user = sessionStorage.getItem('user');
  return user && JSON.parse(user);
}

class SocketApi {
  socket
  constructor(socket: WebSocket) {
    this.socket = socket;
  }
}

const connection = (setSocketApi: React.Dispatch<React.SetStateAction<SocketApi | undefined>>) => {
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
      console.log(data, 22);
    }
}

function App() {
  const [socketApi, setSocketApi] = useState<SocketApi>();
  const dispatch = useDispatch();

  useEffect(() => {
    connection(setSocketApi);
    const user = getUser();
    if(user) {
      dispatch(setUser(user));
    }
  }, [])

  const logOut = () => {
    dispatch(setUser({
      username: null,
      token: null,
    }))
    sessionStorage.removeItem('user');
  }

  const getAutorizedHeader = () => {
    const user = sessionStorage.getItem('user');
    if(user) {
      const {token} = JSON.parse(user);
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }

  const elements = {
    body: document.querySelector('body'),
  };

  return !socketApi ? <div className='loading'>Loading...</div> : (
    <apiContext.Provider value={{ socketApi, getUser, logOut, getAutorizedHeader }}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
      <ModalTaskForm />
    </apiContext.Provider>
);
}

export default App;
