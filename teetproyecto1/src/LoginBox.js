import React, {  } from 'react';
import fire from './config/Fire';
import './loginSty.css';
class LoginBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: ""
      };
    }
    
    onEmailChange(e) {
      this.setState({email: e.target.value});
    }
  
    onPasswordChange(e) {
      this.setState({password: e.target.value});
    }

    submitLogin(e) {
      /*const data = JSON.stringify(this.state);
      console.log(data);
      this.setState({
        email: "",
        password: ""
      });*/
      e.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).catch((error) => {
        console.log(error);
      });
    }

    submitRegister(e) {
      /*const data = JSON.stringify(this.state);
      console.log(data);
      this.setState({
        email: "",
        password: ""
      });*/
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{console.log(u)})
      .catch((error) => {
        console.log(error);
      });
    }
  
    render() {
      return (
        <div className="root-container">
          <div className="inner-container">
            <div className="header">
              GPS Tracking service
            </div>
            <div className="box">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" className="login-input" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
              </div>
              <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
              <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Login</button>
            </div>
          </div>
        </div>
      );
    }
  }

  export default LoginBox;