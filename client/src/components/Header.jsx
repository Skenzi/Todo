import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/TodoQuestsLogo.svg';
import apiContext from '../context';
import ProfileMenu from './ProfileMenu.jsx';

function Header() {
  const { user } = useContext(apiContext);
  return (
    <header className="header bg-main">
      <div className="header-item"><img src={logo} alt="logo" className="logo" /></div>
      <nav className="header-item">
        <Link to="/" className="button button-bar">Квесты</Link>
      </nav>
      <div className="header-item">
        {!(user.username) ? <Link to="/loginPage" type="button" className="button button-bar">Войти/Зарегистрироваться</Link> : <ProfileMenu />}
      </div>
    </header>
  );
}

export default Header;