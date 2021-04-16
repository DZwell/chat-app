import React, { Component } from "react";
import { LogInScreen } from "../login-screen";
import urls from "./urls";
import { ChatRoomsList } from "../chat-rooms-list";
import { ChatDetails } from "../chat-details";

const { chatDetailsUrl, chatRoomsUrl, messagesUrl } = urls;
const storedUser = JSON.parse(localStorage.getItem("currentUser"));

export class App extends Component {
  state = {
    currentUser: storedUser,
    chatRooms: [],
    selectedChatRoom: localStorage.getItem("selectedChatRoom"), // After page refresh, we'll still know what room you were in last
  };

  componentDidMount() {
    Promise.all([fetch(chatRoomsUrl), fetch(chatDetailsUrl)])

      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        // set state in here
      });
    fetch(chatRoomsUrl)
      .then((response) => response.json())
      .then(this.handleFetchRoomsSuccess, this.handleFetchRoomsFailure);
  }

  handleFetchRoomsSuccess = (data) => {
    this.setState({ chatRooms: data });
  };

  handleFetchRoomsFailure = (error) => {
    console.error(error, "Something went wrong");
  };

  handleLogIn = (userName) => {
    const userObject = { userName: userName, timeStamp: new Date().getTime() };
    localStorage.setItem("currentUser", JSON.stringify(userObject));
    this.setState({ currentUser: userName });
  };

  handleSelectedRoomChange = (room) => {
    localStorage.setItem("selectedChatRoom", room.name);
    this.setState({ selectedChatRoom: room });
  };

  render() {
    if (!this.state.currentUser) {
      return <LogInScreen handleLogIn={this.handleLogIn} />;
    }
    return (
      <div className="app">
        <ChatDetails chatRoom={this.state.selectedChatRoom} />
        <ChatRoomsList
          handleSelectedRoomChange={this.handleSelectedRoomChange}
          selectedChatRoom={this.state.selectedChatRoom}
          user={this.state.currentUser}
          chatRooms={this.state.chatRooms}
        />
      </div>
    );
  }
}
