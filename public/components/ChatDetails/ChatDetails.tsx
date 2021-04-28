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
  const { chatRoom, currentUser, usersInRoom } = props;
  return (
    <div className="usersContainer">
      <h1>{chatRoom.name}</h1>
      <section>
        {usersInRoom.map((user, index) =>
          <span key={userKey(user, index)} className={userClass(user, currentUser)}>
            {userText(user, usersInRoom, index)}
          </span>)}
      </section>
    </div>
  )
}
