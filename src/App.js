import React from 'react';
import styles from './App.module.css';
import './assets/styles/variables.css';

import Home from './views/Home/Home';
import Nav from './views/Nav/Nav';

function App() {
  return (
    <div className={styles.App}>
      <Home />
    </div>
  );
}

export default App;
