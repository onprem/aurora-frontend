import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

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

function App() {
  return (
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
