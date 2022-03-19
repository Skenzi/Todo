import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import apiContext from '../../context';
import users from '../../store/users';
import { fetchUserData } from '../../store/slices/userSlice';

function LoginForm({
  onChangeDataLogin, error, dataLogin, onSubmit,
}) {
  return (
    <form className="form bg-main" onSubmit={onSubmit}>
      <div className="form-title">Вход в систему</div>
      <div className="form-body">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Имя пользователя</label>
          <input id="username" value={dataLogin.username} onChange={onChangeDataLogin('username')} type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Пароль</label>
          <input id="password" value={dataLogin.password} onChange={onChangeDataLogin('password')} type="password" className="form-control" />
        </div>
        {error ? <div className="text-error">{error}</div> : null}
        <button type="submit" className="button button-sm button-submit">Войти</button>
      </div>
      <div className="form-footer">
        <Link to="/signUpPage" type="button" className="button button-sm">Не зарегистрированы?</Link>
      </div>
    </form>
  );
}

function LoginPage() {
  const api = useContext(apiContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [dataLogin, setDataLogin] = useState({ username: '', password: '' });
  const onSubmit = (ev) => {
    ev.preventDefault();
    const currUser = users.find(
      (user) => user.username === dataLogin.username && user.password === dataLogin.password,
    );
    if (currUser) {
      api.setUser({ username: currUser.username });
      dispatch(fetchUserData(currUser));
      navigate('/', { replace: true });
    } else {
      setError('Такого пользователя нет');
    }
  };
  const onChangeDataLogin = (dataKey) => (ev) => {
    setDataLogin({ ...dataLogin, [dataKey]: ev.target.value });
  };
  return (
    <div className="container-sm">
      <LoginForm
        onChange={onChangeDataLogin}
        error={error}
        dataLogin={dataLogin}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default LoginPage;
