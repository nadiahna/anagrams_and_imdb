import './App.css';
import React from "react";
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import Anagram from './pages/Anagram';
import ListMovie from './pages/ListMovie';
import DetailMovie from './pages/DetailMovie';

export default function App({history}) {

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route component={Anagram} exact path="/" />
          <Route component={ListMovie} exact path="/list-movie" />
          <Route component={DetailMovie} exact path="/detail-movie/:id" />
        </Switch>
      </Router>
    </div>
  );
}
