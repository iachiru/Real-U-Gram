import { updatePassword } from "firebase/auth";
import { useEffect } from "react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProfile } from "../context/ProfileContext";
import { processFirebaseErrors } from "../firebase/errors";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [editor, setEditor] = useState(false);

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
    name: "",
    alias: "",
    city: "",
    bio: "",
  };

  const [form, setForm] = useState(userProfile ?? emptyForm);

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
      if (!editor) {
        await addProfile({ ...form, userId: user.uid });

        if (editor) {
          await editUserProfile({
            ...form,
            userId: user.uid,
          });
        }
      }
      //await getUserProfile(user.uid);

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
        <button onClick={openEditor}>Edit</button>
        <button onClick={deleteDocument}>Delete</button>
      </div>
    );

  return (
    <>
      <div className="logoAndhomeDiv">
        <Link className="home" to="/">
          go home
        </Link>
        <img className="logoRUGmini" src="logoRUG.png" alt="logo real-u-gram" />
      </div>
      <div className="welcome">
        <p></p>
        <h1 className="profile">
          <span>yo</span>
          <span className="title-word title-word-u">u</span>
          <span>r profile</span>
        </h1>
        <p></p>
      </div>
      <div className="formProfileDiv">
        <form onSubmit={onSubmit}>
          {error && <div>{error}</div>}
          <div className="userNameDiv">
            <input
              className="userName"
              placeholder="name"
              type="text"
              value={profile.name}
              onChange={(e) => {
                setProfile({ ...profile, name: e.target.value });
              }}
            />
          </div>
          <div className="aliasDiv">
            <input
              className="alias"
              placeholder="alias"
              type="text"
              value={profile.alias}
              onChange={(e) => {
                setProfile({ ...profile, alias: e.target.value });
              }}
            />
          </div>
          <div className="cityDiv">
            <input
              className="city"
              placeholder="city"
              type="text"
              value={profile.city}
              onChange={(e) => {
                setProfile({ ...profile, city: e.target.value });
              }}
            />
          </div>
          <div className="bioDiv">
            <input
              className="bio"
              placeholder="biography"
              type="text"
              value={profile.bio}
              onChange={(e) => {
                setProfile({ ...profile, bio: e.target.value });
              }}
            />
          </div>
          <div className="submitButtonDiv">
            <input className="submitButton" type="submit" value="submit" />
          </div>
        </form>
      </div>
      <div className="rightsProfile">
        <p>© FBW team - all rights reserved 2022 </p>
      </div>

      <Link to="/">Go Home</Link>
      <form onSubmit={onSubmit}>
        <h1>Profile</h1>
        {error && <div>{error}</div>}
        <label>Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <label>Alias</label>
        <input
          type="text"
          value={form.alias}
          onChange={(e) => {
            setForm({ ...form, alias: e.target.value });
          }}
        />
        <label>City</label>
        <input
          type="text"
          value={form.city}
          onChange={(e) => {
            setForm({ ...form, city: e.target.value });
          }}
        />
        <label>Biography</label>
        <input
          type="text"
          value={form.bio}
          onChange={(e) => {
            setForm({ ...form, bio: e.target.value });
          }}
        />
        {!editor ? (
          <input type="submit" value="Submit" />
        ) : (
          <input type="submit" value="Edit" />
        )}
      </form>

    </>
  );
};

export default Users;
