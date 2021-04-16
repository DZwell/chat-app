import React from "react";
import moment from "moment";
import "./ChatRoomsList.css";
import classNames from "classnames";

export const ChatRoomsList = (props) => {
  const handleSelectedRoomChange = (room) => {
    props.handleSelectedRoomChange(room);
  };

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
            const roomNameClasses = classNames("roomName", {
              selectedRoom: props.selectedChatRoom.name === room.name,
            });
            return (
              <li
                onClick={() => handleSelectedRoomChange(room)}
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
