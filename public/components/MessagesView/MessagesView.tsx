import * as React from 'react';
import { ChatMessage, CurrentUser } from '../App/interfaces';
import { MessageBox } from '../MessageBox/MessageBox';
import './MessagesView.css';
import urls from '../App/urls';

interface MessagesViewProps {
  currentUser: CurrentUser;
  chatMessages: ChatMessage[];
  selectedChatRoomId: number;
}

interface MessagesViewState {
  currentMessage: string;
}

export class MessagesView extends React.Component<MessagesViewProps, MessagesViewState> {
  messagesEndRef = React.createRef<HTMLUListElement>();
  state: MessagesViewState = {
    currentMessage: '',
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEndRef) {
      this.messagesEndRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event as any;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }

  findMessageIndex = (messageId: string) => {
    const messageIndex = this.props.chatMessages.findIndex((message) => {
      return message.id === messageId
    })
    return messageIndex
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

  handleMessageReaction = async (messageId: string) => {
    await fetch(urls.reactionUrl(this.props.selectedChatRoomId, messageId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json());
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
        <ul ref={this.messagesEndRef} className='chatList'>
          {chatMessages.map((message, index) =>
            <MessageBox
              key={this.messageKey(message.name, index)}
              handleMessageReaction={this.handleMessageReaction}
              isOutgoingMessage={message.name === currentUser.userName}
              message={message}
            />)}
        </ul>
        <footer>
          <form className="messageForm" onSubmit={this.sendMessageRequest}>
            <input value={this.state.currentMessage} onChange={this.handleMessageChange} placeholder="Type a message...." />
            <div onClick={this.sendMessageRequest}>Send</div>
          </form>
        </footer>
      </div>
    )
  }
}

