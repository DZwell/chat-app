import * as React from 'react';
import './MessageBox.css';
import { ChatMessage } from '../App/interfaces';

interface MessageBoxProps {
  isOutgoingMessage: boolean;
  message: ChatMessage
}

export const MessageBox = (props: MessageBoxProps) => {
  const { isOutgoingMessage, message } = props;

  return (
    <li className={isOutgoingMessage ? "outgoing" : "incoming"}>
      <p className="message">
        {message.message}
      </p>
      {!isOutgoingMessage && <h2>{message.name}</h2>}
    </li>
  )
}