import React from "react";
import Moquito from "../images/Moquito.jpg";
import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: "123",
      username: "Mocolin el guapin",
      profilePic: Moquito,
      postPhoto: Moquito,
      caption: "Soy Moquito el bonito",
    },
    {
      id: "234",
      username: "Trolo Lolo",
      profilePic: Moquito,
      postPhoto: Moquito,
      caption: "Soy Moquito el más bonito",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.username}
          profilePic={post.profilePic}
          postPhoto={post.postPhoto}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
