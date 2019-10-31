import React from 'react';
import styles from './App.module.css';

import Nav from './views/nav/Nav';

function App() {
  return (
    <div className={styles.App}>
      {/* <img src="/assets/logo.svg" className={styles.logo} alt="Aurora logo" /> */}
      <Nav />
    </div>
  );
}

export default App;
