import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './auth.css';

class Auth extends Component {
    state = {
      user: null,
      showRegister: false,
      admin: false,
    };
  
    getMessage = error => error.response
      ? error.response.data
        ? error.response.data.message
        : JSON.stringify(error.response.data, null, 2)
      : error.message;
  
    register = () => {
      this.setState({ message: null });
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      const email = this.refs.email.value;
      const phoneNumber = this.refs.phoneNumber.value;
      axios.post('/register', {
        email,
        username,
        password,
        phoneNumber
      }).then(response => {
        this.setState({ user: response.data });
      }).catch(error => {
        this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
      });
    };
    
    login = () => {
      this.setState({ message: null });
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      const admin = this.state.value;
      axios.post('/login', {
        username,
        password,
        admin
      }).then(response => {
        this.setState({ user: response.data });
      }).catch(error => {
        this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
      });
    };
  
    logout = () => {
      axios.post('/logout').then(response => {
        this.setState({ user: null });
      }).catch(error => {
        this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
      });
    };
  
    render() {
      const { user, showRegister, message} = this.state;
      // const userData = JSON.stringify(user, null, 2);
      const signUp = <div className="signup-input">
        Email: <input type="email" ref="email" />
        {' '}
        Username: <input ref="username" />
        {' '}
        Password: <input type="password" ref="password" />
        {' '}
        Phone Number: <input type="phoneNumber" ref="phoneNumber" />
        {' '}
      </div>
      const login =<div className="login-input">
      Username: <input ref="username" />
      {' '}
      Password: <input type="password" ref="password" />
      {' '}
    </div>
  
      return (
        <div>
          <header className="App-header">
            <h1 className="login-register">Login/Register</h1>
          </header>
          <div>
            {!user && <div>
              <a className="login-link" href="javascript:void(0)" onClick={() => this.setState({ showRegister: false })}>Login</a>
              {' '}
              <a className="register-link" href="javascript:void(0)" onClick={() => this.setState({ showRegister: true })}>Register</a>
              <div className="login-or-register">
                {showRegister && <div>
                  <h2 className="register-sign">Register</h2>
                  {signUp}
                  <button className="register" onClick={this.register}>Register</button>
                </div>}
                {!showRegister && <div>
                  <h2 className="login-sign">Log in</h2>
                  {login}
                  <button className="login" onClick={this.login}>Login</button>
                </div>}
                {message}
              </div>
            </div>}
            {user && <div className="user-info">
              <h2 className="welcome-back">Welcome!</h2>
              {/* <div>{ userData }</div> */}
              <Link className="back-to-homepage" to='/'>Back To HomePage</Link>
              <button className="logout" onClick={this.logout}>Log out</button>
            </div>}
          </div>
        </div>
      );
    }
  }

  export default Auth;