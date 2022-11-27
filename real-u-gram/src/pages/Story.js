import React from "react";

export default function Story({ username, avatar }) {
  return (
    <div>
      <img src={avatar} alt="" />
      <p>{username}</p>
    </div>
  );
}
