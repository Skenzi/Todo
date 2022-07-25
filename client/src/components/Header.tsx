import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/TodoQuestsLogo.svg";
import DropdownMenu from './DropdowmMenu';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors';

function Header() {
  const { user } = useSelector(userSelector);
  console.log('render')
  return (
    <header className="header bg-main">
      <div className="header__logo"><img src={logo} alt="logo" className="logo" /></div>
      <nav className="header__menu">
        <Link to="/" className="button button-bar">Квесты</Link>
      </nav>
      <div className="header__dropdown">
        {!user?.token ? <Link to="/loginPage" type="button" className="button button-bar">Войти/Зарегистрироваться</Link> : <DropdownMenu />}
      </div>
    </header>
  );
}

export default Header;
