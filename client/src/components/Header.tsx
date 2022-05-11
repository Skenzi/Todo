import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/TodoQuestsLogo.svg";
import ProfileMenu from './ProfileMenu';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors';

function Header() {
  const { user } = useSelector(userSelector);

  return (
    <header className="header bg-main">
      <div className="header-item"><img src={logo} alt="logo" className="logo" /></div>
      <nav className="header-item">
        <Link to="/" className="button button-bar">Квесты</Link>
      </nav>
      <div className="header-item">
        {!user?.token ? <Link to="/loginPage" type="button" className="button button-bar">Войти/Зарегистрироваться</Link> : <ProfileMenu />}
      </div>
    </header>
  );
}

export default Header;
