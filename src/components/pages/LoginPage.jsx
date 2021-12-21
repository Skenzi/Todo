import React from "react";
import { useState } from "react";
import { useContext } from "react";
import apiContext from "../../context";
import users from "../../store/users.js";

const LoginPage = () => {
    const api = useContext(apiContext);
    const [error, setError] = useState(null);
    const [dateLogin, setDateLogin] = useState({username: '', password: ''});
    const onSubmit = (ev) => {
        ev.preventDefault();
        const currUser = users.find((user) => user.username === dateLogin.username && user.password === dateLogin.password);
        console.log(currUser, users)
        if (currUser) {
            api.setUser(dateLogin);
        } else {
            setError('Такого пользователя нет');
        }
    };
    const onChange = (dateKey) => (ev) => {
        setDateLogin({...dateLogin, [dateKey]: ev.target.value});
    }
    return <div className="container-sm">
        <form className="form" onSubmit={onSubmit}>
            <div className="form-title">Вход в систему</div>
            <div className="form-body">
                <div className="form-group">
                    <label for="username" className="form-label">Имя пользователя</label>
                    <input id="username" value={dateLogin.username} onChange={onChange('username')} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="password" className="form-label">Пароль</label>
                    <input id="password" value={dateLogin.password} onChange={onChange('password')} type="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-submit">Войти</button>
            </div>
            <div className="form-footer">
                <button type="button">Уже зарегистрированы?</button>
            </div>
        </form>
    </div>
};

export default LoginPage;