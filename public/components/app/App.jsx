import React, { Component } from 'react';
import { LogInScreen } from '../login-screen';
import constants from './constants';
import { ChatRoomsList } from '../chat-rooms-list';

const { chatRoomsUrl, currentUser, selectedChatRoom } = constants;

export class App extends Component {
  state = {
    currentUser: localStorage.getItem(currentUser),
    chatRooms: [],
    selectedChatRoom: localStorage.getItem(selectedChatRoom), // After page refresh, we'll still know what room you were in last
  }

  componentDidMount() {
    fetch(chatRoomsUrl)
    .then(response => response.json())
    .then(this.handleFetchRoomsSuccess, this.handleFetchRoomsFailure);
  }

  handleFetchRoomsSuccess = (data) => {
    this.setState({ chatRooms: data });
  }

  handleFetchRoomsFailure = (error) => {
    console.error(error, 'Something went wrong');
  }

  handleLogIn = (userName) => {
    localStorage.setItem(currentUser, userName);
    this.forceUpdate();
  }

  handleSelectedRoomChange = (roomName) => {
    localStorage.setItem(selectedChatRoom, roomName);
    this.setState({ selectedChatRoom: roomName });
  }

  render() {
    return (
      <div className='app'>
        {this.state.currentUser
          ? <ChatRoomsList handleSelectedRoomChange={this.handleSelectedRoomChange} selectedChatRoom={this.state.selectedChatRoom} user={this.state.currentUser} chatRooms={this.state.chatRooms}/>
          : <LogInScreen handleLogIn={this.handleLogIn}/>
        }
      </div>
    )
  }
}