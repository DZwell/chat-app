import React, { Component } from "react";
import "./LoginScreen.css";

export class LogInScreen extends Component {
  state = {
    logInField: "",
  };

  handleLogIn = () => {
    this.props.handleLogIn(this.state.logInField);
  };

  handleUserEntry = (event) => {
    const value = event.target.value;
    this.setState({ logInField: value });
  };

  render() {
    return (
      <form onSubmit={this.handleLogIn} className="formContainer">
        <input
          className="userField"
          placeholder="Type your username..."
          onChange={this.handleUserEntry}
        />
        <div className="loginButton" onClick={this.handleLogIn}>
          Join the DoorDash Chat!
        </div>
      </form>
    );
  }
}
