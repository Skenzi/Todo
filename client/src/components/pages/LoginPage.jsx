import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiContext from '../../context';
import users from '../../store/users';
import { fetchUserData } from '../../store/slices/userSlice';
import FormLogin from '../FormLogin.jsx';

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
];

const infoForm = {
  title: 'Вход в систему',
  btnSubmitText: 'Войти',
  btnLinkText: 'Не зарегистрированы?',
  groupControls,
};

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
      <FormLogin
        onChangeDataForm={onChangeDataLogin}
        error={error}
        dataLogin={dataLogin}
        onSubmit={onSubmit}
        infoForm={infoForm}
      />
    </div>
  );
}

export default LoginPage;
