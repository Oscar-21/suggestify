import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import IndecisionApp from './IndecisionApp';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={props => <IndecisionApp {...props} />} />
      </Switch>
    );
  }
}
export default App;