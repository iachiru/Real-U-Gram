import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { updateProfile } from "firebase/auth";
import { storage } from "../../firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ProfilePicture() {
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
  );

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = () => {
    upload(photo, user, setLoading);
  };

  useEffect(() => {
    if (user?.photoURL) setPhotoURL(user.photoURL);
  }, [user]);

  const upload = async (file, user, setLoading) => {
    const fileRef = ref(storage, "profiles/images" + user.uid);
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const profilePic = await getDownloadURL(fileRef);

    updateProfile(user, {
      photoURL: profilePic,
    });
    setLoading(false);
    alert("Uploaded file");
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>
        Upload Picture
      </button>
      <img src={photoURL} alt="Avatar" />
    </div>
  );
}
