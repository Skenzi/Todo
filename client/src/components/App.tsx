import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
//import TasksPage from '../pages/TasksPage';
//import NotFoundPage from '../pages/NotFoundPage';
//import ModalTaskForm from '../ModalTaskForm';
import apiContext from '../context/index';
//import LoginPage from '../pages/LoginPage';
//import SignUpPage from '../pages/SignUpPage';
//import ProfilePage from '../pages/ProfilePage';

/*function Main() {
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
}*/

const getToken = () => {
  const token = localStorage.getItem('userToken');
  return token;
}

function App() {
  const emptyUser = {
    username: null,
    token: null,
  };
  const [user, setUser] = useState(emptyUser);
  const logOut = () => {
    setUser(emptyUser);
  };
  const elements = {
    body: document.querySelector('body'),
  };
  const memoizedValue = useMemo(
    () => ({
      elements, user, setUser, logOut,
    }),
    [{
      elements, user, setUser, logOut,
    }],
  );
  return (
    <apiContext.Provider value={memoizedValue}>
      <Router>
        <Header />
        
      </Router>
    </apiContext.Provider>
  );
}

export default App;
