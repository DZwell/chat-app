import * as React from 'react';
import { ChatMessage, CurrentUser } from '../App/interfaces';
import { MessageBox } from '../MessageBox/MessageBox';
import './MessagesView.css';
import urls from '../App/urls';

interface MessagesViewProps {
  currentUser: CurrentUser;
  chatMessages: ChatMessage[];
  selectedChatRoomId: number;
  sendMessageRequest: (currentMessage: string) => void;
}

interface MessagesViewState {
  currentMessage: string;
}

export class MessagesView extends React.Component<MessagesViewProps, MessagesViewState> {
  state: MessagesViewState = {
    currentMessage: '',
  }

  sendMessageRequest = async (event) => {
    event.preventDefault();
    const { selectedChatRoomId, currentUser } = this.props;
    await fetch(urls.messagesUrl(selectedChatRoomId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: currentUser.userName, message: this.state.currentMessage })
    }).then(res => res.json());
    this.setState(() => ({ currentMessage: ''}));
  }

  handleMessageChange = (event: React.FormEvent) => {
    const message = event.target as HTMLInputElement;
    this.setState(() => ({ currentMessage: message.value }));
  }

  private messageKey = (user, index) => `${user}-${index}`;

  render() {
    const { chatMessages, currentUser } = this.props;
    return (
      <div>
        <ul className='chatList'>
          {chatMessages.map((message, index) =>
            <MessageBox
              key={this.messageKey(message.name, index)}
              isOutgoingMessage={message.name === currentUser.userName}
              message={message}
            />)}
        </ul>
        <footer>
          <form className="messageForm" onSubmit={this.sendMessageRequest}>
            <input onChange={this.handleMessageChange} placeholder="Type your message" />
            <div onClick={this.sendMessageRequest}>Send</div>
          </form>
        </footer>
      </div>
    )
  }
}

