import { EmailAuthCredential } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/Firebase";

export default function UploadPost() {
  const captionRef = useRef(null);
  const navigate = useNavigate();
  const uploadPost = async (e) => {
    e.preventDefault();
    console.log("text");
    const docRef = await addDoc(collection(database, "posts"), {
      /* userEmail: EmailAuthCredential,
      username: userProfile.alias, */
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={uploadPost}>
        <input type="textarea" placeholder="Caption" ref={captionRef} />
        <div>
          <button>Add Post</button>
        </div>
      </form>
    </div>
  );
}
