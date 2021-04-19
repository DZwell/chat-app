import * as React from "react";
import 'regenerator-runtime/runtime'
import { LogInScreen } from "../LoginScreen";
import urls from "./urls";
import './App.css';
import { ChatRoomsList } from "../ChatRoomList";
import { ChatWindowContainer } from "../ChatWindowContainer/ChatWindowContainer";
import { CurrentUser, ChatRoom } from './interfaces';

const { chatDetailsUrl, chatRoomsUrl } = urls;

interface AppProps {
  storage: any;
}

interface AppState {
  currentUser: CurrentUser;
  chatRooms: ChatRoom[],
  selectedChatRoom: ChatRoom,
}

export class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    currentUser: null,
    chatRooms: [],
    selectedChatRoom: null,
  };

  componentDidMount() {
    const { storage } = this.props;
    this.setState(() => ({
      currentUser: JSON.parse(storage.getItem("currentUser")),
    }));

    this.fetchRoomsAndDetails();
  }

  fetchRoomsAndDetails = async () => {
    try {
      const roomList = await fetch(chatRoomsUrl).then(response => response.json());
      const selectedChatRoom = JSON.parse(this.props.storage.getItem('selectedChatRoom')) || roomList[0];
      const roomDetails = await fetch(chatDetailsUrl(selectedChatRoom.id)).then(response => response.json());
      this.setState(() => ({ chatRooms: roomList, selectedChatRoom: roomDetails }));
    } catch {
      console.log('Something went wrong');
    }
  }

  handleLogIn = (userName: string) => {
    const userObject = { userName: userName, timeStamp: new Date().getTime() };
    this.props.storage.setItem("currentUser", JSON.stringify(userObject));
    this.setState(() => ({ currentUser: userObject }));
  };

  handleSelectedRoomChange = async (roomId) => {
    const roomDetails = await fetch(chatDetailsUrl(roomId)).then(response => response.json());
    this.props.storage.setItem("selectedChatRoom", JSON.stringify(roomDetails));
    this.setState(() => ({ selectedChatRoom: roomDetails }));
  };

  render() {
    const { chatRooms, currentUser, selectedChatRoom } = this.state;

    if (!currentUser) {
      return <LogInScreen handleLogIn={this.handleLogIn} />;
    }
    return (
      <div className="app">
        {selectedChatRoom && <ChatWindowContainer chatRoom={selectedChatRoom} currentUser={currentUser} />}
        <ChatRoomsList
          handleSelectedRoomChange={this.handleSelectedRoomChange}
          selectedChatRoom={selectedChatRoom}
          user={currentUser}
          chatRooms={chatRooms}
        />
      </div>
    );
  }
}
