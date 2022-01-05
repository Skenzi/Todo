import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import AllTasks from './pages/AllTasks.jsx';
import SuccefullTasks from './pages/SucceffulTasks.jsx';
import FailedTasks from './pages/FailedTasks.jsx';
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ModalTaskForm from "./ModalFormTask.jsx";
import apiContext from "../context/index.js";
import { useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
    const emptyUser = {
        username: null,
    };
    const [user, setUser] = useState(emptyUser);
    const logOut = () => {
        setUser(emptyUser);
    };
    const elements = {
        body: document.querySelector('body'),
    }
    return <apiContext.Provider value={{elements, user, setUser, logOut}}>
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
};

export default App;