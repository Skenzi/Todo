import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import AllTasks from './pages/AllTasks.jsx';
import SuccefullTasks from './pages/SucceffulTasks.jsx';
import FailedTasks from './pages/FailedTasks.jsx';

const App = () => {
    return <div>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<AllTasks />} />
                <Route exact path="/succefullTasks" element={<SuccefullTasks />} />
                <Route exact path="/failedTasks" element={<FailedTasks />} />
            </Routes>
        </Router>
    </div>
};

export default App;