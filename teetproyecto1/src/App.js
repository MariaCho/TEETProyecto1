import React, { Component } from 'react';
import './loginSty.scss';
import fire from './config/Fire';
import LoginBox from './LoginBox.js';
import Mapa from './Mapa.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };     
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }

  render() {  
    return (
      <div className="root-container">{this.state.user? ( <Mapa/>) : (<LoginBox />)}</div>
    );
  }
}

export default App;  
