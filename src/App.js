import './App.css';
import React from "react";
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import ListMovie from './ListMovie';
import DetailMovie from './DetailMovie';

export default function App({history}) {

  
const MainPages = () => {
  <Switch>
    <Route component={ListMovie} exact path="/" />
    <Route component={DetailMovie} exact path="/detail-movie" />
  </Switch>
}

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route component={ListMovie} exact path="/" />
          <Route component={DetailMovie} exact path="/detail-movie/:id" />
        </Switch>
      </Router>
    </div>
  );
}
