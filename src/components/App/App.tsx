import * as React from 'react';
import 'regenerator-runtime/runtime';
import { LoginScreen } from '../LoginScreen';
import { chatDetailsUrl, chatRoomsUrl } from './urls';
import './App.css';
import { ChatRoomsList } from '../ChatRoomList/ChatRoomsList';
import { ChatWindowContainer } from '../ChatWindowContainer/ChatWindowContainer';
import { CurrentUser, ChatRoom } from './interfaces';

interface AppProps {
  storage: any;
}

interface AppState {
  currentUser: CurrentUser;
  chatRooms: ChatRoom[];
  hasError: boolean;
  isLoading: boolean;
  selectedChatRoom: ChatRoom;
}

export class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    currentUser: null,
    chatRooms: [],
    hasError: false,
    isLoading: false,
    selectedChatRoom: null,
  };

  componentDidMount() {
    const { storage } = this.props;
    this.setState(() => ({
      currentUser: JSON.parse(storage.getItem('currentUser')),
    }));

    this.fetchRoomsAndDetails();
  }

  fetchRoomsAndDetails = async () => {
    this.setState(() => ({ isLoading: true }));
    try {
      const roomList = await fetch(chatRoomsUrl).then((response) =>
        response.json()
      );
      const selectedChatRoom =
        JSON.parse(this.props.storage.getItem('selectedChatRoom')) ||
        roomList[0];
      const roomDetails = await fetch(chatDetailsUrl(selectedChatRoom.id)).then(
        (response) => response.json()
      );
      this.setState(() => ({
        chatRooms: roomList,
        isLoading: false,
        selectedChatRoom: roomDetails,
      }));
    } catch {
      console.log(
        "One day I'll implement actual error/loading state handling. Today is not that day."
      );
      this.setState(() => ({ hasError: true, isLoading: false }));
    }
  };

  handleLogIn = (userName: string) => {
    const userObject = { userName: userName, timeStamp: new Date().getTime() };
    this.props.storage.setItem('currentUser', JSON.stringify(userObject));
    this.setState(() => ({ currentUser: userObject }));
  };

  handleSelectedRoomChange = async (roomId) => {
    this.setState(() => ({ isLoading: true }));
    try {
      const roomDetails = await fetch(chatDetailsUrl(roomId)).then((response) =>
        response.json()
      );
      this.props.storage.setItem(
        'selectedChatRoom',
        JSON.stringify(roomDetails)
      );
      this.setState(() => ({
        isLoading: false,
        selectedChatRoom: roomDetails,
      }));
    } catch {
      console.log(
        "One day I'll implement better error handling. Today is not that day."
      );
      this.setState(() => ({ hasError: true, isLoading: false }));
    }
  };

  render() {
    const { chatRooms, currentUser, selectedChatRoom } = this.state;

    if (!currentUser) {
      return <LoginScreen handleLogIn={this.handleLogIn} />;
    }
    return (
      <div className='app'>
        {selectedChatRoom && (
          <ChatWindowContainer
            chatRoom={selectedChatRoom}
            currentUser={currentUser}
          />
        )}
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
