import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Tasks from './pages/Tasks.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ModalTaskForm from './ModalTaskForm.jsx';
import apiContext from '../context/index';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  const emptyUser = {
    username: null,
  };
  const [user, setUser] = useState(emptyUser);
  const [typeTasks, setTypeTasks] = useState('active');
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
        <Header setTypeTasks={setTypeTasks} />
        <main className="flex-container main table-background">
          <Routes>
            <Route exact path="/" element={<Tasks typeTasks={typeTasks} />} />
            <Route exact path="/loginPage" element={<LoginPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
      <ModalTaskForm />
    </apiContext.Provider>
  );
}

export default App;
