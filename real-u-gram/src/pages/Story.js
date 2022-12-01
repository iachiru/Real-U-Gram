import React from "react";

export default function Story({ username, avatar }) {
  return (
    <div className="storyDiv">
      <img className="storyPic" src={avatar} alt="" />
      <p className="storyName">{username}</p>
    </div>
  );
}
