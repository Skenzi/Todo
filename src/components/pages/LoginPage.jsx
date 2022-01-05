import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import apiContext from "../../context";
import { fetchUserData } from "../../store/slices/userSlice";
import users from "../../store/users.js";

const LoginPage = () => {
    const api = useContext(apiContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [dataLogin, setDataLogin] = useState({username: '', password: ''});
    const onSubmit = (ev) => {
        ev.preventDefault();
        const currUser = users.find((user) => user.username === dataLogin.username && user.password === dataLogin.password);
        if (currUser) {
            api.setUser({username: currUser.username});
            dispatch(fetchUserData(currUser));
            navigate("/", { replace: true });
        } else {
            setError('Такого пользователя нет');
        }
    };
    const onChange = (dataKey) => (ev) => {
        setDataLogin({...dataLogin, [dataKey]: ev.target.value});
    }
    return <div className="container-sm">
        <form className="form bg-main" onSubmit={onSubmit}>
            <div className="form-title">Вход в систему</div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input id="username" value={dataLogin.username} onChange={onChange('username')} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input id="password" value={dataLogin.password} onChange={onChange('password')} type="password" className="form-control"/>
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