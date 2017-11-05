import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

class App extends Component {

  render() {
    return (
      <Switch>
      {console.log('renderONe')}
        <Route exact path='/' render={(props) => <Home {...props} />} /> 
        <Route path='/about' render={(props) => <About {...props} />} /> 
      </Switch>
    );
  }
}
export default App;
