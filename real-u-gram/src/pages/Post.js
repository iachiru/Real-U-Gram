import React, { useState } from "react";
import "./Post.css";
import Bookmark from "../images/Bookmark.png";
import Comment from "../images/Comment.png";
import Like from "../images/Like.png";
import Share from "../images/Share.png";
import { useAuth } from "../context/authContext";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../firebase/Firebase";
import { useEffect } from "react";

export default function Header({
  username,
  profilePic,
  id,
  postPhoto,
  caption,
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  //send comment to database

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(database, "posts", id, "comments"), {
      comment: commentToSend,
      username: username,
      image: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  //When Comments update in db update them in the app as well
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(database, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [database, id]
  );

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
                <img src={comment.data().image} alt="profile img" />
                <p>{comment.data().username}</p>
                <p>{comment.data().comment}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="post_comments">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="add a comment"
          />
          <button className="postButton" type="submit" onClick={sendComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
