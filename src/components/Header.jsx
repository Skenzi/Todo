import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/TodoQuestsLogo.svg";

const Header = () => {
    return <header className="header">
        <div className="header-item"><img src={logo} alt="logo" className="logo" /></div>
        <nav className="header-item">
            <Link to="/" className="button button-bar">Квесты</Link>
            <Link to="/succefullTasks" className="button button-bar">Завершенные</Link>
            <Link to="/failedTasks" className="button button-bar">Провальные</Link>
        </nav>
    </header>
};

export default Header;