import React from 'react';
import './MessageBox.css';
import { ChatMessage } from '../App/interfaces';

interface MessageBoxProps {
  handleMessageReaction: (messageId: string) => void;
  isOutgoingMessage: boolean;
  message: ChatMessage;
}

export const MessageBox = (props: MessageBoxProps) => {
  const { handleMessageReaction, isOutgoingMessage, message } = props;

  return (
    <li className={isOutgoingMessage ? 'outgoing' : 'incoming'}>
      <p onClick={() => handleMessageReaction(message.id)} className='message'>
        {message.message}
      </p>
      <span>{message.reaction}</span>
      {!isOutgoingMessage && <h2>{message.name}</h2>}
    </li>
  );
};
