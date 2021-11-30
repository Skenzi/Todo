import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import AllTasks from './pages/AllTasks.jsx';
import SuccefullTasks from './pages/SucceffulTasks.jsx';
import FailedTasks from './pages/FailedTasks.jsx';
import ModalTaskForm from "./ModalFormTask.jsx";

const App = () => {
    return <>
        <Router>
            <Header />
            <main className="flex-container p-20 h-80 table-background">
                <Routes>
                    <Route exact path="/" element={<AllTasks />} />
                    <Route exact path="/succefullTasks" element={<SuccefullTasks />} />
                    <Route exact path="/failedTasks" element={<FailedTasks />} />
                </Routes>
            </main>
            <ModalTaskForm />
        </Router>
    </>
};

export default App;