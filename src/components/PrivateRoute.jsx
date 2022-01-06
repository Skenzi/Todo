import React, { useContext } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import apiContext from '../context/index';

function PrivateRoute({ children }) {
  const { user } = useContext(apiContext);
  return user.username && user.password ? children : <LoginPage />;
}

export default PrivateRoute;
