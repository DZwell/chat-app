import React from 'react';
import './styles.css'

export const ChatRoomsList = (props) => {

  return (
    <div className='chatRoomsContainer'>
      {props.chatRooms.map(room => <div>{room.name}</div>)}
    </div>
  )
}