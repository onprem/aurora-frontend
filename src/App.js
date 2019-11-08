import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import styles from './App.module.css';
import './assets/styles/variables.css';

import Home from './views/Home/Home';
import Nav from './views/Nav/Nav';
import About from './views/about/About';
import Event from './views/events/Event';
import EventDetails from './views/EventDetails/EventDetails';

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
        <Route>
          <h1>You Lost?</h1>
          <h3 style={{ borderBottom: '2px solid black' }}>
            <Link to="/">Go Home</Link>
          </h3>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
