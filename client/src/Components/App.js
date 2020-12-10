import '../Styles/App.css';
import React, { useState, useEffect } from 'react';

import {token} from '../Spotify';
import {isNull} from '../Utils';

import Login from './Intro/Login';
import HomePage from './Main/HomePage';



function App() {

  const [localToken, setLocalToken] = useState();

  useEffect(() => {
    setLocalToken(token);
  }, [localToken]);




  return (
    <div className="App" >
      {isNull(localToken) ? <Login /> : <HomePage />}
    </div>
  );
}

export default App;
