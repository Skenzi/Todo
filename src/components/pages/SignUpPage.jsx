import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiContext from '../../context';
import users from '../../store/users';
import FormLogin from '../FormLogin.jsx';
import { fetchUserData } from '../../store/slices/userSlice';

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

const infoForm = {
  title: 'Регистрация',
  btnSubmitText: 'Зарегистрироваться',
  btnLinkText: 'Уже зарегистрированы?',
  groupControls,
};

function SignUpPage() {
  const api = useContext(apiContext);
  const dispatch = useDispatch();
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
      dispatch(fetchUserData(newUser));
      navigate('/', { replace: true });
    }
  };
  const onChangeDataSignUp = (dataKey) => (ev) => {
    setDataSignUp({ ...dataSignUp, [dataKey]: ev.target.value });
  };
  return (
    <div className="container-sm">
      <FormLogin
        onChangeDataForm={onChangeDataSignUp}
        error={error}
        dataControls={dataSignUp}
        onSubmit={onSubmit}
        infoForm={infoForm}
      />
    </div>
  );
}

export default SignUpPage;
