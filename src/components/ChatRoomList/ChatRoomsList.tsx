const moment = require('moment'); // For some reason Typescript was having a hard time using an 'import' statement with this library.
import * as React from 'react';
import './ChatRoomsList.css';
import classNames from 'classnames';
import { ChatRoom, CurrentUser } from '../App/interfaces';

interface ChatRoomsListProps {
  chatRooms: ChatRoom[];
  handleSelectedRoomChange: (roomId: number) => void;
  selectedChatRoom: ChatRoom;
  user: CurrentUser;
}

export const ChatRoomsList = (props: ChatRoomsListProps) => {
  const timeOnline = moment(props.user.timeStamp).fromNow(true);

  return (
    <section className="chatRoomListContainer">
      <header>
        <h1>{props.user.userName}</h1>
        <span>Online for {timeOnline}</span>
      </header>
      <nav>
        <ul className="roomNameContainer">
          {props.chatRooms.map((room) => {
            const roomNameClasses = classNames('roomName', {
              selectedRoom: props.selectedChatRoom.name === room.name,
            })
            return (
              <li
                onClick={() => props.handleSelectedRoomChange(room.id)}
                className={roomNameClasses}
                key={room.name}
              >
                <a className="roomName">{room.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};
