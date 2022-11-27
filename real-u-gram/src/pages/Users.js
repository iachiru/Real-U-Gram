import { useEffect } from "react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProfile } from "../context/ProfileContext";
import { processFirebaseErrors } from "../firebase/errors";
import { addProfile } from "../context/ProfileContext";

function Users() {
  const [profile, setProfile] = useState({
    name: "",
    alias: "",
    city: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { addProfile } = useProfile();
  const { user } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addProfile(profile);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(processFirebaseErrors(error.message));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

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
    </>
  );
}

export default Users;
