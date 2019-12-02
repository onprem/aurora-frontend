import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ApolloProvider } from '@apollo/react-hooks';
import useApolloClient from './graphQl/client';
import { AuthContext } from './context/auth';

import styles from './App.module.css';
import './assets/styles/variables.css';

import Home from './views/Home/Home';
import Nav from './views/Nav/Nav';
import About from './views/about/About';
import Event from './views/events/Event';
import LoginRegister from './views/loginRegister/LoginRegister';
import NotFound from './views/NotFound/NotFound';
import EventDetails from './views/EventDetails/EventDetails';
import Contact from './views/contactUs/ContactUs';
import Dashboard from './views/Dashboard/Dashboard';
import LogOut from './components/LogOut/LogOut';

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
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/logout">
              <LogOut />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
