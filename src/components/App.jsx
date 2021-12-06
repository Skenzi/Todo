import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import AllTasks from './pages/AllTasks.jsx';
import SuccefullTasks from './pages/SucceffulTasks.jsx';
import FailedTasks from './pages/FailedTasks.jsx';
import ModalTaskForm from "./ModalFormTask.jsx";
import apiContext from "../context/index.js";

const App = () => {
    const elements = {
        body: document.querySelector('body'),
    }
    return <apiContext.Provider value={{elements}}>
        <Router>
            <Header />
            <main className="flex-container main table-background">
                <Routes>
                    <Route exact path="/" element={<AllTasks />} />
                    <Route exact path="/succefullTasks" element={<SuccefullTasks />} />
                    <Route exact path="/failedTasks" element={<FailedTasks />} />
                </Routes>
            </main>
        </Router>
        <ModalTaskForm />
    </apiContext.Provider>
};

export default App;