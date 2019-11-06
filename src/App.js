import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import styles from './App.module.css';
import './assets/styles/variables.css';

import Home from './views/Home/Home';
import Nav from './views/Nav/Nav';
import About from './views/about/About';
import Card from './components/card/Card';

import parivesh from './assets/images/parivesh.webp';

function App() {
  return (
    <div className={styles.App}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/events">
          <Card
            title="Parivesh"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
            color="#932EA8"
            img={parivesh}
          />
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
