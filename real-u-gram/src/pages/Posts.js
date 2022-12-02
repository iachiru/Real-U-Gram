import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../firebase/Firebase";

export default function Posts() {
  /* const posts = [
    {
      id: "123",
      username: "Mocolin",
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
  ]; */

  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, "posts"), orderBy("timestamp")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Link className="create_post" to="/post">
        <button> Create Post</button>
      </Link>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          profilePic={post.profilePic}
          postPhoto={post.data().image}
          caption={post.data().caption}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
}
