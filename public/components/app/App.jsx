import React, { Component } from 'react';
import { LogInScreen } from '../login-screen';
import constants from './constants';
import { ChatRoomsList } from '../chat-rooms-list';

const { chatRoomsUrl, currentUser } = constants;

export class App extends Component {
  state = {
    currentUser: localStorage.getItem(currentUser),
    chatRooms: [],
  }

  componentDidMount() {
    fetch(chatRoomsUrl)
    .then(response => response.json())
    .then(this.handleFetchRoomsSuccess);
  }

  handleFetchRoomsSuccess = (data) => {
    this.setState({ chatRooms: data });
  }

  handleLogIn = (userName) => {
    localStorage.setItem(currentUser, userName);
    this.forceUpdate();
  }

  render() {
    return (
      <div className='app'>
        {this.state.currentUser
          ? <ChatRoomsList chatRooms={this.state.chatRooms}/>
          : <LogInScreen handleLogIn={this.handleLogIn}/>
        }
      </div>
    )
  }
}