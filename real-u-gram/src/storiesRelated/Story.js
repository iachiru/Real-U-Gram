import React from "react";

export default function Story({ username, avatar }) {
  return (
    <>
      <div className="storyDiv" key={username}>
        <img className="storyPic" src={avatar} alt="story pic" />
        <p className="storyName">{username}</p>
      </div>
    </>
  );
}
