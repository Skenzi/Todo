import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/TodoQuestsLogo.svg";
//import ProfileMenu from './ProfileMenu';

function Header() {
  return (
    <header className="header bg-main">
      <div className="header-item"><img src={logo} alt="logo" className="logo" /></div>
      <nav className="header-item">
        <Link to="/" className="button button-bar">Квесты</Link>
      </nav>
      <div className="header-item">
        <Link to="/loginPage" type="button" className="button button-bar">Войти/Зарегистрироваться</Link>
      </div>
    </header>
  );
}

export default Header;
