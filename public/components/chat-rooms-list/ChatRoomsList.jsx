import React from 'react';
import './ChatRoomsList.css';
import classNames from 'classnames';

export const ChatRoomsList = (props) => {
  const handleSelectedRoomChange = (roomName) => {
    props.handleSelectedRoomChange(roomName);
  }

  return (
    <section className='chatRoomListContainer'>
      <header>
        <h1>{props.user}</h1>
        <span>Online for 12 minutes</span>
      </header>
      <nav>
        <ul className='roomNameContainer'>
          {props.chatRooms.map(room => {
            const roomNameClasses = classNames('roomName', { 'selectedRoom': props.selectedChatRoom === room.name } );
            return (
              <li onClick={() => handleSelectedRoomChange(room.name)} className={roomNameClasses} key={room.name}>
                <a className='roomName'>{room.name}</a>
              </li>
              )
          })}
        </ul>
      </nav>
    </section>
  )
}