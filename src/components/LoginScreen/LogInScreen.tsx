import * as React from 'react';
import './LoginScreen.css';

interface LoginScreenProps {
  handleLogIn: (userName: string) => void;
}

interface LoginScreenState {
  loginFormValue: string;
}

export class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
  state: LoginScreenState = {
    loginFormValue: '',
  };

  handleLogIn = () => {
    this.props.handleLogIn(this.state.loginFormValue);
  };

  handleUserEntry = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ loginFormValue: target.value });
  };

  render() {
    return (
      <form
        onSubmit={() => this.props.handleLogIn(this.state.loginFormValue)}
        className='formContainer'
      >
        <input
          className='userField'
          placeholder='Type your username...'
          onChange={this.handleUserEntry}
        />
        <div className='loginButton' onClick={this.handleLogIn}>
          Join Chatterfly!
        </div>
      </form>
    );
  }
}
