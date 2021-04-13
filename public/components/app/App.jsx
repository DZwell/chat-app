import React, { Component } from 'react';
import { LogInScreen } from '../login-screen';
import { ChatRoomsList } from '../chat-rooms-list';


const CURRENT_USER = 'currentUser';
const chatRoomsUrl = 'http://localhost:8080/api/rooms';

export class App extends Component {
  state = {
    currentUser: localStorage.getItem(CURRENT_USER),
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
    localStorage.setItem(CURRENT_USER, userName);
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