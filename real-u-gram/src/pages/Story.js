import React from "react";

export default function Story({ username, avatar }) {
  return (
    <div>
      <img src={avatar} alt="" />
      <p className="storyName">{username}</p>
    </div>
  );
}
