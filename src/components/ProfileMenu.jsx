import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import apiContext from "../context";

const ProfileMenu = () => {
    const {user, logOut} = useContext(apiContext);
    return <div className="header-item">
        <button type="button" className="button button-bar button-dropdown" onClick={(ev) => ev.target.nextElementSibling.classList.toggle('show')}>{user.username}</button>
        <nav className="dropdown-menu bg-main">
            <li>
                {user.username}
                {user.level}
                {user.exp}
            </li>
            <li>
                <Link to="/profilePage">Профиль</Link>
            </li>
            <li>
                <button type="button" className="button" onClick={logOut}>Выйти</button>
            </li>
        </nav>
    </div>;
};

export default ProfileMenu;