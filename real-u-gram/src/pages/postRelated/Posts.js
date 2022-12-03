import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../firebase/Firebase";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, "posts"), orderBy("timestamp", "desc")),
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
          email={post.data().userEmail}
          username={post.data().username}
          profilePic={post.data().profilePic}
          postPhoto={post.data().image}
          caption={post.data().caption}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
}
