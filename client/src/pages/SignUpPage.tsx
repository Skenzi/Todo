import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormLogin from '../components/FormLogin';
import { setUser } from '../store/slices/userSlice';

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
  {
    name: 'confirmPassword',
    labelText: 'Подтвредите пароль',
    type: 'password',
  },
];

const infoForm = {
  pathLink: '/loginPage',
  title: 'Регистрация',
  btnSubmitText: 'Зарегистрироваться',
  btnLinkText: 'Уже зарегистрированы?',
  formGroups,
};

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [dataSignUp, setDataSignUp] = useState({ username: '', password: '', confirmPassword: '' });
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const response = axios.post('http://localhost:5000/signup', dataSignUp);
    response.then(({ data }) => {
      dispatch(setUser(data))
      sessionStorage.setItem('user', JSON.stringify(data))
      navigate('/', { replace: true });
    }).catch((err) => {
      if(err.response.status === 403) {
        setError('Такой уже есть')
      } else {
        setError('Проблемы с соединением')
      }
    })
  };
  const onChangeDataSignUp = (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDataSignUp({ ...dataSignUp, [dataKey]: ev.target.value });
  };
  return (
    <div className="container-sm bg-main">
      <FormLogin
        onChangeDataForm={onChangeDataSignUp}
        error={error}
        onSubmit={onSubmit}
        infoForm={infoForm}
      />
    </div>
  );
}

export default SignUpPage;
