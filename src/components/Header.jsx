import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/TodoQuestsLogo.svg";
import { useContext } from "react";
import apiContext from "../context";

const Header = () => {
    const {user, logOut} = useContext(apiContext);
    return <header className="header bg-main">
        <div className="header-item"><img src={logo} alt="logo" className="logo" /></div>
        <nav className="header-item">
            <Link to="/" className="button button-bar">Квесты</Link>
            <Link to="/succefullTasks" className="button button-bar">Завершенные</Link>
            <Link to="/failedTasks" className="button button-bar">Провальные</Link>
        </nav>
        <div className="header-item">
            {!(user.username) ? <Link to="/loginPage" type="button" className="button button-bar">Войти/Зарегистрироваться</Link> : <button type="button" className="button button-bar" onClick={logOut}>Выйти</button>}
        </div>
    </header>
};

export default Header;