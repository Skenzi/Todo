import React, { Dispatch, useState } from 'react';
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
import { Task } from '../types/types';
import { addTask, setTasks } from '../store/slices/tasksSlice';

const getUser = () => {
  const user = sessionStorage.getItem('user');
  return user && JSON.parse(user);
}

class SocketApi {
  socket
  constructor(socket: WebSocket) {
    this.socket = socket;
  }
  addNewTask(task: Task) {
    this.socket.send(JSON.stringify({
      event: 'newTask',
      task,
    }))
  }
  changeTask(task: Task) {
    this.socket.send(JSON.stringify({
      event: 'changeTask',
      task,
    }))
  }
}

const connection = (setSocketApi: React.Dispatch<React.SetStateAction<SocketApi | undefined>>, dispatch: Dispatch<any>) => {
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
        case 'newTask':
          dispatch(addTask(data.task));
          break;
      }
    }
}

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

function App() {
  const [socketApi, setSocketApi] = useState<SocketApi>();
  const dispatch = useDispatch();

  useEffect(() => {
    connection(setSocketApi, dispatch);
    const user = getUser();
    if(user) {
      dispatch(setUser(user));
    }
  }, [])

  const logOut = () => {
    dispatch(setUser({
      username: null,
      token: null,
    }));
    dispatch(setTasks([]));
    sessionStorage.removeItem('user');
  }

  const getAutorizedHeader = () => {
    const user = sessionStorage.getItem('user');
    if(user) {
      const {token} = JSON.parse(user);
      return { Authorization: `${token}` };
    }
    return {};
  }

  const elements = {
    body: document.querySelector('body'),
  };

  return !socketApi ? <div className='loading'>Loading...</div> : (
    <apiContext.Provider value={{ socketApi, getUser, logOut, getAutorizedHeader, elements }}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
      <ModalTaskForm />
    </apiContext.Provider>
);
}

export default App;
