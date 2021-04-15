import React from 'react';
import './ChatRoomsList.css';
import classNames from 'classnames';

export const ChatRoomsList = (props) => {
  const handleSelectedRoomChange = (roomName) => {
    props.handleSelectedRoomChange(roomName);
  }

  const getOnlineTime = (timeLoggedIn) => {
    const diff = new Date().getTime() - timeLoggedIn;
    return Math.round(diff/60000);
  }

  return (
    <section className='chatRoomListContainer'>
      <header>
        <h1>{props.user.userName}</h1>
        <span>Online for {getOnlineTime(props.user.timeStamp)} minutes</span>
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
