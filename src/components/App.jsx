import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import TasksPage from './pages/TasksPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ModalTaskForm from './ModalTaskForm.jsx';
import apiContext from '../context/index';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

function App() {
  const emptyUser = {
    username: null,
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
        <main className="flex-container main table-background flex-column">
          <Routes>
            <Route exact path="/" element={<TasksPage />} />
            <Route exact path="/loginPage" element={<LoginPage />} />
            <Route exact path="/signUpPage" element={<SignUpPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
      <ModalTaskForm />
    </apiContext.Provider>
  );
}

export default App;
