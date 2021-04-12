import React, { Component } from 'react';

export class App extends Component {
  state ={
    data: [],
    currentUser: sessionStorage.getItem('currentUser'),
    logInField: '',
  }

  handleLogIn = () => {
    sessionStorage.setItem('currentUser', this.state.logInField);
    this.forceUpdate();
  }

  handleUserEntry = (event) => {
    const value = event.target.value;
    this.setState({ logInField: value });
  }

  renderLogin = () => {
    return (
      <form>
        <input onChange={this.handleUserEntry}/>
        <button onClick={this.handleLogIn}>Log in</button>
      </form>
    )
  }

  render() {
    return (
      <div>
        {this.state.currentUser ? <div>Welcome {this.state.currentUser}</div> : this.renderLogin()}
      </div>
    )
  }
}