import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import AllTasks from './pages/AllTasks.jsx';
import SuccefullTasks from './pages/SucceffulTasks.jsx';
import FailedTasks from './pages/FailedTasks.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ModalTaskForm from './ModalFormTask.jsx';
import apiContext from '../context/index';
import LoginPage from './pages/LoginPage.jsx';

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
        <main className="flex-container main table-background">
          <Routes>
            <Route exact path="/succefullTasks" element={<SuccefullTasks />} />
            <Route exact path="/failedTasks" element={<FailedTasks />} />
            <Route exact path="/" element={<AllTasks />} />
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
