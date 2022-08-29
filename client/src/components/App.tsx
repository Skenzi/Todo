import React, { Dispatch, useState } from 'react';
import { BrowserRouter, Routes, MemoryRouter, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import TasksPage from '../pages/TasksPage';
import NotFoundPage from '../pages/NotFoundPage';
import ModalTaskForm from './Modal';
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

function Main() {
  const location = useLocation();
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
  const dispatch = useDispatch();

  useEffect(() => {
    
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
    const user = getUser();
    if(user) {
      return { Authorization: `${user.token}` };
    }
    return {};
  }

  const elements = {
    body: document.querySelector('body'),
  };
  return (
    <apiContext.Provider value={{ getUser, logOut, getAutorizedHeader, elements }}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
      <ModalTaskForm />
    </apiContext.Provider>
);
}

export default App;
