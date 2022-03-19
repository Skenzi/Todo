import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiContext from '../../context';
import users from '../../store/users';

function SigUpForm({
  onChangeDataForm, error, dataLogin, onSubmit,
}) {
  return (
    <form className="form bg-main" onSubmit={onSubmit}>
      <div className="form-title">Вход в систему</div>
      <div className="form-body">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Имя пользователя</label>
          <input id="username" value={dataLogin.username} onChange={onChangeDataForm('username')} type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Пароль</label>
          <input id="password" value={dataLogin.password} onChange={onChangeDataForm('password')} type="password" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Подтвредите пароль</label>
          <input id="confirmPassword" value={dataLogin.confirmPassword} onChange={onChangeDataForm('confirmPassword')} type="password" className="form-control" />
        </div>
        {error ? <div className="text-error">{error}</div> : null}
        <button type="submit" className="button button-sm button-submit">Зарегистрироваться</button>
      </div>
      <div className="form-footer">
        <Link to="/signUpPage" type="button" className="button button-sm">Уже зарегистрированы?</Link>
      </div>
    </form>
  );
}

function SignUpPage() {
  const api = useContext(apiContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [dataLogin, setDataLogin] = useState({ username: '', password: '', confirmPassword: '' });
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (dataLogin.password !== dataLogin.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    const isExistUser = users.find((user) => user.username === dataLogin.username);
    if (isExistUser) {
      setError('Такой уже есть');
    } else {
      const newUser = {
        username: dataLogin.username,
        password: dataLogin.password,
        level: 1,
        exp: 0,
        expNextLvl: 100,
        status: { int: 10, str: 10, agi: 10 },
        tasks: [],
      };
      users.push(newUser);
      api.setUser({ username: newUser.username });
      navigate('/', { replace: true });
    }
  };
  const onChangeDataForm = (dataKey) => (ev) => {
    setDataLogin({ ...dataLogin, [dataKey]: ev.target.value });
  };
  return (
    <div className="container-sm">
      <SigUpForm
        onChangeDataLogin={onChangeDataForm}
        error={error}
        dataLogin={dataLogin}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default SignUpPage;
