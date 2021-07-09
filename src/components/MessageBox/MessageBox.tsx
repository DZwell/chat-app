import React from 'react';
import './MessageBox.css';
import { ChatMessage } from '../App/interfaces';
import { DeleteMessageButton } from '../DeleteMessageButton/DeleteMessageButton';

interface MessageBoxProps {
  handleDeleteMessage: (messageId: string) => void;
  handleMessageReaction: (messageId: string) => void;
  isOutgoingMessage: boolean;
  message: ChatMessage;
}

export const MessageBox = (props: MessageBoxProps) => {
  const {
    handleDeleteMessage,
    handleMessageReaction,
    isOutgoingMessage,
    message,
  } = props;

  return (
    <li className={isOutgoingMessage ? 'outgoing' : 'incoming'}>
      <p onClick={() => handleMessageReaction(message.id)} className='message'>
        {message.message}
      </p>
      <DeleteMessageButton
        handleDeleteMessage={handleDeleteMessage}
        messageId={message.id}
      />
      <span>{message.reaction}</span>
      {!isOutgoingMessage && <h2>{message.name}</h2>}
    </li>
  );
};
