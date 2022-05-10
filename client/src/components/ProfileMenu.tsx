import React, { ButtonHTMLAttributes, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiContext from '../context';
import { userSelector } from '../store/selectors';

function ProfileMenu() {
  const { user } = useSelector(userSelector);
  const api = useContext(apiContext);

  const handler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    (ev.target as HTMLElement).nextElementSibling?.classList.toggle('show')
  };
  return (
    <>
      <button type="button" className="button button-bar button-dropdown" onClick={handler}>{user.username}</button>
      <nav className="dropdown-menu bg-main-dark">
        <li>
          <div className="dropdown-menu-item">
            <div>{user.username}</div>
          </div>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <Link className="dropdown-menu-item" to="/profilePage">Профиль</Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button type="button" className="button button-outline dropdown-menu-item" onClick={() => api.logOut()}>Выйти</button>
        </li>
      </nav>
    </>
  );
}

export default ProfileMenu;
