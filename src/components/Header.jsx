import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/TodoQuestsLogo.svg';
import apiContext from '../context';
import ProfileMenu from './ProfileMenu.jsx';

function Header({ setTypeTasks }) {
  const { user } = useContext(apiContext);
  return (
    <header className="header bg-main">
      <div className="header-item"><img src={logo} alt="logo" className="logo" /></div>
      <nav className="header-item">
        <button onClick={() => setTypeTasks('active')} type="button" className="button button-bar">Квесты</button>
        <button onClick={() => setTypeTasks('succefull')} type="button" className="button button-bar">Завершенные</button>
        <button onClick={() => setTypeTasks('failed')} type="button" className="button button-bar">Провальные</button>
      </nav>
      <div className="header-item">
        {!(user.username) ? <Link to="/loginPage" type="button" className="button button-bar">Войти/Зарегистрироваться</Link> : <ProfileMenu />}
      </div>
    </header>
  );
}

export default Header;
