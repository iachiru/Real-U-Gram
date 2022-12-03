import React from "react";
import "./Post.css";
import Bookmark from "../images/Bookmark.png";
import Comment from "../images/Comment.png";
import Like from "../images/Like.png";
import Share from "../images/Share.png";
import { useAuth } from "../context/authContext";

export default function Header({ username, profilePic, postPhoto, caption }) {
  const { user } = useAuth();
  const comments = [
    {
      username: "Mocolin",
      comment: "Hello from the comments",
    },
    { username: "Trolo Lolo", comment: "Bye from the comments" },
  ];

  return (
    <div className="post_wrapper">
      {/* Header */}
      <div className="post_header">
        <img src={profilePic} alt="profile" />
        <p>{username}</p>
      </div>
      {/* Photo */}
      <div className="post_photo">
        <img src={postPhoto} alt="" />
      </div>
      <div>
        {/* Buttons */}
        <div className="post_footer">
          <div className="post_buttons">
            <div className="like_comm_share">
              <img src={Like} alt="" />

              <img src={Comment} alt="" />

              <img src={Share} alt="" />
            </div>
            <div className="post_bookmark">
              <img src={Bookmark} alt="" />
            </div>
          </div>
          <p>20,500 likes</p>
        </div>
        {/* Caption */}
        <div className="post_caption">
          <p>{username}</p>
          <p>{caption}</p>
          {/* View all comments */}
          <p>View all 250 comments</p>
        </div>

        {/* Comments */}
        <div>
          {comments.map((comment) => (
            <div>
              <div>
                <p>{comment.username}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="post_comments">
          <input type="text" placeholder="add a comment" />
          <button className="postButton" type="submit">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
