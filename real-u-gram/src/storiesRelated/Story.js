import React from "react";

export default function Story({ username, avatar }) {
  return (
    <div className="storyDiv" key={username}>
      <img className="storyPic" src={avatar} alt="story pic" />
      <div className="storyName">{username}</div>
    </div>
  );
}
