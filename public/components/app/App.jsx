import React, { Component } from "react";
import 'regenerator-runtime/runtime'
import { LogInScreen } from "../LoginScreen";
import urls from "./urls";
import { ChatRoomsList } from "../ChatRoomList";
import { ChatDetails } from "../ChatDetails";

const { chatDetailsUrl, chatRoomsUrl, messagesUrl } = urls;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      chatRooms: [],
      selectedChatRoom: {},
    };
  }

  componentDidMount() {
    const { storage } = this.props;
    this.setState(state => ({
      currentUser: JSON.parse(storage.getItem("currentUser")),
    }));

    this.fetchChatRooms();
  }

  fetchChatRooms = async () => {
    try {
      const roomList = await fetch(chatRoomsUrl).then(response => response.json());
      const selectedChatRoom = JSON.parse(this.props.storage.getItem('selectedChatRoom')) || roomList[0];
      const roomDetails = await fetch(chatDetailsUrl(selectedChatRoom.id)).then(response => response.json());
      this.setState(state => ({ chatRooms: roomList, selectedChatRoom: roomDetails }));
    } catch {
      console.log('Something went wrong');
    }
  }

  handleLogIn = (userName) => {
    const userObject = { userName: userName, timeStamp: new Date().getTime() };
    this.props.storage.setItem("currentUser", JSON.stringify(userObject));
    this.setState(state => ({ currentUser: userObject }));
  };

  handleSelectedRoomChange = async (roomId) => {
    const roomDetails = await fetch(chatDetailsUrl(roomId)).then(response => response.json());
    this.props.storage.setItem("selectedChatRoom", JSON.stringify(roomDetails));
    this.setState(state => ({ selectedChatRoom: roomDetails }));
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
