import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import styles from './App.module.css';
import './assets/styles/variables.css';

import Home from './views/Home/Home';
import Nav from './views/Nav/Nav';

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
