import React, { Component } from 'react';
import { LogInScreen } from '../login-screen';
import constants from './constants';
import { ChatRoomsList } from '../chat-rooms-list';

const { chatRoomsUrl, currentUser } = constants;

export class App extends Component {
  state = {
    currentUser: localStorage.getItem(currentUser),
    chatRooms: [],
    selectedChatRoom: '',
  }

  componentDidMount() {
    fetch(chatRoomsUrl)
    .then(response => response.json())
    .then(this.handleFetchRoomsSuccess, this.handleFetchRoomsFailure);
  }

  handleFetchRoomsSuccess = (data) => {
    this.setState({ chatRooms: data, selectedChatRoom: data[0].name });
  }

  handleFetchRoomsFailure = (error) => {
    console.error(error, 'Something went wrong');
  }

  handleLogIn = (userName) => {
    localStorage.setItem(currentUser, userName);
    this.forceUpdate();
  }

  render() {
    return (
      <div className='app'>
        {this.state.currentUser
          ? <ChatRoomsList user={this.state.currentUser} chatRooms={this.state.chatRooms}/>
          : <LogInScreen handleLogIn={this.handleLogIn}/>
        }
      </div>
    )
  }
}