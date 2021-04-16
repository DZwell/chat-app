import React from "react";
import "./ChatDetails.css";

export const ChatDetails = (props) => {
  return (
    <div className="chatDetailsContainer">{props.chatRoom.name}
      {props.chatRoom.users && props.chatRoom.users.map(user => <p>{user}</p>)}
    </div>
  );
};
