import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
       params: this.props.location.search.slice(14) || '',
    };
  }


  render() {
    return (
      <div> 
        <a href="http://localhost:8888/api/login">Login</a>
      </div>
    );
  } 
}
export default Home;