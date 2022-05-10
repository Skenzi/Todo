import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiContext from '../context';
import FormLogin from '../components/FormLogin';
import { setUser } from '../store/slices/userSlice';
import { User } from '../types/types';

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
  title: 'Регистрация',
  btnSubmitText: 'Зарегистрироваться',
  btnLinkText: 'Уже зарегистрированы?',
  formGroups,
};

function SignUpPage() {
  const api = useContext(apiContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [dataSignUp, setDataSignUp] = useState({ username: '', password: '', confirmPassword: '' });
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    navigate('/', { replace: true });
  };
  const onChangeDataSignUp = (dataKey: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDataSignUp({ ...dataSignUp, [dataKey]: ev.target.value });
  };
  return (
    <div className="container-sm">
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
