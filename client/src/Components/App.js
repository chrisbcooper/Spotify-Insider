import '../Styles/App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Login from './Intro/Login';

function App() {
  return (
    <div className="App" >
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
