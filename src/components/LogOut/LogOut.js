import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../context/auth';

const LogOut = () => {
  const { logMeOut } = useAuth();

  logMeOut();
  return <Redirect to="/login" />;
};

export default LogOut;
