import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, storage } from "../firebase/Firebase";

export default function UploadPost({ user }) {
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [image, setImage] = useState();
  console.log(image);

  const uploadPost = async (e) => {
    setLoading(true);
    e.preventDefault();

    const docRef = await addDoc(collection(database, "posts"), {
      /* userEmail: EmailAuthCredential,
      username: user.alias, */
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    //Path for image to be uploaded
    const imagePath = ref(storage, `posts/${docRef.id}/image`);

    //Upload the image to that address
    //then with snapshot declare the download URL

    await uploadString(imagePath, image, `data_url`).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imagePath);
      await updateDoc(doc(database, "posts", docRef.id), {
        image: downloadURL,
      });
    });
    setLoading(false);
    navigate("/");
  };

  //Add image to state
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  return (
    <div>
      <form onSubmit={uploadPost}>
        <input type="textarea" placeholder="Caption" ref={captionRef} />
        <input
          type="file"
          placeholder="Choose an image"
          ref={imageRef}
          onChange={addImageToState}
        />
        <div>
          <button onClick={() => imageRef.current.click}>
            {loading ? "Adding Post" : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
