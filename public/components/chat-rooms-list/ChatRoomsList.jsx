import React from 'react';
import './styles.css'

export const ChatRoomsList = (props) => {
  const roomNameClasses = classNames('roomName',{aelec} )
  return (
    <div className='chatRoomsContainer'>
      <section className='userSection'>
        <p className='userName'>{props.user}</p>
        <p className='onlineTime'>Online for 12 minutes</p>
      </section>
      {props.chatRooms.map(room => <nav className='roomName'>{room.name}</nav>)}
    </div>
  )
}