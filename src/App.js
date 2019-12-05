import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ApolloProvider } from '@apollo/react-hooks';
import useApolloClient from './graphQl/client';
import { AuthContext } from './context/auth';

import styles from './App.module.css';
import './assets/styles/variables.css';

import Loader from './components/Loader/Loader';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Nav from './views/Nav/Nav';

const Home = React.lazy(() => import('./views/Home/Home'));
const About = React.lazy(() => import('./views/about/About'));
const Event = React.lazy(() => import('./views/events/Event'));
const LoginRegister = React.lazy(() => import('./views/loginRegister/LoginRegister'));
const Verify = React.lazy(() => import('./views/Verify/Verify'));
const NotFound = React.lazy(() => import('./views/NotFound/NotFound'));
const EventDetails = React.lazy(() => import('./views/EventDetails/EventDetails'));
const Contact = React.lazy(() => import('./views/contactUs/ContactUs'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const LogOut = React.lazy(() => import('./components/LogOut/LogOut'));

function App() {
  const [authToken, setAuthToken] = useState();
  const client = useApolloClient(authToken);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token && authToken) setAuthToken(null);
    if (token && !authToken) setAuthToken(token);
  }, [authToken]);

  const logMeOut = () => {
    window.localStorage.removeItem('token');
    setAuthToken(null);
  };

  const setToken = data => {
    window.localStorage.setItem('token', data);
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, logMeOut }}>
      <ApolloProvider client={client}>
        <div className={styles.App}>
          <Suspense fallback={<Loader fill="#000000" />}>
            <Nav />
            <Switch>
              <Route exact path="/">
                <ParallaxProvider>
                  <Home />
                </ParallaxProvider>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/events">
                <Event />
              </Route>

              <Route exact path={['/events/:eventId', '/events/:eventId/:subEventId']}>
                <EventDetails />
              </Route>
              <Route exact path={['/login', '/register']}>
                <LoginRegister />
              </Route>
              <Route exact path="/verify/:token">
                <Verify />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <ProtectedRoute exact path="/dashboard">
                <Dashboard />
              </ProtectedRoute>
              <Route exact path="/logout">
                <LogOut />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
