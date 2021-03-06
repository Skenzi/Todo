import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import apiContext from '../context';
import { setUser } from '../store/slices/userSlice';
import FormLogin from '../components/FormLogin';

const formGroups = [
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
  pathLink: '/signUpPage',
  title: 'Вход в систему',
  btnSubmitText: 'Войти',
  btnLinkText: 'Не зарегистрированы?',
  formGroups,
};

function LoginPage() {
  const api = useContext(apiContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [dataLogin, setDataLogin] = useState({ username: '', password: '' });

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    axios.post('http://localhost:5000/login', dataLogin)
     .then(({data})=> {
        dispatch(setUser(data))
        sessionStorage.setItem('user', JSON.stringify(data));
        navigate('/', { replace: true });
     }).catch((err) => {
       if(err.response.status === 401) {
        setError('Неправильное имя пользователя или пароль');
       }
     })
  };
  const onChangeDataForm = (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDataLogin({ ...dataLogin, [dataKey]: ev.target.value });
  };

  return (
    <div className="container-sm">
      <FormLogin
        onChangeDataForm={onChangeDataForm}
        error={error}
        onSubmit={onSubmit}
        infoForm={infoForm}
      />
    </div>
  );
}

export default LoginPage;
