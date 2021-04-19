import * as React from "react";
import { MessagesView } from '../MessagesView/MessagesView';
import urls from "../App/urls";
import "./ChatWindowContainer.css";
import { ChatDetails } from '../ChatDetails/ChatDetails';
import { CurrentUser, ChatRoom, ChatMessage } from '../App/interfaces';

const { messagesUrl } = urls;

interface ChatWindowContainerProps {
  currentUser: CurrentUser;
  chatRoom: ChatRoom;
}

interface ChatWindowContainerState {
  chatMessages: ChatMessage[];
}

export class ChatWindowContainer extends React.Component<ChatWindowContainerProps, ChatWindowContainerState> {
  intervalId: NodeJS.Timeout = null;
  usersInRoom = [this.props.currentUser.userName, ...this.props.chatRoom.users];
  state: ChatWindowContainerState = {
    chatMessages: [],
  }

  componentDidMount() {
    this.pollForNewMessages();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  private pollForNewMessages() {
    this.intervalId = setInterval(async () => {
      const messages: ChatMessage[] = await fetch(messagesUrl(this.props.chatRoom.id))
        .then(response => response.json());
      this.setState(() => ({ chatMessages: messages }));
    }, 500);
  }

  render() {
    const { chatRoom, currentUser} = this.props;

    return (
      <div className="chatDetailsContainer">
        <ChatDetails currentUser={currentUser} chatRoom={chatRoom} usersInRoom={this.usersInRoom}/>
        <MessagesView
          chatMessages={this.state.chatMessages}
          selectedChatRoomId={this.props.chatRoom.id}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
};
