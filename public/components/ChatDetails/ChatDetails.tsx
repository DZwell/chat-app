import * as React from 'react';
import { ChatRoom, CurrentUser } from '../App/interfaces';
import { userClass, userKey, userText } from './helpers';
import './ChatDetails.css';

interface ChatDetailsProps {
  chatRoom: ChatRoom;
  currentUser: CurrentUser;
  usersInRoom: string[];
}

export const ChatDetails = (props: ChatDetailsProps) => {
  return (
    <div className="usersContainer">
      <h1>{props.chatRoom.name}</h1>
      <section>
        {props.usersInRoom.map((user, index) =>
          <span key={userKey(user, index)} className={userClass(user, props.currentUser)}>
            {userText(user, props.usersInRoom, index)}
          </span>)}
      </section>
    </div>
  )
}
