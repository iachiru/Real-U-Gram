import React from "react";
import "./Post.css";

export default function Header({ username, profilePic, postPhoto, caption }) {
  return (
    <div>
      {/* Header */}
      <div className="post_header">
        <img src={profilePic} alt="profile" />
        <p>{username}</p>
      </div>
      {/* Photo */}
      <div className="post_photo">
        <img src={postPhoto} alt="" />
      </div>

      {/* Buttons */}
      {/* Caption */}
      {/* Comments */}
      {/* Input */}
    </div>
  );
}
