import React from 'react';
import { Redirect } from 'react-router-dom';

const LogOut = ({ logMeOut }) => {
  logMeOut();
  return <Redirect to="/login" />;
};

export default LogOut;
