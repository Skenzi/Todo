import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiContext from '../context';
import { userSelector } from '../store/selectors';
import { useState } from 'react';

function ProfileMenu() {
  const { user } = useSelector(userSelector);
  const [isOpen, setStateMenu] = useState<boolean>(false);

  const api = useContext(apiContext);

  const switchMenuHandler = (ev: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
    setStateMenu((prev) => !prev);
  };
  return (
    <div className="dropdown">
      <button type="button" className="button button-bar button-dropdown" onClick={switchMenuHandler}>{user.username}</button>
      {isOpen ? (
        <nav className="dropdown-menu bg-main-dark">
        <div className="dropdown-menu__item">
          <Link className="dropdown-menu__link" onClick={switchMenuHandler} to="/profilePage">Профиль</Link>
        </div>
        <hr className="dropdown-divider" />
        <div className="dropdown-menu__item">
          <button type="button" className="button button-outline" onClick={() => api.logOut()}>Выйти</button>
        </div>
      </nav>
      ) : null}
    </div>
  );
}

export default ProfileMenu;
