import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/auth';

const ProtectedRoute = ({ children, ...rest }) => {
  const { authToken } = useAuth();
  const location = useLocation();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>
      {authToken ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { referer: location.pathname } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
