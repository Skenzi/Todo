import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiContext from '../../context';
import users from '../../store/users';
import GroupControls from '../GroupControl.jsx';

const groupControls = [
  {
    name: 'username',
    labelText: 'Имя пользователя',
    type: 'text',
  },
  {
    name: 'password',
    labelText: 'Пароль',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    labelText: 'Подтвредите пароль',
    type: 'password',
  },
];

function SigUpForm({
  onChangeDataSignUp, error, dataLogin, onSubmit,
}) {
  return (
    <form className="form bg-main" onSubmit={onSubmit}>
      <div className="form-title">Вход в систему</div>
      <div className="form-body">
        {groupControls.map((item) => (
          <GroupControls
            key={item.name}
            infoControl={item}
            dataLogin={dataLogin}
            onChangeDataForm={onChangeDataSignUp}
          />
        ))}
        {error ? <div className="text-error">{error}</div> : null}
        <button type="submit" className="button button-sm button-submit">Зарегистрироваться</button>
      </div>
      <div className="form-footer">
        <Link to="/loginPage" type="button" className="button button-sm">Уже зарегистрированы?</Link>
      </div>
    </form>
  );
}

function SignUpPage() {
  const api = useContext(apiContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [dataSignUp, setDataSignUp] = useState({ username: '', password: '', confirmPassword: '' });
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (dataSignUp.password !== dataSignUp.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    const isExistUser = users.find((user) => user.username === dataSignUp.username);
    if (isExistUser) {
      setError('Такой уже есть');
    } else {
      const newUser = {
        username: dataSignUp.username,
        password: dataSignUp.password,
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
  const onChangeDataSignUp = (dataKey) => (ev) => {
    setDataSignUp({ ...dataSignUp, [dataKey]: ev.target.value });
  };
  return (
    <div className="container-sm">
      <SigUpForm
        onChangeDataForm={onChangeDataSignUp}
        error={error}
        dataSignUp={dataSignUp}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default SignUpPage;
