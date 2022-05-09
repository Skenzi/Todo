import React, { useContext } from 'react';
import LoginPage from '../pages/LoginPage';
import apiContext from '../context/index';

function PrivateRoute({ children }: { children: React.ReactElement}) {
  const { user } = useContext(apiContext);
  return user.username && user.password ? children : <LoginPage />;
}

export default PrivateRoute;
