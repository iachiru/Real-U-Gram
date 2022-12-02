import { useEffect, useRef } from "react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProfile } from "../context/ProfileContext";
import { processFirebaseErrors } from "../firebase/errors";
import ProfilePicture from "./ProfilePicture";
import ProfilePhoto from "./ProfilePicture";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [editor, setEditor] = useState(false);
  const imageRef = useRef(null);
  const [userImage, setUserImage] = useState(null);
  console.log(userImage);

  const {
    addProfile,
    getUserProfile,
    userProfile,
    editUserProfile,
    deleteUserProfile,
    clearProfile,
  } = useProfile();

  const { user, userLoading } = useAuth();
  const navigate = useNavigate();

  const emptyForm = {
    profilePic: "",
    name: "",
    alias: "",
    city: "",
    bio: "",
  };

  const [form, setForm] = useState(userProfile ?? emptyForm);

  /*  const uploadProfilePic = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(database, "profiles"), {
      userImage: profilePic,
    });
    //Path for image to be uploaded
    const imagePath = ref(storage, `profiles/${docRef.id}/image`);

    //Upload the image to that address
    //then with snapshot declare the download URL

    await uploadString(imagePath, userImage, `data_url`).then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imagePath);
        await updateDoc(doc(database, "posts", docRef.id), {
          userImage: downloadURL,
        });
      }
    );
  };
*/
  /*  //Add image to state
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setUserImage(readerEvent.target.result);
    };
  }; */

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      return setError("Name is required");
    }

    if (!form.city) {
      return setError("City is required");
    }

    setError("");

    try {
      setLoading(true);
      console.log("editor:", editor);
      if (!editor) {
        await addProfile({ ...form, userId: user.uid });
      }
      if (editor) {
        console.log(form);
        await editUserProfile({
          ...form,
          userId: user.uid,
        });
      }

      await getUserProfile(user.uid);

      setEditor(false);
      setLoading(false);
      setError("");
    } catch (error) {
      console.log(error);
      setError(processFirebaseErrors(error.message));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getUserProfile(user.uid);
  }, [user]);

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  const openEditor = () => {
    setEditor(true);
    setForm(userProfile);
  };

  const deleteDocument = async () => {
    try {
      setLoading(true);
      await deleteUserProfile(userProfile.id);
      clearProfile();
      setError("");
      setForm(emptyForm);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading || userLoading) return <div>Loading...</div>;

  if (userProfile && !editor)
    return (
      <div>
        <h1>{userProfile.name}</h1>
        <p>{userProfile.alias}</p>
        <p>{userProfile.city}</p>
        <p>{userProfile.bio}</p>
        <div className="profilePicture">
          <ProfilePicture />
        </div>
        <button onClick={openEditor}>Edit</button>
        <button onClick={deleteDocument}>Delete</button>
      </div>
    );

  return (
    <>
      <div className="logoAndhomeDiv">
        <Link className="home" to="/">
          go back
        </Link>
        <img className="logoRUGmini" src="logoRUG.png" alt="logo real-u-gram" />
      </div>
      <div className="welcome">
        <p></p>
        <h1 className="profile">
          <span>complete yo</span>
          <span className="title-word title-word-u">u</span>
          <span>r profile</span>
        </h1>
        <p></p>
      </div>
      <div className="profilePicture">
        <ProfilePicture />
      </div>
      <div className="formProfileDiv">
        <form onSubmit={onSubmit}>
          {error && <div>{error}</div>}

          <div className="userNameDiv">
            <input
              className="userName"
              placeholder="name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
              }}
            />
          </div>
          <div className="aliasDiv">
            <input
              className="alias"
              placeholder="alias"
              type="text"
              value={form.alias}
              onChange={(e) => {
                setForm({ ...form, alias: e.target.value });
              }}
            />
          </div>
          <div className="cityDiv">
            <input
              className="city"
              placeholder="city"
              type="text"
              value={form.city}
              onChange={(e) => {
                setForm({ ...form, city: e.target.value });
              }}
            />
          </div>
          <div className="bioDiv">
            <input
              className="bio"
              placeholder="biography"
              type="text"
              value={form.bio}
              onChange={(e) => {
                setForm({ ...form, bio: e.target.value });
              }}
            />
          </div>
          <div className="submitButtonDiv">
            {!editor ? (
              <input className="submitButton" type="submit" value="submit" />
            ) : (
              <input className="submitButton" type="submit" value="edit" />
            )}
          </div>
        </form>
      </div>
      <div className="rightsProfile">
        <p>© FBW team - all rights reserved 2022 </p>
      </div>
    </>
  );
};

export default Users;
