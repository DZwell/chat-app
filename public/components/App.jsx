import React, { Component } from 'react';
import { LogInScreen } from './LoginScreen';

export class App extends Component {
  state = {
    currentUser: localStorage.getItem('currentUser'),
  }

  handleLogIn = (userName) => {
    localStorage.setItem('currentUser', userName);
    this.forceUpdate();
  }

  render() {
    return (
      <div className='app'>
        {this.state.currentUser
          ? <div>Welcome {this.state.currentUser}</div>
          : <LogInScreen handleLogIn={this.handleLogIn}/>
        }
      </div>
    )
  }
}