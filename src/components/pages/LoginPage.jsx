import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiContext from "../../context";
import users from "../../store/users.js";

const LoginPage = () => {
    const api = useContext(apiContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [dateLogin, setDateLogin] = useState({username: '', password: ''});
    const onSubmit = (ev) => {
        ev.preventDefault();
        const currUser = users.find((user) => user.username === dateLogin.username && user.password === dateLogin.password);
        if (currUser) {
            api.setUser(currUser);
            navigate("/", { replace: true });
        } else {
            setError('Такого пользователя нет');
        }
    };
    const onChange = (dateKey) => (ev) => {
        setDateLogin({...dateLogin, [dateKey]: ev.target.value});
    }
    return <div className="container-sm">
        <form className="form bg-main" onSubmit={onSubmit}>
            <div className="form-title">Вход в систему</div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input id="username" value={dateLogin.username} onChange={onChange('username')} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input id="password" value={dateLogin.password} onChange={onChange('password')} type="password" className="form-control"/>
                </div>
                <button type="submit" className="button button-sm button-submit">Войти</button>
            </div>
            <div className="form-footer">
                <Link to="/signUpPage" type="button" className="button button-sm">Уже зарегистрированы?</Link>
            </div>
        </form>
    </div>
};

export default LoginPage;