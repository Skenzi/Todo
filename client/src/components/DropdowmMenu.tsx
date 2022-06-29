import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiContext from '../context';
import { userSelector } from '../store/selectors';
import { useState } from 'react';

function ProfileMenu() {
  const { user } = useSelector(userSelector);
  const [isOpen, setStateMenu] = useState<boolean>(false);
  console.log(isOpen)
  const api = useContext(apiContext);

  const switchMenuHandler = (ev: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
    setStateMenu((prev) => !prev);
  };
  return (
    <div className="dropdown">
      <button type="button" className="button button-bar button-dropdown" onClick={switchMenuHandler}>{user.username}</button>
      {isOpen ? (
        <nav className="dropdown-menu bg-main-dark">
        <li>
          <div className="dropdown-menu-item">
            <div>{user.username}</div>
          </div>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <Link className="dropdown-menu-item" onClick={switchMenuHandler} to="/profilePage">Профиль</Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button type="button" className="button button-outline dropdown-menu-item" onClick={() => api.logOut()}>Выйти</button>
        </li>
      </nav>
      ) : null}
    </div>
  );
}

export default ProfileMenu;
