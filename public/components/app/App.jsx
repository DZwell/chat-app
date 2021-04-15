import React, { Component } from 'react';
import { LogInScreen } from '../login-screen';
import constants from './constants';
import { ChatRoomsList } from '../chat-rooms-list';
import { ChatDetails } from '../chat-details';

const { chatRoomsUrl, currentUser, selectedChatRoom } = constants;
const storedUser = JSON.parse(localStorage.getItem(currentUser));

export class App extends Component {
  state = {
    currentUser: storedUser,
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
    const userObject = { userName: userName, timeStamp: new Date().getTime()}
    localStorage.setItem(currentUser, JSON.stringify(userObject));
    this.setState({ currentUser: userName });
  }

  handleSelectedRoomChange = (roomName) => {
    localStorage.setItem(selectedChatRoom, roomName);
    this.setState({ selectedChatRoom: roomName });
  }

  render() {
    if (!this.state.currentUser) {
      return <LogInScreen handleLogIn={this.handleLogIn}/>
    }
    return (
      <div className='app'>
        <ChatDetails />
        <ChatRoomsList handleSelectedRoomChange={this.handleSelectedRoomChange} selectedChatRoom={this.state.selectedChatRoom} user={this.state.currentUser} chatRooms={this.state.chatRooms}/>
      </div>
    )
  }
}