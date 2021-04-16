import React from "react";
import "./ChatDetails.css";

export const ChatDetails = (props) => {
  const usersInRoom = [props.currentUser.userName, ...props.chatRoom.users];
  const userKey = (user, index) => `${user}-${index}`;
  return (
    <div className="chatDetailsContainer">
      <h1>{props.chatRoom.name}</h1>
      <section>
        {usersInRoom.map((user, index) => <span key={userKey(user, index)} className={user === props.currentUser.userName ? 'currentUser' : ''}>{user}, </span>)}
      </section>
    </div>
  );
};
